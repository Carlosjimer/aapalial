let añadir = document.querySelector('#boton-add');
let elemento = document.querySelector('#input-add');
let lista = document.querySelector('#lista');

document.addEventListener('DOMContentLoaded', function() {
    let elementosGuardados = JSON.parse(localStorage.getItem('listaElementos')) || []; 
    elementosGuardados.forEach(function(completo) { 
        agregarElemento(completo.objeto, completo.id); 
    }); 
}); 
añadir.addEventListener('click', function() { 
    let id = new Date().getTime();
    let objeto = elemento.value;
    let completo = { objeto, id };
    let elementosGuardados = JSON.parse(localStorage.getItem('listaElementos')) || []; 
    elementosGuardados.push(completo);
    localStorage.setItem('listaElementos', JSON.stringify(elementosGuardados));
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
        let elementosGuardados = JSON.parse(localStorage.getItem('listaElementos')) || [];
        elementosGuardados = elementosGuardados.filter(function(completo) { 
            return completo.id !== id;
        });
        localStorage.setItem('listaElementos', JSON.stringify(elementosGuardados));
    });
    lista.appendChild(contenedor); 
}