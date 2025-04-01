let amigos = [];
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Agregar evento de tecla Enter
inputAmigo.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    
    if (nombre === '') {
        mostrarError('Por favor ingresa un nombre');
        return;
    }
    
    if (amigos.includes(nombre)) {
        mostrarError('Este nombre ya está en la lista');
        return;
    }
    
    amigos.push(nombre);
    actualizarListaAmigos();
    inputAmigo.value = '';
    
    // Animación de éxito
    const nuevoAmigo = listaAmigos.lastElementChild;
    nuevoAmigo.style.animation = 'fadeIn 0.3s ease';
}

function mostrarError(mensaje) {
    resultado.innerHTML = `<li style="color: #FF4444">${mensaje}</li>`;
    setTimeout(() => {
        resultado.innerHTML = '';
    }, 3000);
}

function actualizarListaAmigos() {
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${amigo}
            <button onclick="eliminarAmigo(${index})" 
                    style="background: none; border: none; color: #FF4444; cursor: pointer; margin-left: 10px">
                ✕
            </button>
        `;
        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

function sortearAmigo() {
    if (amigos.length < 4) {
        mostrarError('Se necesitan al menos 4 participantes');
        return;
    }
    
    resultado.innerHTML = '';
    let amigosSecretos = [...amigos];
    let asignaciones = [];
    
    // Algoritmo de Fisher-Yates para mezclar el array
    for (let i = amigosSecretos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSecretos[i], amigosSecretos[j]] = [amigosSecretos[j], amigosSecretos[i]];
    }
    
    // Asignar amigos secretos
    for (let i = 0; i < amigos.length; i++) {
        let siguiente = i === amigos.length - 1 ? 0 : i + 1;
        asignaciones.push(`${amigos[i]} → ${amigosSecretos[siguiente]}`);
    }
    
    // Mostrar resultados con animación
    asignaciones.forEach((asignacion, index) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = asignacion;
            li.style.animation = 'fadeIn 0.5s ease';
            resultado.appendChild(li);
        }, index * 500);
    });
}