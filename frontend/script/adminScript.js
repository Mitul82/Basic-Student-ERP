const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopupBtn");
const studentsTableBody = document.querySelector("#studentsTable tbody");
const teachersTableBody = document.querySelector("#teachersTable tbody");
const createStudentBtn = document.getElementById("createStudent-btn");
const updateStudentBtn = document.getElementById("updateStudent-btn");
const removeStudentBtn = document.getElementById("removeStudent-btn");
const createTeacherBtn = document.getElementById("createTeacher-btn");
const updateTeacherBtn = document.getElementById("updateTeacher-btn");
const removeTeacherBtn = document.getElementById("removeTeacher-btn");
const createStudentMainBtn = document.getElementById("create-student");
const createTeacherMainBtn = document.getElementById("create-teacher");
const logoutBtn = document.querySelector(".btn-logout");

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function openPopup(title, contentHtml, submitHandler) {
  popup.querySelector("h2").textContent = title;
  const contentDiv = popup.querySelector("#popup-body");
  contentDiv.innerHTML = contentHtml;
  popup.style.display = "flex";
  const form = contentDiv.querySelector("form");
  if (form && submitHandler) form.addEventListener("submit", submitHandler, { once: true });
}

closePopupBtn.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });

function studentFormHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    fatherName: formData.get("fatherName"),
    className: formData.get("className"),
    admissionno: formData.get("admissionno"),
    grades: [],
    attendance: [],
  };
  axios.post("/api/v1/admin/students", data).then(() => { fetchStudents(); popup.style.display = "none"; });
}

function teacherFormHandler(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    subject: formData.get("subject"),
    employeeId: formData.get("employeeId"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    assignedClasses: formData.get("assignedClasses"),
  };
  axios.post("/api/v1/admin/teachers", data).then(() => { fetchTeachers(); popup.style.display = "none"; });
}

function updateStudentHandler(studentId, e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    fatherName: formData.get("fatherName"),
    className: formData.get("className"),
    admissionno: formData.get("admissionno"),
  };
  axios.put(`/api/v1/admin/students/${studentId}`, data).then(() => { fetchStudents(); popup.style.display = "none"; });
}

function removeStudentHandler(studentId, e) {
  e.preventDefault();
  if (!confirm("Are you sure?")) return;
  axios.delete(`/api/v1/admin/students/${studentId}`).then(() => { fetchStudents(); popup.style.display = "none"; });
}

function updateTeacherHandler(teacherId, e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    subject: formData.get("subject"),
    employeeId: formData.get("employeeId"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    assignedClasses: formData.get("assignedClasses"),
  };
  axios.put(`/api/v1/admin/teachers/${teacherId}`, data).then(() => { fetchTeachers(); popup.style.display = "none"; });
}

function removeTeacherHandler(teacherId, e) {
  e.preventDefault();
  if (!confirm("Are you sure?")) return;
  axios.delete(`/api/v1/admin/teachers/${teacherId}`).then(() => { fetchTeachers(); popup.style.display = "none"; });
}

createStudentBtn.addEventListener("click", () => openPopup(
  "Create Student",
  `<form>
    <input type="text" name="name" placeholder="Student Name" required><br>
    <input type="text" name="fatherName" placeholder="Father's Name" required><br>
    <input type="text" name="className" placeholder="Class" required><br>
    <input type="number" name="admissionno" placeholder="Admission no" required><br>
    <button type="submit">Save</button>
  </form>`,
  studentFormHandler
));

createStudentMainBtn.addEventListener("click", () => createStudentBtn.click());
createTeacherBtn.addEventListener("click", () => openPopup(
  "Create Teacher",
  `<form>
    <input type="text" name="name" placeholder="Teacher Name" required><br>
    <input type="text" name="subject" placeholder="Subject" required><br>
    <input type="text" name="employeeId" placeholder="Employee ID" required><br>
    <input type="text" name="phone" placeholder="Phone"><br>
    <input type="email" name="email" placeholder="Email"><br>
    <label>Assigned Classes:</label><input type="text" name="assignedClasses"><br>
    <button type="submit">Save</button>
  </form>`,
  teacherFormHandler
));

createTeacherMainBtn.addEventListener("click", () => createTeacherBtn.click());

