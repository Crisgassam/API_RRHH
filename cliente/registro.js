'use strict';

const frm = document.querySelector('#frmRegistroUsuario');
const res = document.querySelector('#divResultado');

let errores = [];
if (!frm.tlf.value == '') {
    if (/^[0-9]{9}$/.test(frm.tlf.value) == false)
        errores.push('El teléfono debe tener el formato correcto.');
}

if (!frm.dni.value == '') {
    if (/^[0-9]{8}[a-zA-Z]$/.test(frm.dni.value) == false)
        errores.push('El dni debe tener el formato correcto.');
}

document.querySelector('btnRegistro').addEventListener('clck', function (e) {
    e.preventDefault();
    if (!errores == '') {
        for (let err of errores) {
            res.innerText = '<p>' + err + '</p>'
        }
    } else
    res.innerText = 'ok';
});

