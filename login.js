async function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // สร้าง URL พร้อมพารามิเตอร์ต่อท้าย (ส่งแบบ GET)
    const url = "https://script.google.com/macros/s/AKfycbwCV0HqoqQTPWKqUgVdcXeAKier3m9QhKnigQ4vd9gNNUqEjRwhP2VgYxCznNvUiZ4S/exec" + 
                "?username=" + encodeURIComponent(user) + 
                "&password=" + encodeURIComponent(pass);

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
        localStorage.setItem('userName', 'ชื่อเล่นของคุณ'); // เช่น 'ต้น'
        localStorage.setItem('userRole', data.role); // บันทึกตำแหน่ง
        window.location.href = 'home.html';
    } else {
        alert(data.message);
    }
}
