function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  mensaje.textContent = ""; // limpia mensaje

  if (usuario === "ADMINISTRADOR" && password === "123456") {
    localStorage.setItem("logueado", "true");
    window.location.href = "dashboard.html";
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos";
  }
}