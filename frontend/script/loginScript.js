const loginBtn = document.getElementById('loginBtn');
const errorDiv = document.getElementById('error');

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    errorDiv.textContent = 'Please enter both username and password.';
    return;
  }

  try {
    const response = await axios.post('/api/v1/login', { username, password });

    localStorage.setItem('token', response.data.token);

    console.log(response.data);
    const role = response.data.user.role;

    if (role === 'admin') {
      window.location.replace("../admin/dashboard.html");
    } else if (role === 'teacher') {
      window.location.replace("../teacher/dashboard.html");
    } else if (role === 'student') {
      window.location.replace("../student/dashboard.html");
    } else {
      errorDiv.textContent = 'Unknown role';
    }
  } catch (err) {
    if (err.response && err.response.data) {
      errorDiv.textContent = err.response.data.message;
    } else {
      errorDiv.textContent = 'Something went wrong. Try again.';
    }
  }
});