let listaDeAmigos = []; //* En esta lista almacenamos los nombres de los amigos *\\
let listaParaAmigosSorteados = []; //* Esta lista almacenal los números  *\\

const regex = /^(?!\s*$)[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
 //* Esto nos permite restringir a que el nombre del usuario tenga solo letras y espacios *\\

function mostrarAmigos(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


console.log('Vamos a comenzar el Reto');

//* Esta es la función principal que agrega los nombres a la lista *\\
function agregarAmigo() {
    let nombreDeAmigo = document.getElementById('amigo').value;
    if (regex.test(nombreDeAmigo)) {
        verificarRepeticionDeAmigo(nombreDeAmigo);
    } else {
        alert('Por favor, introduce un nombre válido. Use solo letras y espacios');
    }
    console.log(listaDeAmigos);
    limpiarCaja();
}

//* Esta función limpia la caja *\\
function limpiarCaja() {
    document.querySelector('#amigo').value = '';
}

console.log(listaDeAmigos);

//* Esta función muestra los nombres de la lista en saltos de línea *\\
function mostrarAmigosEnSaltos() {
    let ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";
    listaDeAmigos.forEach(valor => {
        let li = document.createElement("li");
        li.textContent = valor;
        ul.appendChild(li);
    });
}

//* Esta función muestra si un nombre se repite *\\
function verificarRepeticionDeAmigo(nombreDeAmigo) {
    if (listaDeAmigos.includes(nombreDeAmigo)) {
        alert('Ya añadiste a un amigo con ese nombre, intenta con otro')

    } else {
        console.log(nombreDeAmigo);
        listaDeAmigos.push(nombreDeAmigo);
        mostrarAmigosEnSaltos();
    }
}



let listaNumerosSorteados = [];  

function elegirAlAmigo() {
    let numeroGeneradoParaSorteo = Math.floor(Math.random() * listaDeAmigos.length);
    console.log(numeroGeneradoParaSorteo);
    console.log(listaParaAmigosSorteados);  
    
    
    if (listaParaAmigosSorteados.length == listaDeAmigos.length) {

        textoParaSortearAmigos();

    } else {
        
        if (listaParaAmigosSorteados.includes(numeroGeneradoParaSorteo)) {
            return elegirAlAmigo();  
        } else {
            listaParaAmigosSorteados.push(numeroGeneradoParaSorteo);
            return numeroGeneradoParaSorteo;
        }
    }
    console.log(numeroGeneradoParaSorteo);
}

function sortearAmigo() {
    if (listaDeAmigos.length == 0) {
        alert('Por favor, añade un amigo');
    } else {
        let numeroDePosicion = elegirAlAmigo(); 
        let nombreGanador = listaDeAmigos[numeroDePosicion];
        console.log(nombreGanador);
        
        document.querySelector('#restablecer').disabled = false;

        resaltarGanador(nombreGanador);
    }
}


function reiniciarElJuego() {
    listaDeAmigos = [];
    listaParaAmigosSorteados = [];
    console.log(listaDeAmigos);
    mostrarAmigos('ul', '');
    textoParaSortearAmigos();
    document.querySelector('#restablecer').disabled = true; 
}

function textoParaSortearAmigos() { 
    let numeroDeLongitud = listaDeAmigos.length;
    let texto = '';

    if (listaParaAmigosSorteados.length == 0) {
        texto = 'Sortear amigo';
    } else {
        texto = 'Sortear otro amigo';
    }

    if (listaParaAmigosSorteados.length == numeroDeLongitud && listaParaAmigosSorteados.length > 0) {
        texto = 'Ups, son todos';
        document.querySelector('#restablecer').disabled = true;
        alert('Ya se sortearon todos los amigos');
    }

    
    let contenidoHTML = `<img src="assets/play_circle_outline.png" alt="Ícono para sortear" class="button-icon"> ${texto}`;
    mostrarAmigos('#textoDeSorteo', contenidoHTML);
}

textoParaSortearAmigos();



let ganadorActual = null; 

function resaltarGanador(nombre) {
    let listaItems = document.querySelectorAll("#listaAmigos li");


    if (ganadorActual) {
        ganadorActual.classList.remove("ganador");
    }

    listaItems.forEach(item => {
        if (item.textContent === nombre) {
            item.classList.add("ganador");
            ganadorActual = item;
        }
    });
}