updateStudentBtn.addEventListener("click", async () => {
  const rows = studentsTableBody.querySelectorAll("tr");
  if (!rows.length) return alert("No students to update!");
  let optionsHtml = "";
  rows.forEach(row => optionsHtml += `<option value="${row.dataset.id}">${row.cells[0].textContent}</option>`);
  openPopup("Update Student", `
    <form id="update-student-form">
      <label>Select Student:</label>
      <select name="studentId" required>${optionsHtml}</select><br>
      <label>Name:</label><input type="text" name="name" required><br>
      <label>Father's Name:</label><input type="text" name="fatherName" required><br>
      <label>Class:</label><input type="text" name="className" required><br>
      <label>Admission No:</label><input type="number" name="admissionno" required><br>
      <button type="submit">Update</button>
    </form>`,
    (e) => {
      const studentId = popup.querySelector("select[name='studentId']").value;
      updateStudentHandler(studentId, e);
    }
  );
});

removeStudentBtn.addEventListener("click", () => {
  const rows = studentsTableBody.querySelectorAll("tr");
  if (!rows.length) return alert("No students to remove!");
  let optionsHtml = "";
  rows.forEach(row => optionsHtml += `<option value="${row.dataset.id}">${row.cells[0].textContent}</option>`);
  openPopup("Remove Student", `
    <form id="remove-student-form">
      <label>Select Student:</label>
      <select name="studentId" required>${optionsHtml}</select><br>
      <button type="submit">Remove</button>
    </form>`,
    (e) => {
      const studentId = popup.querySelector("select[name='studentId']").value;
      removeStudentHandler(studentId, e);
    }
  );
});

updateTeacherBtn.addEventListener("click", async () => {
  const rows = teachersTableBody.querySelectorAll("tr");
  if (!rows.length) return alert("No teachers to update!");
  let optionsHtml = "";
  rows.forEach(row => optionsHtml += `<option value="${row.dataset.id}">${row.cells[0].textContent}</option>`);
  openPopup("Update Teacher", `
    <form id="update-teacher-form">
      <label>Select Teacher:</label>
      <select name="teacherId" required>${optionsHtml}</select><br>
      <label>Name:</label><input type="text" name="name" required><br>
      <label>Subject:</label><input type="text" name="subject" required><br>
      <label>Employee ID:</label><input type="text" name="employeeId" required><br>
      <label>Phone:</label><input type="text" name="phone"><br>
      <label>Email:</label><input type="email" name="email"><br>
      <label>Assigned Classes:</label><input type="text" name="assignedClasses"><br>
      <button type="submit">Update</button>
    </form>`,
    (e) => {
      const teacherId = popup.querySelector("select[name='teacherId']").value;
      updateTeacherHandler(teacherId, e);
    }
  );
});

removeTeacherBtn.addEventListener("click", () => {
  const rows = teachersTableBody.querySelectorAll("tr");
  if (!rows.length) return alert("No teachers to remove!");
  let optionsHtml = "";
  rows.forEach(row => optionsHtml += `<option value="${row.dataset.id}">${row.cells[0].textContent}</option>`);
  openPopup("Remove Teacher", `
    <form id="remove-teacher-form">
      <label>Select Teacher:</label>
      <select name="teacherId" required>${optionsHtml}</select><br>
      <button type="submit">Remove</button>
    </form>`,
    (e) => {
      const teacherId = popup.querySelector("select[name='teacherId']").value;
      removeTeacherHandler(teacherId, e);
    }
  );
});

async function fetchStudents() {
  const res = await axios.get("/api/v1/admin/students");
  const students = res.data.students;
  studentsTableBody.innerHTML = "";
  students.forEach(s => {
    const row = document.createElement("tr");
    row.dataset.id = s._id;
    row.innerHTML = `<td>${s.name}</td><td>${s.className}</td><td>${s.rollNo}</td><td>
  ${
    s.attendance && s.attendance.length > 0
      ? `${new Date(s.attendance[s.attendance.length - 1].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${s.attendance[s.attendance.length - 1].status}`
      : "-"
  }
</td><td>${s.grades}</td>`;
    studentsTableBody.appendChild(row);
  });
}

async function fetchTeachers() {
  const res = await axios.get("/api/v1/admin/teachers");
  const teachers = res.data.teachers;
  teachersTableBody.innerHTML = "";
  teachers.forEach(t => {
    const row = document.createElement("tr");
    row.dataset.id = t._id;
    row.innerHTML = `<td>${t.name}</td><td>${t.subject}</td><td>${t.employeeId}</td><td>${t.phone || "-"}</td><td>${t.email || "-"}</td><td>${t.assignedClasses || "-"}`;
    teachersTableBody.appendChild(row);
  });
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

fetchStudents();
fetchTeachers();