"use strict";

async function datosUsuarios() {

    const respuesta = await fetch("/api/usuario", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.token
        }
      });
    const json = await respuesta.json();

    if (respuesta.ok) {
        let tabla = `<div class="relative overflow-x-auto py-8">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Correo electrónico
                </th>
                <th scope="col" class="px-6 py-3">
                    Teléfono
                </th>
                <th scope="col" class="px-6 py-3">
                    DNI
                </th>
            </tr>
        </thead>
        <tbody>`;

        for (const persona of json) {
            const tlf = (persona.tlf)? persona.tlf :"-";
            const dni = (persona.dni)? persona.dni :"-";
            
            tabla += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
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
            
        tabla += "</tbody> </table>";

        document.querySelector("#tablaUsuarios").innerHTML = tabla;

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
    
    document.querySelector("#btnLogout").addEventListener("click", e=>{
        console.log(localStorage.token);
        localStorage.clear();
        console.log(localStorage.token);
        window.location = "login.html";
    });
}

main();


