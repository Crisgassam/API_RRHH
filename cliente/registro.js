"use strict";

/**
 * Realiza la operación de registro
 * @param {Event} event 
 */
async function registro(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
    const tlf = document.getElementById("tlf").value;
    const dni = document.getElementById("dni").value;

    const respuesta = await fetch("/api/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            email,
            clave,
            tlf,
            dni
        })
    });
    const json = await respuesta.json();

    if (respuesta.ok) {
       
        window.location = "login.html";

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
const frmRegistroUsuario = document.getElementById("frmRegistroUsuario");
frmRegistroUsuario.addEventListener("submit", registro);

