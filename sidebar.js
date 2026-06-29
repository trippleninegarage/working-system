// เพิ่มฟังก์ชันนี้ต่อท้ายฟังก์ชัน renderMenu ในไฟล์ sidebar.js
async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    // โหลดไฟล์ HTML เข้ามา (เช่น jobs.html)
    const response = await fetch(`${pageName}.html`);
    const html = await response.text();
    
    // นำเนื้อหามาแปะใน main-content
    mainContent.innerHTML = html;

    // ถ้าหน้าคือ 'jobs' ให้เรียกฟังก์ชันดึงตารางข้อมูล
    if (pageName === 'jobs' && typeof loadJobs === 'function') {
        loadJobs();
    }
}function renderMenu() {
    const menuList = document.getElementById('menu-list');
    if (!menuList) return; // ถ้าหา ul id="menu-list" ไม่เจอ ให้หยุดทำงาน

    const items = [
        { name: "Dashboard", file: "dashboard" },
        { name: "Jobs Management", file: "jobs" }
    ];

    menuList.innerHTML = ""; // เคลียร์เมนูเก่า (ถ้ามี)
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="loadPage('${item.file}')">${item.name}</a>`;
        menuList.appendChild(li);
    });
}