// 🔐 ONE universal password
const UNIVERSAL_PASSWORD = "pv=nrt"; // your password

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;
  const error = document.getElementById("error");

  if (username.length > 0 && password === UNIVERSAL_PASSWORD) {

    if (remember) {
      // persistent login
      localStorage.setItem("pg3Access", "true");
      localStorage.setItem("pg3User", username);
    } else {
      // session-only login
      sessionStorage.setItem("pg3Access", "true");
      sessionStorage.setItem("pg3User", username);
    }

    window.location.href = "pg3.html";
  } else {
    error.style.display = "block";
  }
}
