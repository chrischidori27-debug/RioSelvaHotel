document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicialización de Animaciones AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. Luciérnagas de Fondo Ambientales
    const firefliesContainer = document.getElementById("fireflies");
    if (firefliesContainer) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 35; i++) {
            const firefly = document.createElement("div");
            firefly.classList.add("firefly");
            firefly.style.left = Math.random() * 100 + "%";
            firefly.style.top = Math.random() * 100 + "%";
            firefly.style.animationDuration = (7 + Math.random() * 10) + "s";
            firefly.style.animationDelay = (Math.random() * 4) + "s";
            firefly.style.opacity = Math.random().toString();
            fragment.appendChild(firefly);
        }
        firefliesContainer.appendChild(fragment);
    }
});

// 3. Confirmación Dinámica de Cancelación
function confirmarCancelacion(reservaId) {
    const respuesta = confirm(`¿Estás completamente seguro de que deseas cancelar la reservación #${reservaId}? Esta acción no se puede revertir.`);
    
    if (respuesta) {
        // Asignamos el id de la reserva al input oculto antes de hacer submit
        document.getElementById('reserva-id-input').value = reservaId;
        document.getElementById('cancel-form').submit();
    }
}