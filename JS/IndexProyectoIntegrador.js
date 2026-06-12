/* =========================================
   AOS (Animaciones al Scroll)
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
   CONTADORES ANIMADOS (Stats)
   ========================================= */
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target') || 0;
        const current = +counter.innerText || 0;
        
        // Incremento inteligente para suavizar al final de la cuenta
        const increment = Math.ceil((target - current) / 12) || 1;

        if (current < target) {
            counter.innerText = current + increment;
            setTimeout(updateCounter, 25);
        } else {
            counter.innerText = target;
        }
    };

    // Usamos un IntersectionObserver para que el contador inicie solo al scrollear y verlo en pantalla
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            updateCounter();
            observer.disconnect(); // Se ejecuta una sola vez
        }
    }, { threshold: 0.5 });

    observer.observe(counter);
});

/* =========================================
   LUCIÉRNAGAS (Efecto de Ambiente)
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
   HOJAS CAYENDO (Efecto Resort Orgánico)
   ========================================= */
function createLeaf() {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.innerHTML = "🍃";
    
    // Evita usar innerWidth puro para prevenir desbordamientos horizontales de pantalla (bugs de scroll)
    leaf.style.left = Math.random() * 92 + "vw"; 
    
    const duration = 6 + Math.random() * 8;
    leaf.style.animationDuration = duration + "s";
    leaf.style.opacity = (0.4 + Math.random() * 0.6).toString();

    document.body.appendChild(leaf);

    // Recolección de basura limpia del DOM
    setTimeout(() => {
        leaf.remove();
    }, duration * 1000);
}

// Inicia la caída de hojas controlada
const leafInterval = setInterval(createLeaf, 900);

/* =========================================
   NAVBAR SCROLL EFECTO CHANGE
   ========================================= */
const navbar = document.querySelector(".glass-navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(2, 22, 15, 0.85)"; // Un verde selva oscuro sofisticado
            navbar.style.backdropFilter = "blur(20px)";
            navbar.style.webkitBackdropFilter = "blur(20px)";
            navbar.style.padding = "10px 0"; // Se encoge sutilmente al bajar
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.04)";
            navbar.style.backdropFilter = "blur(15px)";
            navbar.style.webkitBackdropFilter = "blur(15px)";
            navbar.style.padding = "15px 0";
        }
    });
}

/* =========================================
   EFECTO PARALLAX INTELIGENTE EN EL HERO
   ========================================= */
const hero = document.querySelector(".hero-content");

// Solo activamos Parallax en computadoras (las pantallas táctiles móviles sufren tirones con esto)
if (hero && window.innerWidth > 992) {
    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 65;
        const y = (window.innerHeight / 2 - e.clientY) / 65;
        
        hero.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.addEventListener("mouseleave", () => {
        hero.style.transform = "translate(0px, 0px)";
        hero.style.transition = "transform 0.6s ease-out";
    });
    
    document.addEventListener("mouseenter", () => {
        hero.style.transition = "none";
    });
}