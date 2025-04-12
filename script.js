function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  const totalLectures = document.getElementById("totalLectures").value;

  if (!name || totalLectures <= 0) {
    alert("Please enter valid inputs");
    return;
  }

  fetch("add_student.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&totalLectures=${totalLectures}`
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      populateTable(name, totalLectures);
      document.getElementById("studentName").value = "";
      document.getElementById("totalLectures").value = "";
    });
}

function populateTable(name, lectures) {
  const tableBody = document.getElementById("tableBody");
  for (let i = 1; i <= lectures; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${name}</td>
      <td>${i}</td>
      <td class="status">Not Marked</td>
      <td><button onclick="markStatus(this, '${name}', ${i}, 'Present')">Present</button></td>
      <td><button onclick="markStatus(this, '${name}', ${i}, 'Absent')">Absent</button></td>
    `;

    tableBody.appendChild(row);
  }
}

function markStatus(button, name, lecture, status) {
  fetch("mark_attendance.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&lecture=${lecture}&status=${status}`
  })
    .then(res => res.text())
    .then(() => {
      const row = button.closest("tr");
      const statusCell = row.querySelector(".status");
      statusCell.textContent = status;
      statusCell.className = "status " + (status === "Present" ? "status-present" : "status-absent");
    });
}

function generateReport() {
  fetch("report.php")
    .then(res => res.json())
    .then(data => {
      const reportBody = document.getElementById("reportBody");
      reportBody.innerHTML = "";

      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.total}</td>
          <td>${item.present}</td>
          <td>${item.absent}</td>
        `;
        reportBody.appendChild(row);
      });
    });
}
