// 1. ฟังก์ชันดึงเนื้อหามาแปะใน main-content
async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    // โหลดไฟล์ HTML (เช่น jobs.html)
    const response = await fetch(`${pageName}.html`);
    const html = await response.text();
    
    // เอา HTML ที่ได้ไปวางในช่อง main-content
    mainContent.innerHTML = html;

    // ถ้าโหลดหน้า 'jobs' ให้เรียกฟังก์ชันโหลดตารางงานต่อทันที
    if (pageName === 'jobs' && typeof loadJobs === 'function') {
        loadJobs();
    }
}

// 2. ปรับตอนสร้างเมนู ให้เรียก loadPage() แทนการใส่ link ตรงๆ
function createMenu() {
    const menuList = document.getElementById('menu-list');
    const menuItems = [
        { name: "Dashboard", file: "dashboard" },
        { name: "Jobs Management", file: "jobs" }
    ];

    menuItems.forEach(item => {
        const li = document.createElement('li');
        // ใช้ onclick เรียกฟังก์ชันแทนการเปลี่ยนหน้า
        li.innerHTML = `<a href="#" onclick="loadPage('${item.file}')">${item.name}</a>`;
        menuList.appendChild(li);
    });
}