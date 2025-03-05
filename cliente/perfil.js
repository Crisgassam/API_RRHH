// VARIABLES
const frmRegistroUsuario = document.querySelector('#frmRegistroUsuario');
const dialogEliminarCuenta = document.querySelector('#dialogEliminarCuenta');
const btnCancelarEliminar = document.querySelector('#btnCancelarEliminar');
const btnConfirmarEliminar = document.querySelector('#btnConfirmarEliminar');
let id;


// FUCTIONS
async function datosUsuario() {

    const respuesta = await fetch("/api/usuario/" + localStorage.email, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.token
        }
      });
    const json = await respuesta.json();
    console.log(json);

      id = json.id;

    if (respuesta.ok) {

        let nombre = json.nombre || '';
        let email = localStorage.email;
        let tlf = json.tlf || '';
        let dni = json.dni || '';
       
        let form = `
            <div>
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre: <span class="text-red-500">*</span></label>
                <input value="${nombre}" type="text" name="nombre" id="nombre" class="bg-gray-50 border border-red-500 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Nombre" required>
            </div>
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico: <span class="text-red-500">*</span></label>
                <input value="${email}" type="email" name="email" id="email" class="bg-gray-50 border border-red-500 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="nombre@empresa.com" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$" required>
            </div>
            <div>
                <label for="clave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña:</label>
                <input type="password" name="clave" id="clave" placeholder="••••••••" class="bg-gray-50 border border-red-500 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500">
            </div>
            <div>
                <label for="tlf" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono:</label>
                <input value="${tlf}" type="text" name="tlf" id="tlf" placeholder="000000000" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="\d{9}" minlength="9" maxlength="9">
            </div>
            <div>
                <label for="dni" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI:</label>
                <input value="${dni}" type="text" name="dni" id="dni" placeholder="00000000A" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="\d{8}[A-Za-z]">
            </div>
            <span class="text-red-500">* Campos obligatorios</span><br>
            <button type="submit" id='btnModificar' class="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">Modificar usuario</button>
            <button type="submit" id='btnEliminar' class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">Eliminar usuario</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Para regresar a la pantalla anterior <a href="index.html" class="font-medium text-primary-600 hover:underline dark:text-primary-500"> pulsa aquí</a>
            </p>
            <div id="divResultado" class="notice"></div>
        `;

        frmRegistroUsuario.innerHTML = form;

        document.querySelector('#btnModificar').addEventListener('click', modificarUsuario);
        document.querySelector('#btnEliminar').addEventListener('click', mostrarDialog);
    } else {

    }
}

async function main() {
    //Redirección si el usuario no ha iniciado sesión
    if (!localStorage.token) {
        window.location = "login.html";
    }
    await datosUsuario();
}


async function modificarUsuario(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const clave = document.getElementById("clave").value;
    const tlf = document.getElementById("tlf").value;
    const dni = document.getElementById("dni").value;

    const respuesta = await fetch("/api/usuario/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify({
            nombre,
            email,
            clave,
            tlf,
            dni
        })
    });

    if (respuesta.ok) {
        window.location = "empleado.html";
    } else {
        document.getElementById("divResultado").innerHTML = `
        <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          ${json.error}
        </div>`;
    }
}


function mostrarDialog(e) {
    e.preventDefault();
    dialogEliminarCuenta.showModal();
    dialogEliminarCuenta.classList.remove('hidden');
}



async function eliminarUsuario(e) {
    e.preventDefault();

    

    const respuesta = await fetch("/api/usuario/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token
        }
    });

    if (respuesta.ok) {
        localStorage.clear();
        window.location = "login.html";
    } else {
        document.getElementById("divResultado").innerHTML = `
        <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          ${json.error}
        </div>`;
    }
}


// MAIN
main();

btnCancelarEliminar.addEventListener('click', () => {
    dialogEliminarCuenta.close();
    dialogEliminarCuenta.classList.add('hidden');
});

btnConfirmarEliminar.addEventListener('click', eliminarUsuario);
