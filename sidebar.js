const menuConfig = {
    'manager': [
        { name: 'Dashboard', link: 'manager.html' },
        { name: 'Manage Jobs', link: 'jobs.html' },
        { name: 'User Management', link: 'users.html' },
        { name: 'Inventory', link: 'inventory.html' },
        { name: 'Settings', link: 'settings.html' }
    ],
    'admin': [
        { name: 'Dashboard', link: 'admin.html' },
        { name: 'Manage Jobs', link: 'jobs.html' },
        { name: 'User Management', link: 'users.html' },
        { name: 'Inventory', link: 'inventory.html' },
        { name: 'Settings', link: 'settings.html' }
    ],
    'user': [
        { name: 'Dashboard', link: 'user.html' },
        { name: 'Manage Jobs', link: 'jobs.html' },
        { name: 'Settings', link: 'settings.html' }
    ]
};

function loadSidebar() {
    // 1. ดึงข้อมูลจาก localStorage ที่เราเซฟไว้ตอน Login
    const name = localStorage.getItem('userName'); 
    const role = localStorage.getItem('userRole');
    
    // 2. เอาไปใส่ใน HTML
    const nameEl = document.getElementById('display-name');
    const roleEl = document.getElementById('display-role');
    
    if (nameEl) nameEl.innerText = name || "User";
    if (roleEl) roleEl.innerText = role ? role.toUpperCase() : "";

    // 3. ส่วนสร้างเมนู (เหมือนเดิม)
    const menuList = document.getElementById('menu-list');
    const roleKey = role || 'user'; // ถ้าไม่มี role ให้ default เป็น user
    
    if (menuList && menuConfig[roleKey]) {
        menuConfig[roleKey].forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
            menuList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadSidebar);