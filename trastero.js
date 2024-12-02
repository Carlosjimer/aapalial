let añadir = document.querySelector('#boton-tras');
let elemento = document.querySelector('#input-tras');
let lista = document.querySelector('#lista-tras');

document.addEventListener('DOMContentLoaded', function() {
    let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || []; 
    elementosTrastero.forEach(function(completo) { 
        agregarElemento(completo.objeto, completo.id); 
    }); 
}); 
añadir.addEventListener('click', function() { 
    let id = new Date().getTime();
    let objeto = elemento.value;
    let completo = { objeto, id };
    let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || []; 
    elementosTrastero.push(completo);
    localStorage.setItem('listaTrastero', JSON.stringify(elementosTrastero));
    agregarElemento(objeto, id); elemento.value = ''; 
});
function agregarElemento(objeto, id) {
    let contenedor = document.createElement('div');
    let parrafo = document.createElement('p');
    let boton = document.createElement('button');
    parrafo.textContent = objeto;
    contenedor.appendChild(parrafo);
    boton.textContent = 'Borrar';
    boton.id = id; contenedor.appendChild(boton);
    boton.addEventListener('click', function() { 
        lista.removeChild(contenedor);
        let elementosTrastero = JSON.parse(localStorage.getItem('listaTrastero')) || [];
        elementosTrastero = elementosTrastero.filter(function(completo) { 
            return completo.id !== id;
        });
        localStorage.setItem('listaTrastero', JSON.stringify(elementosTrastero));
    });
    lista.appendChild(contenedor); 
}