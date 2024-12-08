let añadir = document.querySelector('#boton-tras');
let elemento = document.querySelector('#input-tras');
let lista = document.querySelector('#lista-tras');

document.addEventListener('DOMContentLoaded', function() {
    let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || []; 
    elementosTrastero.forEach(function(completo) { 
        agregarElemento(completo.objeto, completo.cantidad); 
    }); 
});

añadir.addEventListener('click', function() { 
    let objeto = elemento.value;
    let completo = { objeto, cantidad: 1 };
    let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || []; 
    elementosTrastero.unshift(completo);
    localStorage.setItem('listaTrastero', JSON.stringify(elementosTrastero));
    agregarElemento(objeto, 1);
    elemento.value = ''; 
});

function agregarElemento(objeto, cantidad) {
    let contenedor = document.createElement('div');
    let parrafo = document.createElement('p');
    let bot = document.createElement('div');
    bot.id = 'botonera';
    let botonMen = document.createElement('button');
    botonMen.textContent = '-';
    botonMen.id = 'res';
    let n = document.createElement('p');
    n.textContent = cantidad;
    let botonMas = document.createElement('button');
    botonMas.textContent = '+';
    botonMas.id = 'sum';
    parrafo.textContent = objeto;
    contenedor.appendChild(parrafo);
    contenedor.appendChild(bot);
    bot.appendChild(botonMen);
    bot.appendChild(n);
    bot.appendChild(botonMas);

    botonMas.addEventListener('click', function() {
        n.textContent = ++cantidad;
        actualizarLocalStorage(objeto, cantidad);
    });

    botonMen.addEventListener('click', function() {
        if (--cantidad <= 0) {
            lista.removeChild(contenedor);
            eliminarDelLocalStorage(objeto);
        } else {
            n.textContent = cantidad;
            actualizarLocalStorage(objeto, cantidad);
        }
    });

    lista.insertBefore(contenedor, lista.firstChild); 
}

function actualizarLocalStorage(objeto, cantidad) {
    let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || [];
    elementosTrastero = elementosTrastero.map(function(completo) {
        if (completo.objeto === objeto) {
            completo.cantidad = cantidad;
        }
        return completo;
    });
    localStorage.setItem('listaTrastero', JSON.stringify(elementosTrastero));
}

function eliminarDelLocalStorage(objeto) {
    let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || [];
    elementosTrastero = elementosTrastero.filter(function(completo) {
        return completo.objeto !== objeto;
    });
    localStorage.setItem('listaTrastero', JSON.stringify(elementosTrastero));
}