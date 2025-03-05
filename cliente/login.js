"use strict";

/**
 * Realiza la operación de login
 * @param {Event} event 
 */
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const clave = document.getElementById("clave").value;

  const respuesta = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      clave
    })
  });
  const json = await respuesta.json();

  if (respuesta.ok) {
    localStorage.setItem("nombre", json.nombre);
    localStorage.setItem("email", json.email);
    localStorage.setItem("token", json.token);

    window.location = "empleado.html";
    
  } else {
    document.getElementById("divResultado").innerHTML = `
      <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
        ${json.error}
      </div>
    `;
  }
}


////////////////////
// MAIN
///////////////////
const frmLoginUsuario = document.getElementById("frmLoginUsuario");
frmLoginUsuario.addEventListener("submit", login);