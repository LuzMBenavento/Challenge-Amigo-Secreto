let amigo = [];
let amigosSorteados = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('amigo').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            agregarAmigo();
        }
    });
});

function agregarAmigo() {
    let amigoIngresado = document.getElementById('amigo');
    let nombreAmigo = amigoIngresado.value;

    if (nombreAmigo === '') {
        alert('Debes ingresar un nombre');
        return;
    }
    amigo.push(nombreAmigo);
    amigoIngresado.value = '';
    amigoIngresado.focus();
    mostrarAmigos();

    console.log(amigo);
}

function mostrarAmigos() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    amigo.forEach((nombreAmigo, index) => {
        let contenedorAmigo = document.createElement('div');
        contenedorAmigo.classList.add('amigo-item');

        let nombre = document.createElement('span');
        nombre.textContent = nombreAmigo;
        contenedorAmigo.appendChild(nombre);

        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('eliminar-amigo');
        botonEliminar.dataset.index = index;

        botonEliminar.addEventListener('click', function() {
            eliminarAmigo(this.dataset.index);
        });

        contenedorAmigo.appendChild(botonEliminar);
        listaAmigos.appendChild(contenedorAmigo);
    });
}

function sortearAmigo() {
    let resultado = document.getElementById('resultado');
    let limpiarLista = document.getElementById('listaAmigos');

    if (amigo.length === amigosSorteados.length) {
        resultado.innerHTML = 'Todos los amigos han sido sorteados.';
        limpiarLista.innerHTML = '';
        return;
    }

    let amigosDisponibles = amigo.filter(nombreAmigo => !amigosSorteados.includes(nombreAmigo));

    let amigoSorteado = amigosDisponibles[Math.floor(Math.random() * amigosDisponibles.length)];
    amigosSorteados.push(amigoSorteado);

    const resultadoItem = document.createElement('li');

    // Crear elementos de imagen para el GIF
    const gifIzquierda = document.createElement('img');
    gifIzquierda.src = 'assets/fuegos-artificiales.gif';
    gifIzquierda.classList.add('fuegos-artificiales');

    const gifDerecha = document.createElement('img');
    gifDerecha.src = 'assets/fuegos-artificiales.gif';
    gifDerecha.classList.add('fuegos-artificiales');

    // Agregar el GIF, el texto y el otro GIF al resultado
    resultadoItem.appendChild(gifIzquierda);
    resultadoItem.appendChild(document.createTextNode(`El amigo secreto es: ¡${amigoSorteado}!`));
    resultadoItem.appendChild(gifDerecha);

    resultado.innerHTML = '';
    resultado.appendChild(resultadoItem);
    limpiarLista.innerHTML = '';
}

function reiniciarSorteo() {
    amigo = [];
    amigosSorteados = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
}

function eliminarAmigo(index) {
    amigo.splice(index, 1);
    mostrarAmigos();
}