// Lista para almacenar los nombres de los amigos
let amigos = [];
// Lista para almacenar los amigos que ya han sido sorteados
let amigosSorteados = [];
// Variable para controlar el temporizador
let timeoutId = null;

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (nombre === '') {
        alert('Por favor, ingrese un nombre válido');
        return;
    }
    
    // Agregar el nombre a la lista
    amigos.push(nombre);
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
    
    // Actualizar la lista visible
    actualizarListaAmigos();
}

// Función para actualizar la lista visible de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        
        // Agregar botón para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '❌';
        btnEliminar.style.marginLeft = '10px';
        btnEliminar.onclick = () => eliminarAmigo(index);
        
        li.appendChild(btnEliminar);
        listaAmigos.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

// Función para sortear un amigo
function sortearAmigo() {
    // Verificar si hay amigos en la lista
    if (amigos.length === 0) {
        alert('Agregue al menos un amigo para realizar el sorteo');
        return;
    }
    
    // Si todos los amigos han sido sorteados, reiniciar la lista
    if (amigosSorteados.length === amigos.length) {
        amigosSorteados = [];
    }
    
    // Obtener amigos disponibles (no sorteados)
    const amigosDisponibles = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    
    // Seleccionar un amigo aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
    const amigoSeleccionado = amigosDisponibles[indiceAleatorio];
    
    // Agregar el amigo a la lista de sorteados
    amigosSorteados.push(amigoSeleccionado);
    
    // Mostrar el resultado
    mostrarResultado(amigoSeleccionado);
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(amigo) {
    const resultado = document.getElementById('resultado');
    
    // Limpiar el timeout anterior si existe
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    
    // Mostrar el resultado
    resultado.innerHTML = `<li>Tu amigo secreto es: ${amigo}</li>`;
    
    // Configurar el temporizador para ocultar el resultado después de 3 segundos
    timeoutId = setTimeout(() => {
        resultado.innerHTML = '';
    }, 3000);
}

// Agregar evento para permitir agregar amigos con la tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});