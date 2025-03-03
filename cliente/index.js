"use strict";

let boton =  document.querySelector("#btnCambiante");

if(localStorage.token){
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
