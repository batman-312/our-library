// 🔐 Universal password (only you know)
const UNIVERSAL_PASSWORD = "pv=nrt"; // change anytime

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;
  const error = document.getElementById("error");

  if (username.length > 0 && password === UNIVERSAL_PASSWORD) {

    if (remember) {
      localStorage.setItem("libraryAccess", "true");
      localStorage.setItem("libraryUser", username);
    } else {
      sessionStorage.setItem("libraryAccess", "true");
      sessionStorage.setItem("libraryUser", username);
    }

    window.location.href = "pg3.html";
  } else {
    error.style.display = "block";
  }
}
