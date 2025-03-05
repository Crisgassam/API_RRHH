// VARIABLES
const frmRegistroUsuario = document.querySelector('#frmRegistroUsuario');


// FUCTIONS
async function datosUsuario() {

    const respuesta = await fetch("/api/usuario/" + localStorage.email, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.token
        }
      });
    const json = await respuesta.json();

    if (respuesta.ok) {

        let nombre = json.nombre || '';
        let email = json.email || '';
        let clave = ''; 
        let tlf = json.tlf || '';
        let dni = json.dni || '';
       
        let form = `
            <div>
                <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input value="${nombre}" type="text" name="nombre" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" required>
            </div>
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                <input value="${email}" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@empresa.com" pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$" required>
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input value="${clave}" type="password" name="clave" id="clave" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div>
                <label for="tlf" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                <input value="${tlf}" type="text" name="tlf" id="tlf" placeholder="000000000" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div>
            <label for="dni" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input value="${dni}" type="text" name="dni" id="dni" placeholder="00000000A" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
                
            <button type="submit" id='btnModificar' class="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">Modificar</button>
            <div id="divResultado" class="notice"></div>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Para regresar a la pantalla anterior <a href="index.html" class="font-medium text-primary-600 hover:underline dark:text-primary-500"> pulsa aquí</a>
                </p>
            <div id="divResultado" class="notice"></div>
        `;

        frmRegistroUsuario.innerHTML = form;

        document.querySelector('#btnModificar').addEventListener('click', modificarUsuario);
    } else {

    }
}

async function main() {
    //Redirección si el usuario no ha iniciado sesión
    if (!localStorage.token) {
        window.location = "login.html";
    }
    await datosUsuario();
    
    document.querySelector("#btnLogout").addEventListener("click", e=>{
        console.log(localStorage.token);
        localStorage.clear();
        console.log(localStorage.token);
        window.location = "login.html";
    });
}


function modificarUsuario() {
    
    // Obtener los datos del formulario

    

}



// MAIN
main();

console.log(localStorage.email);
