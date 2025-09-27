# Student ERP System

A full-stack Student ERP (Enterprise Resource Planning) application built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JS. This project manages students, teachers, admins, classes, attendance, and grades — with role-based authentication.

---

## 🚀 Features

- 🔐 JWT Authentication (secure login system)
- 👩‍🎓 Role-based access (Admin, Teacher, Student)
- 🧑‍🏫 Admin panel: manage students & teachers
- 📄 Student portal: view profile, attendance, grades
- 🗂️ RESTful APIs with Express
- 🗄️ MongoDB models for users, students, and classes
- 🎨 Static frontend served with Express

---

## 📂 Project Structure

```
Student-ERP/
├── backend/
│   ├── controllers/       # Business logic (handle requests & responses)
│   │   ├── admins.js
│   │   ├── students.js
│   │   └── teachers.js
│   │
│   ├── middleware/        # Authentication & authorization
│   │   ├── auth.js
│   │   └── authroles.js
│   │
│   ├── models/            # MongoDB schemas
│   │   ├── user.js
│   │   ├── student.js
│   │   └── teacher.js
│   │
│   ├── routes/            # API route definitions
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── student.js
│   │   └── teacher.js
│   │
│   ├── utils/             # Helper functions (e.g., JWT generation, error handling)
│   │   └── generateToken.js
│   │
│   ├── app.js             # Express app setup
│   └── server.js          # Server entry point
│
├── frontend/              # Static frontend files
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── index.html
│
├── .env                   # Environment variables (ignored by Git)
├── .gitignore             # Files/folders to ignore in Git
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Mitul82/Basic-Student-ERP.git
cd Basic-Student-ERP
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

### 4. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

The server will start on 👉 `http://localhost:3000`

---

## 🌐 Deployment

This project can be deployed on:
- [Render](https://render.com) (recommended for free SSL & hosting)
- [Railway](https://railway.app)
- VPS with **Nginx + PM2**

---

## 🔑 API Endpoints

### Auth
- `POST /api/v1/auth/login` – Login user

### Student
- `GET /api/v1/student/profile` – View profile
- `GET /api/v1/student/attendance` – View attendance
- `GET /api/v1/student/grades` – View grades

### Teacher
- `POST /api/v1/teachers/attendance/:studentId` - Mark student attendance
- `PUT /api/v1/teachers/grades/:studentId` - Update student grades
- `GET /api/v1/teachers/students` - Get all students
- `GET /api/v1/teachers/me` - Get teacher profile

### Admin
- `POST /api/v1/admin/students` – Add student
- `DELETE /api/v1/admin/students/:studentId` – Remove student
- `GET /api/v1/admin/students` – Get all students
- `PUT /api/v1/admin/students/:studentId` – Update student
- `POST /api/v1/admin/teachers` – Add teacher
- `PUT /api/v1/admin/teachers/:teacherId` - Update teacher
- `DELETE /api/v1/admin/teachers/:teacherId` - Remove teacher
- `GET /api/v1/admin/teachers` – Get all teachers

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Render / Railway / Nginx + PM2

---

## 📌 To-Do / Future Improvements

- 💳 Add online fee payment gateway
- ⚛️ Build the frontend using frameworks like React, Angular, or Vue
- 📢 Add teacher dashboard for announcements and circulars
- 📅 Integrate class scheduling
- 📊 Add reports/analytics

---

## 👨‍💻 Author

**Mitul Srivastava**  
📧 [mitulsrivas@gmail.com](mailto:mitulsrivas@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/mitul82/)
🌐 [Live demo](https://basic-student-erp.onrender.com/)
