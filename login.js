async function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // สมมติว่าคุณเรียกไปที่ Google Apps Script ของคุณ
    const response = await fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify({ username: user, password: pass })
    });
    
    const data = await response.json();

    if (data.success) {
        // เซฟข้อมูลลง localStorage
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userRole', data.role);
        
        // พาไปหน้า Dashboard
        window.location.href = 'manager.html';
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
}