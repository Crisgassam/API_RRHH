"use strict";

//iconos botones
const aZ = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sort-a-z"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 8h4l-4 8h4" /><path d="M4 16v-6a2 2 0 1 1 4 0v6" /><path d="M4 13h4" /><path d="M11 12h2" /></svg>';

const zA = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sort-z-a"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4l-4 8h4" /><path d="M16 16v-6a2 2 0 1 1 4 0v6" /><path d="M16 13h4" /><path d="M11 12h2" /></svg>';


async function datosUsuarios() {

    const respuesta = await fetch("/api/usuario", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.token
        }
    });
    const json = await respuesta.json();

    if (respuesta.ok) {
        let tablaS = `<div class="relative overflow-x-auto py-8">
    <table name="tablaUsuarios" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                <button id="ordenarNombre" class="flex items-center">
                    Nombre <span class="bg-amber-600 text-white dark:text-white hover:bg-amber-700 focus:ring-4 focus:ring-gray-300 rounded-lg px-2 py-1 ml-2 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-gray-800 cursor-pointer" id="iconoNombre">${aZ}</span>
                </button>
            </th>
            <th scope="col" class="px-6 py-3">
                <button id="ordenarCorreo" class="flex items-center">
                    Correo electrónico <span class="bg-amber-600 text-white dark:text-white hover:bg-amber-700 focus:ring-4 focus:ring-gray-300 rounded-lg px-2 py-1 ml-2 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-gray-800 cursor-pointer" id="iconoCorreo">${aZ}</span>
                </button>
            </th>
            <th scope="col" class="px-6 py-3">Teléfono</th>
            <th scope="col" class="px-6 py-3">DNI</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">`;

        for (const persona of json) {
            const tlf = (persona.tlf) ? persona.tlf : "-";
            const dni = (persona.dni) ? persona.dni : "-";

            tablaS += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4">
                    ${persona.nombre}
                </td>
                <td class="px-6 py-4">
                    ${persona.email}
                </td>
                <td class="px-6 py-4">
                    ${tlf}
                </td>
                <td class="px-6 py-4">
                    ${dni}
                </td>
            </tr>`
        }

        tablaS += "</tbody> </table>";

        document.querySelector("#tablaUsuarios").innerHTML = tablaS;

        tablaCargada();

    } else {
        document.querySelector("#tablaUsuarios").innerHTML = `<div class="p-4 my-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">Error al obtener los datos</div>`;
    }
}


////////////////////
// MAIN
///////////////////

async function main() {
    //Redirección si el usuario no ha iniciado sesión
    if (!localStorage.token) {
        window.location = "login.html";
    }
    await datosUsuarios();

    document.querySelector("#btnLogout").addEventListener("click", e => {
        console.log(localStorage.token);
        localStorage.clear();
        console.log(localStorage.token);
        window.location = "login.html";
    });
}

main();


function tablaCargada() {
    const tabla = document.getElementById("cuerpoTabla");
    const botonNombre = document.getElementById("ordenarNombre");
    const botonCorreo = document.getElementById("ordenarCorreo");
    const iconoNombre = document.getElementById("iconoNombre");
    const iconoCorreo = document.getElementById("iconoCorreo");


    let ordenNombreAscendente = true;
    let ordenCorreoAscendente = true;

    function ordenarTabla(columna, ascendente, icono) {
        let filas = Array.from(tabla.rows);

        filas.sort((a, b) => {
            let textoA = a.cells[columna].textContent.trim().toLowerCase();
            let textoB = b.cells[columna].textContent.trim().toLowerCase();

            return ascendente ? textoA.localeCompare(textoB) : textoB.localeCompare(textoA);
        });

        filas.forEach(fila => tabla.appendChild(fila)); // Reordenar la tabla

        // Cambiar el icono de la flecha
        icono.innerHTML = ascendente ? aZ : zA;
    }

    botonNombre.addEventListener("click", function () {
        ordenarTabla(0, ordenNombreAscendente, iconoNombre);
        ordenNombreAscendente = !ordenNombreAscendente;
        ordenCorreoAscendente = true;
        iconoCorreo.innerHTML = aZ;
    });

    botonCorreo.addEventListener("click", function () {
        ordenarTabla(1, ordenCorreoAscendente, iconoCorreo);
        ordenCorreoAscendente = !ordenCorreoAscendente;
        ordenNombreAscendente = true;
        iconoNombre.innerHTML = aZ;
    });

}
