const profileTile = document.getElementById("profileTile");
const attendanceTile = document.getElementById("attendanceTile");
const gradesTile = document.getElementById("gradesTile");
const logoutBtn = document.querySelector(".btn-logout");
const contentArea = document.getElementById("content-area");

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

profileTile.addEventListener("click", async () => {
  try {
    const res = await axios.get("/api/v1/student/profile");
    const profile = res.data;

    contentArea.innerHTML = `
      <h2>Profile</h2>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Class:</strong> ${profile.className}</p>
      <p><strong>Roll No:</strong> ${profile.rollNo}</p>
    `;
    document.querySelector(".student-name").textContent = `Welcome, ${profile.name}`;
  } catch (err) {
    console.error("Error loading profile:", err);
  }
});

attendanceTile.addEventListener("click", async () => {
  try {
    const res = await axios.get("/api/v1/student/attendance");
    const attendance = res.data;

    let rows = attendance.map(a => {
      const date = new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return `<tr><td>${date}</td><td>${a.status}</td></tr>`;
    }).join("");

    contentArea.innerHTML = `
      <h2>Attendance</h2>
      <table>
        <thead><tr><th>Date</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    console.error("Error loading attendance:", err);
  }
});

gradesTile.addEventListener("click", async () => {
  try {
    const res = await axios.get("/api/v1/student/grades");
    const grades = res.data;

    let rows = grades.map(g => `
      <tr>
        <td>${g.subject}</td>
        <td>${g.score}</td>
        <td>${g.grade}</td>
      </tr>
    `).join("");

    contentArea.innerHTML = `
      <h2>Grades</h2>
      <table>
        <thead><tr><th>Subject</th><th>Score</th><th>Grade</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    console.error("Error loading grades:", err);
  }
});

async function loadStudentInfo() {
  try {
    const res = await axios.get('/api/v1/student/me');
    console.log(res);
    const student = res.data.student;

    document.querySelector(".student-name").textContent = `Welcome, ${student.name}`;

  } catch (err) {
    console.error("Error loading student info:", err);
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

window.addEventListener("popstate", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", () => {
  window.history.pushState(null, "", window.location.href);
});

loadStudentInfo();