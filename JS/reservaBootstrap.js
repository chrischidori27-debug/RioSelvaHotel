/* =========================================
   1. ANIMACIONES DE ENTRADA (AOS)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
});

/* =========================================
   2. LUCIÉRNAGAS (Efecto de Fondo)
   ========================================= */
const firefliesContainer = document.getElementById("fireflies");

if (firefliesContainer) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 40; i++) {
        const firefly = document.createElement("div");
        firefly.classList.add("firefly");
        firefly.style.left = Math.random() * 100 + "%";
        firefly.style.top = Math.random() * 100 + "%";
        firefly.style.animationDuration = (6 + Math.random() * 12) + "s";
        firefly.style.animationDelay = (Math.random() * 5) + "s";
        firefly.style.opacity = Math.random().toString();
        fragment.appendChild(firefly);
    }
    firefliesContainer.appendChild(fragment);
}

/* =========================================
   3. EFECTO PARALLAX 3D (Movimiento del Mouse)
   ========================================= */
const bookingCard = document.querySelector(".booking-card");

if (bookingCard && window.innerWidth > 992) {
    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 90;
        const y = (window.innerHeight / 2 - e.clientY) / 90;
        bookingCard.style.transform = `translate(${x}px, ${y}px) rotateX(${-y * 0.04}deg) rotateY(${x * 0.04}deg)`;
    });

    document.addEventListener("mouseleave", () => {
        bookingCard.style.transform = "translate(0px, 0px) rotateX(0deg) rotateY(0deg)";
        bookingCard.style.transition = "transform 0.8s ease-out";
    });
    
    document.addEventListener("mouseenter", () => {
        bookingCard.style.transition = "none";
    });
}

/* =========================================
   4. VALIDACIÓN DE FECHAS
   ========================================= */
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;

    checkinInput.addEventListener('change', () => {
        checkoutInput.min = checkinInput.value;
    });
}

/* =========================================
   5. CONTROL ADULTOS / NIÑOS DINÁMICO ("MÁS...")
   ========================================= */
function setupDynamicSelect(selectId, customInputId) {
    const selectEl = document.getElementById(selectId);
    const customInputEl = document.getElementById(customInputId);

    if (selectEl && customInputEl) {
        selectEl.addEventListener('change', function() {
            if (this.value === 'more') {
                // Ocultamos el select y mostramos el input numérico
                selectEl.classList.add('d-none');
                customInputEl.classList.remove('d-none');
                customInputEl.focus();
                
                // Quitamos el nombre del select para que no interfiera en el backend post
                selectEl.removeAttribute('name');
                customInputEl.setAttribute('name', selectId);
                customInputEl.required = true;
            }
        });

        // Si el usuario borra la caja y queda vacía, revertimos al select (Opcional)
        customInputEl.addEventListener('blur', function() {
            if (this.value === '') {
                customInputEl.classList.add('d-none');
                selectEl.classList.remove('d-none');
                selectEl.value = selectId === 'adults' ? '2' : '0';
                
                customInputEl.removeAttribute('name');
                selectEl.setAttribute('name', selectId);
                customInputEl.required = false;
            }
        });
    }
}

// Inicializamos el comportamiento en ambas cajas de huéspedes
setupDynamicSelect('adults', 'adults-custom');
setupDynamicSelect('kids', 'kids-custom');