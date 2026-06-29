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
    const role = localStorage.getItem('userRole');
    const menuList = document.getElementById('menu-list');
    
    if (menuList && role && menuConfig[role]) {
        menuList.innerHTML = ''; // เคลียร์เมนูเก่า (ถ้ามี)
        menuConfig[role].forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
            menuList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadSidebar);