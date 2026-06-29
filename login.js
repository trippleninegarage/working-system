async function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // สร้าง URL พร้อมพารามิเตอร์ต่อท้าย (ส่งแบบ GET)
    const url = "https://script.google.com/macros/s/AKfycbwnuY5QobyulxT4Mzy6pckfhRpTMYPEuFcnLJu-ucAdCrZ4pEKQV8zFTkN7pun8gslV/exec" + 
                "?username=" + encodeURIComponent(user) + 
                "&password=" + encodeURIComponent(pass);

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
        localStorage.setItem('userName', user); // บันทึกชื่อ
        localStorage.setItem('userRole', data.role); // บันทึกตำแหน่ง
        window.location.href = 'manager.html';
    } else {
        alert(data.message);
    }
}