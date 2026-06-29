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

// 2. ฟังก์ชันสร้างเมนูทางด้านซ้าย
function loadSidebar() {
    const role = localStorage.getItem('userRole');
    const menuList = document.getElementById('menu-list');

    if (menuList && role && menuConfig[role]) {
        menuList.innerHTML = ''; // ล้างเมนูเก่าก่อนสร้างใหม่
        menuConfig[role].forEach(item => {
            const li = document.createElement('li');
            // ใช้ onclick แทน href ปกติ เพื่อให้โหลดผ่าน fetch
            li.innerHTML = `<a href="#" onclick="loadPage('${item.file}')">${item.name}</a>`;
            menuList.appendChild(li);
        });
    }
}

// 3. ฟังก์ชันโหลดไฟล์ HTML มาแปะใน main-content
async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    try {
        const response = await fetch(`${pageName}.html`);
        
        if (!response.ok) throw new Error("ไม่พบไฟล์: " + pageName);
        
        const html = await response.text();
        mainContent.innerHTML = html;

        // ถ้าโหลดหน้า jobs ให้สั่งดึงข้อมูลตารางงานทันที
        if (pageName === 'jobs' && typeof loadJobs === 'function') {
            loadJobs();
        }
    } catch (error) {
        console.error(error);
        mainContent.innerHTML = `<h2>ขออภัย</h2><p>ไม่สามารถโหลดหน้า ${pageName} ได้ กรุณาตรวจสอบว่ามีไฟล์นี้อยู่ในโฟลเดอร์</p>`;
    }
}

// 4. ฟังก์ชัน Logout
function handleLogout() {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    // สลับคลาส active เพื่อซ่อนหรือโชว์
    sidebar.classList.toggle('active');
}