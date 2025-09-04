const attendanceModal = document.getElementById("attendanceModal");
const gradeModal = document.getElementById("gradeModal");
const studentsListLink = document.getElementById("stdList");
const studentsAttendanceLink = document.getElementById("stdAttend");
const studentsGradesLink = document.getElementById("stdGrade");
const changePasswordLink = document.getElementById("changePassword");
const closeButton = document.querySelectorAll(".close");
const studentsTable = document.querySelector("table tbody");
const logoutBtn = document.querySelector(".btn-logout");
const passwordModal = document.getElementById("passwordModal");
const passwordForm = document.getElementById("passwordForm");

let classFilter = document.getElementById("classFilter");
if (!classFilter) {
  classFilter = document.createElement("select");
  classFilter.id = "classFilter";
  classFilter.innerHTML = `
    <option value="">All Classes</option>
    <option value="10A">10A</option>
    <option value="10B">10B</option>
    <option value="11A">11A</option>
    <option value="11B">11B</option>
  `;
  studentsTable.parentElement.insertBefore(classFilter, studentsTable);
}

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function openModal(modal) {
  modal.style.display = "flex";
}

function closeModal(modal) {
  modal.style.display = "none";
}

closeButton.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

studentsListLink.addEventListener("click", (e) => {
  e.preventDefault();
  fetchStudents();
});

studentsAttendanceLink.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(attendanceModal);
});

studentsGradesLink.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(gradeModal);
});

changePasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  openModal(passwordModal);
});

async function fetchStudents() {
  try {
    const className = classFilter.value.trim();
    let res;

    if (className) {
      res = await axios.get('/api/v1/teachers/students', {
        params: { className }
      });
    } else {
      res = await axios.get('/api/v1/teachers/students');
    }

    const students = res.data.students;
    studentsTable.innerHTML = "";

    students.forEach((s) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.name}</td>
        <td>${s.className}</td>
        <td>${s.rollNo}</td>
        <td>${s.attendance?.slice(-1)[0]?.status || "-"}</td>
        <td>${s.grades?.slice(-1)[0]?.grade || "-"}</td>
        <td>
          <button class="btn attendance-btn" data-id="${s._id}" data-name="${s.name}">Mark Attendance</button>
          <button class="btn grade-btn" data-id="${s._id}" data-name="${s.name}">Update Grade</button>
        </td>
      `;
      studentsTable.appendChild(tr);
    });

    bindStudentActions();
  } catch (err) {
    console.error("Error fetching students:", err);
  }
}

function bindStudentActions() {
  document.querySelectorAll(".attendance-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("attendanceStudent").value = btn.dataset.name;
      attendanceModal.dataset.studentId = btn.dataset.id;
      openModal(attendanceModal);
    });
  });

  document.querySelectorAll(".grade-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("gradeStudent").value = btn.dataset.name;
      gradeModal.dataset.studentId = btn.dataset.id;
      openModal(gradeModal);
    });
  });
}

attendanceModal.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentId = attendanceModal.dataset.studentId;
  const status = attendanceModal.querySelector("select").value;
  const date = new Date().toISOString().split("T")[0];
  
  try {
    await axios.post(`/api/v1/teachers/attendance/${studentId}`, { date, status });
    alert("Attendance updated!");
    closeModal(attendanceModal);
    fetchStudents();
  } catch (err) {
    console.error("Error marking attendance:", err);
  }
});

gradeModal.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentId = gradeModal.dataset.studentId;
  const grade = gradeModal.querySelector("input[type='text']").value;
  const subject = gradeModal.querySelector("input[name= 'subject']").value;
  const score = gradeModal.querySelector("input[name= 'score']").value;

  try {
    await axios.put(`/api/v1/teachers/grades/${studentId}`, { subject, score, grade });
    alert("Grade updated!");
    closeModal(gradeModal);
    fetchStudents();
  } catch (err) {
    console.error("Error updating grade:", err);
  }
});

passwordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  try {
    await axios.put("/api/v1/teachers/changepassword", {
      currentPassword,
      newPassword
    });
    alert("Password updated successfully!");
    closeModal(passwordModal);
    passwordForm.reset();
  } catch (err) {
    console.error("Error changing password:", err);
    alert(err.response?.data?.msg || "Something went wrong");
  }
});

async function loadTeacherInfo() {
  try {
    const res = await axios.get('/api/v1/teachers/me');
    const teacher = res.data.teacher;

    document.querySelector(".teacher-name").textContent = `Welcome, ${teacher.name}`;

    classFilter.innerHTML = `<option value="">All Classes</option>`;
    teacher.classes.forEach(cls => {
      const opt = document.createElement("option");
      opt.value = cls;
      opt.textContent = cls;
      classFilter.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading teacher info:", err);
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

classFilter.addEventListener("change", fetchStudents);

window.addEventListener("popstate", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", () => {
  window.history.pushState(null, "", window.location.href);
});


fetchStudents();
loadTeacherInfo();