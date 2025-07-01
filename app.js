let amigos = [];
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const spinner = document.getElementById('spinner');

// Modal elements
const modal = document.getElementById('modal');
const modalResult = document.getElementById('modal-result');
const modalClose = document.getElementById('modal-close');

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
    if (nuevoAmigo) nuevoAmigo.style.animation = 'fadeIn 0.3s ease';
}

function mostrarError(mensaje) {
    resultado.innerHTML = `<li style="color: #FF4444; font-weight: bold;">${mensaje}</li>`;
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
            <button onclick="eliminarAmigo(${index})" title="Eliminar participante">✕</button>
        `;
        listaAmigos.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
    resultado.innerHTML = '';
}

function limpiarLista() {
    amigos = [];
    actualizarListaAmigos();
    resultado.innerHTML = '';
    // Confeti de celebración por limpiar
    confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FF4444', '#FF8888']
    });
}

// Modal logic
if (modalClose) {
    modalClose.onclick = () => modal.classList.add('hidden');
    window.onclick = (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    };
}

function sortearAmigo() {
    if (amigos.length < 4) {
        mostrarError('Se necesitan al menos 4 participantes');
        return;
    }
    
    // Limpiar resultado y mostrar spinner
    resultado.innerHTML = '';
    spinner.classList.remove('hidden');

    let amigosSecretos, intentos = 0, maxIntentos = 1000;
    do {
        amigosSecretos = [...amigos];
        // Fisher-Yates shuffle
        for (let i = amigosSecretos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [amigosSecretos[i], amigosSecretos[j]] = [amigosSecretos[j], amigosSecretos[i]];
        }
        intentos++;
        // Verifica que nadie se asigne a sí mismo
    } while (amigos.some((amigo, idx) => amigo === amigosSecretos[idx]) && intentos < maxIntentos);

    if (intentos === maxIntentos) {
        spinner.classList.add('hidden');
        mostrarError('No se pudo realizar un sorteo válido, intenta de nuevo.');
        return;
    }

    // Simular tiempo de carga (2 segundos)
    setTimeout(() => {
        spinner.classList.add('hidden');
        
        // Confeti de celebración
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F806CC', '#A91079', '#570A57']
        });

        // Segundo confeti desde los lados
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 300);

        let asignaciones = [];
        for (let i = 0; i < amigos.length; i++) {
            asignaciones.push({ quien: amigos[i], aQuien: amigosSecretos[i] });
        }

        // Mostrar resultados con fade-in secuencial
        asignaciones.forEach((asignacion, index) => {
            setTimeout(() => {
                const li = document.createElement('li');
                li.style.opacity = 0;
                li.innerHTML = `<button onclick="mostrarModal('${asignacion.quien}', '${asignacion.aQuien}')">Ver amigo secreto de <b>${asignacion.quien}</b></button>`;
                resultado.appendChild(li);
                setTimeout(() => {
                    li.style.transition = 'opacity 0.5s ease';
                    li.style.opacity = 1;
                }, 50);
            }, index * 300);
        });
    }, 2000); // 2 segundos de spinner
}

function mostrarModal(nombre, amigoSecreto) {
    modalResult.innerHTML = `<b style="color: #A91079; font-size: 1.5rem;">${amigoSecreto}</b>`;
    modal.classList.remove('hidden');
    
    // Confeti pequeño al abrir modal
    confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#F806CC', '#A91079']
    });
}