async function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // สร้าง URL พร้อมพารามิเตอร์ต่อท้าย (ส่งแบบ GET)
    const url = "https://script.google.com/macros/s/AKfycby5PwNlrEtp0Z-2ZzL8gUMwrlIggeWuEoHHgEE9NIbmk3KMq_JeRNNZKtN5CnqgiZ5G/exec" + 
                "?username=" + encodeURIComponent(user) + 
                "&password=" + encodeURIComponent(pass);

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
        localStorage.setItem('name', data.name); // ดึงค่า 'name' จาก Object ที่ชื่อ data
        localStorage.setItem('userRole', data.role); // บันทึกตำแหน่ง
        window.location.href = 'home.html';
    } else {
        alert(data.message);
    }
}
