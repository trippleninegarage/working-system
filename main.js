async function loadJobs() {
    const jobBody = document.getElementById('job-body');
    jobBody.innerHTML = "<tr><td colspan='4'>กำลังโหลดข้อมูล...</td></tr>";

    try {
        // แทนที่ URL ด้วย Web App URL ของคุณ
        const response = await fetch('https://script.google.com/macros/s/AKfycbx__TZQ-qX3YjFd2qGrhkOSuI9kn9Ge6izR1W3AAxCv4G4MeLih67mlC3eng7wpGWTKtQ/exec');
        const data = await response.json();

        jobBody.innerHTML = "";
        data.forEach(job => {
            jobBody.innerHTML += `
                <tr>
                    <td>${job.plate}</td>
                    <td>${job.detail}</td>
                    <td>${job.status}</td>
                    <td><button onclick="editJob('${job.id}')">แก้ไข</button></td>
                </tr>
            `;
        });
    } catch (err) {
        jobBody.innerHTML = "<tr><td colspan='4'>โหลดข้อมูลล้มเหลว</td></tr>";
    }
}