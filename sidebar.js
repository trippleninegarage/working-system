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

    // 1. เก็บข้อมูลจาก Form
    const jobData = {
        action: "add",
        type: document.getElementById('type').value,
        date: document.getElementById('date').value,
        customerName: document.getElementById('customerName').value,
        tel: document.getElementById('tel').value,
        licensePlate: document.getElementById('licensePlate').value,
        description: document.getElementById('description').value,
        serviceFee: document.getElementById('serviceFee').value,
        status: document.getElementById('status').value,
        staffName: document.getElementById('staffName').value
    };

    // 2. ส่งข้อมูลไปที่ URL ของ Web App (อันเดียวกับที่คุณใช้ Login)
    const url = "https://script.google.com/macros/s/AKfycby5PwNlrEtp0Z-2ZzL8gUMwrlIggeWuEoHHgEE9NIbmk3KMq_JeRNNZKtN5CnqgiZ5G/exe"; 

    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "no-cors", // เพื่อให้ผ่านสิทธิ์ข้ามโดเมน
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jobData)
        });

        alert("บันทึกสำเร็จ!");
        closeModal(); // ปิดหน้า Modal
        loadJobs();   // โหลดรายการใหม่
    } catch (error) {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการบันทึก");
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
    const url = "https://script.google.com/macros/s/AKfycbzUdE_a9ZbMjtnSotxOjHq_uzKDKQaNK4IR-sTPMJ2QIt09M-NZ4Q66BtuoXzxg-QDUeg/exec";
    await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload)
    });
    alert("ดำเนินการสำเร็จ!");
    loadJobs(); // โหลดหน้าตารางใหม่
}function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Jobs');
  var action = data.action; // รับค่า action มาจากหน้าเว็บ

  // 1. กรณีบันทึกข้อมูลใหม่ (Add)
  if (action === "add") {
    sheet.appendRow([
      data.id, 
      data.type, 
      data.date, 
      data.customerName, 
      data.status, 
      data.staffName
    ]);
  } 
  // 2. กรณีลบข้อมูล (Delete)
  else if (action === "delete") {
    var rows = sheet.getDataRange().getValues();
    for (var i = rows.length - 1; i >= 1; i--) {
      if (rows[i][0] == data.id) { // เช็คจาก Job ID
        sheet.deleteRow(i + 1);
        break;
      }
    }
  } 
  // 3. กรณีปิดจ๊อบ (Close)
  else if (action === "close") {
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] == data.id) {
        sheet.getRange(i + 1, 5).setValue("ปิดงาน"); // สมมติสถานะอยู่คอลัมน์ E
        break;
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}