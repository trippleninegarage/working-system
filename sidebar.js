// 1. กำหนดเมนูตาม Role
const menuConfig = {
    'manager': [
        { name: 'Dashboard', file: 'dashboard' },
        { name: 'Manage Jobs', file: 'jobs' },
        { name: 'User Management', file: 'users' },
        { name: 'Inventory', file: 'inventory' },
        { name: 'Settings', file: 'settings' }
    ],
    'admin': [
        { name: 'Dashboard', file: 'admin' },
        { name: 'Manage Jobs', file: 'jobs' },
        { name: 'User Management', file: 'users' },
        { name: 'Inventory', file: 'inventory' },
        { name: 'Settings', file: 'settings' }
    ],
    'user': [
        { name: 'Dashboard', file: 'user' },
        { name: 'Manage Jobs', file: 'jobs' },
        { name: 'Settings', file: 'settings' }
    ]
};

function loadSidebar() {
    const role = localStorage.getItem('userRole') || 'user';
    const menuList = document.getElementById('menu-list');
    if (menuList && menuConfig[role]) {
        menuList.innerHTML = '';
        menuConfig[role].forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="loadPage('${item.file}')">${item.name}</a>`;
            menuList.appendChild(li);
        });
    }
}

async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    try {
        const response = await fetch(`${pageName}.html`);
        if (!response.ok) throw new Error("ไม่พบไฟล์");
        mainContent.innerHTML = await response.text();
    } catch (e) {
        mainContent.innerHTML = "<h1>ไม่พบหน้าดังกล่าว</h1>";
    }
}

function handleLogout() {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}
function openJobModal(jobData) {
    document.getElementById('jobModal').style.display = "block";
    document.getElementById('modalBody').innerHTML = `
        <p>ทะเบียน: ${jobData.plate}</p>
        <p>รายละเอียด: ${jobData.detail}</p>
        <p>สถานะ: ${jobData.status}</p>
    `;
}

function closeModal() {
    document.getElementById('jobModal').style.display = "none";
}
async function saveJob(event) {
    event.preventDefault();
    console.log("เริ่มบันทึก...");

    const jobData = {
    action: "add",
    type: document.getElementById('type').value,
    date: document.getElementById('date').value,
    customerName: document.getElementById('customerName').value,
    tel: document.getElementById('tel').value,
    licensePlate: document.getElementById('licensePlate').value,
    description: document.getElementById('description').value,
    serviceFee: document.getElementById('serviceFee').value,
    partsCost: document.getElementById('partsCost').value,
    status: "กำลังดำเนินการ", // หรือค่าจาก input
    staffName: localStorage.getItem('name')
};

    const url = "https://script.google.com/macros/s/AKfycbzHWl21BBdvKyEGjeZ38-dBaMIoQJwpnS3fn0FhJ5ulSqu5GjmhxjXZSeEw5daCgq12nw/exec"; // ตรวจสอบ URL นี้ให้ถูกต้องอีกครั้ง

    try {
        const response = await fetch(url, {
    		method: "POST",
    		mode: "cors", // เปลี่ยนจาก no-cors เป็น cors
    		headers: { "Content-Type": "application/json" },
    		body: JSON.stringify(jobData)
		});

        alert("บันทึกสำเร็จ!");
        closeModal();
        
        // ตรวจสอบว่ามีฟังก์ชันนี้ไหม ถ้ายังไม่มี ให้คอมเมนต์บรรทัดนี้ไว้ก่อน
        if (typeof loadJobs === 'function') {
            loadJobs(); 
        } else {
            console.warn("ยังไม่ได้สร้างฟังก์ชัน loadJobs()");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล: " + error.message);
    }
}
function openJobModal() {
    document.getElementById('jobModal').style.display = "block";
    
    // ดึงค่าจาก Key ที่ชื่อว่า 'name'
    const staffNickname = localStorage.getItem('name'); 
    
    const staffField = document.getElementById('staffName');
    if (staffField) {
        // ใส่ชื่อลงในช่อง และเช็คว่าถ้าไม่มีค่าให้แสดงว่า "ไม่พบชื่อ"
        staffField.value = staffNickname ? staffNickname : "ไม่พบชื่อ";
    }
}
// ฟังก์ชันลบงาน
function deleteJob(jobId) {
    if(!confirm("ยืนยันการลบ?")) return;
    sendRequest({ action: "delete", id: jobId });
}

// ฟังก์ชันปิดจ๊อบ
function closeJob(jobId) {
    sendRequest({ action: "close", id: jobId });
}

// ฟังก์ชันกลางสำหรับส่งข้อมูล (ส่งไปที่ URL Web App เดียวกัน)
async function sendRequest(payload) {
    const url = "https://script.google.com/macros/s/AKfycbzHWl21BBdvKyEGjeZ38-dBaMIoQJwpnS3fn0FhJ5ulSqu5GjmhxjXZSeEw5daCgq12nw/exec";
    await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(payload)
    });
    alert("ดำเนินการสำเร็จ!");
    loadJobs(); // โหลดหน้าตารางใหม่
}
function loadJobs() {
    console.log("ฟังก์ชัน loadJobs ถูกเรียกใช้งานแล้ว แต่ยังไม่ได้เขียน logic");
    // เดี๋ยวเราค่อยมาเติมโค้ดดึงข้อมูลจาก Google Sheets ที่นี่ครับ
}