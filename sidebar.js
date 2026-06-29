// 1. ฟังก์ชันสร้างเมนูทางด้านซ้าย
function renderMenu() {
    const menuList = document.getElementById('menu-list');
    if (!menuList) return;

    const items = [
        { name: "Dashboard", file: "dashboard" },
        { name: "Jobs Management", file: "jobs" }
    ];

    menuList.innerHTML = ""; // เคลียร์เมนูเก่าทิ้งก่อน
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="loadPage('${item.file}')">${item.name}</a>`;
        menuList.appendChild(li);
    });
}

// 2. ฟังก์ชันโหลดไฟล์ HTML มาแปะใน main-content
async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    try {
        // ดึงไฟล์ HTML (เช่น dashboard.html หรือ jobs.html)
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

// 3. ฟังก์ชัน Logout (นำมารวมไว้ที่นี่เพื่อความเป็นระเบียบ)
function handleLogout() {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}