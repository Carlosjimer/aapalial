let añadir = document.querySelector('#boton-con');
let elemento = document.querySelector('#input-con');
let lista = document.querySelector('#lista-con');

document.addEventListener('DOMContentLoaded', function() {
    let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || []; 
    elementosCongelados.forEach(function(completo) { 
        agregarElemento(completo.objeto, completo.id); 
    }); 
}); 
añadir.addEventListener('click', function() { 
    let id = new Date().getTime();
    let objeto = elemento.value;
    let completo = { objeto, id };
    let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || []; 
    elementosCongelados.push(completo);
    localStorage.setItem('listaCongelados', JSON.stringify(elementosCongelados));
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
        let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || [];
        elementosCongelados = elementosCongelados.filter(function(completo) { 
            return completo.id !== id;
        });
        localStorage.setItem('listaCongelados', JSON.stringify(elementosCongelados));
    });
    lista.appendChild(contenedor); 
}