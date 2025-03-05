"use strict";

let boton =  document.querySelector("#btnCambiante");

if(localStorage.token){
    document.querySelector("#enlaceCuenta").innerHTML = "<a href='cuenta.html' class='mx-4 text-amber-800 underline cursor-pointer'>Mi cuenta</a>";
    boton.innerText = "Cerrar sesión";
    boton.addEventListener("click", e=>{
        console.log(localStorage.token);
        localStorage.clear();
        console.log(localStorage.token);
        window.location = "login.html";
    }); 
}else{
    boton.innerText = "Iniciar sesión";
    boton.addEventListener("click", e=>{
        window.location = "login.html";
    });
}
