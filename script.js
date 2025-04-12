// script.js

function addStudent() {
  const nameInput = document.getElementById("studentName");
  const lecturesInput = document.getElementById("totalLectures");
  const name = nameInput.value.trim();
  const totalLectures = parseInt(lecturesInput.value);

  if (!name || isNaN(totalLectures) || totalLectures <= 0) {
    alert("Please enter valid student name and lecture count.");
    return;
  }

  const tableBody = document.getElementById("tableBody");

  for (let i = 1; i <= totalLectures; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${name}</td>
      <td>Lecture ${i}</td>
      <td class="status">Not Marked</td>
      <td><button onclick="markStatus(this, 'Present')">Present</button></td>
      <td><button onclick="markStatus(this, 'Absent')">Absent</button></td>
    `;

    tableBody.appendChild(row);
  }

  nameInput.value = "";
  lecturesInput.value = "";
}
function generateReport() {
  const tableBody = document.getElementById("tableBody").rows;
  const reportBody = document.getElementById("reportBody");
  const studentMap = new Map();

  for (let row of tableBody) {
    const name = row.cells[0].textContent;
    const status = row.cells[2].textContent;

    if (!studentMap.has(name)) {
      studentMap.set(name, { present: 0, absent: 0 });
    }

    if (status === "Present") {
      studentMap.get(name).present += 1;
    } else if (status === "Absent") {
      studentMap.get(name).absent += 1;
    }
  }

  // Clear previous report
  reportBody.innerHTML = "";

  // Render new report
  studentMap.forEach((data, name) => {
    const total = data.present + data.absent;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${name}</td>
      <td>${total}</td>
      <td>${data.present}</td>
      <td>${data.absent}</td>
    `;

    reportBody.appendChild(row);
  });
}


function markStatus(button, status) {
  const row = button.closest("tr");
  const statusCell = row.querySelector(".status");

  if (status === "Present") {
    statusCell.textContent = "Present";
    statusCell.className = "status status-present";
  } else {
    statusCell.textContent = "Absent";
    statusCell.className = "status status-absent";
  }
}
