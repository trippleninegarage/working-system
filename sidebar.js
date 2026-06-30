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
function saveJob(event) {
    event.preventDefault();
    const data = {
        type: document.getElementById('type').value, // ดึงค่าจาก select
        date: document.getElementById('date').value,
        customerName: document.getElementById('customerName').value,
        tel: document.getElementById('tel').value,
        licensePlate: document.getElementById('licensePlate').value,
        description: document.getElementById('description').value,
        serviceFee: document.getElementById('serviceFee').value,
        partsCost: document.getElementById('partsCost').value,
        status: document.getElementById('status').value
    };

    google.script.run
        .withSuccessHandler(() => {
            alert("บันทึกรายการเรียบร้อย!");
            closeModal();
            loadJobs(); // โหลดหน้าตารางใหม่
        })
        .addJobToSheet(data);
}