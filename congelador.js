/*let añadir = document.querySelector('#boton-con');
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
}*/
let añadir = document.querySelector('#boton-con');
let elemento = document.querySelector('#input-con');
let lista = document.querySelector('#lista-con');

document.addEventListener('DOMContentLoaded', function() {
    let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || []; 
    elementosCongelados.forEach(function(completo) { 
        agregarElemento(completo.objeto, completo.cantidad); 
    }); 
});

añadir.addEventListener('click', function() { 
    let objeto = elemento.value;
    let completo = { objeto, cantidad: 1 };
    let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || []; 
    elementosCongelados.push(completo);
    localStorage.setItem('listaCongelados', JSON.stringify(elementosCongelados));
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

    lista.appendChild(contenedor); 
}

function actualizarLocalStorage(objeto, cantidad) {
    let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || [];
    elementosCongelados = elementosCongelados.map(function(completo) {
        if (completo.objeto === objeto) {
            completo.cantidad = cantidad;
        }
        return completo;
    });
    localStorage.setItem('listaCongelados', JSON.stringify(elementosCongelados));
}

function eliminarDelLocalStorage(objeto) {
    let elementosCongelados = JSON.parse(localStorage.getItem('listaCongelados')) || [];
    elementosCongelados = elementosCongelados.filter(function(completo) {
        return completo.objeto !== objeto;
    });
    localStorage.setItem('listaCongelados', JSON.stringify(elementosCongelados));
}