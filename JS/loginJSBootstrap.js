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
   LUCIÉRNAGAS (Efecto de Ambiente Global)
   ========================================= */
const firefliesContainer = document.getElementById("fireflies");

if (firefliesContainer) {
    const fragment = document.createDocumentFragment();
    
    // Inyectamos 40 luciérnagas de forma masiva y fluida
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
   HOJAS CAYENDO (Solo en el Home / index.html)
   ========================================= */
// Validamos si estamos en el Home (evitamos que caigan hojas sobre el formulario de login)
const isHomePage = document.querySelector(".hero");

if (isHomePage) {
    function createLeaf() {
        const leaf = document.createElement("div");
        leaf.classList.add("leaf");
        leaf.innerHTML = "🍃";
        
        leaf.style.left = Math.random() * 92 + "vw"; 
        const duration = 6 + Math.random() * 8;
        leaf.style.animationDuration = duration + "s";
        leaf.style.opacity = (0.4 + Math.random() * 0.6).toString();

        document.body.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, duration * 1000);
    }

    // Inicia intervalo de hojas
    const leafInterval = setInterval(createLeaf, 900);
}

/* =========================================
   CONTADORES ANIMADOS (Solo en el Home)
   ========================================= */
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target') || 0;
            const current = +counter.innerText || 0;
            const increment = Math.ceil((target - current) / 12) || 1;

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCounter, 25);
            } else {
                counter.innerText = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

/* =========================================
   NAVBAR SCROLL (Solo si existe en la página)
   ========================================= */
const navbar = document.querySelector(".glass-navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(2, 22, 15, 0.85)"; 
            navbar.style.backdropFilter = "blur(20px)";
            navbar.style.webkitBackdropFilter = "blur(20px)";
            navbar.style.padding = "10px 0"; 
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.04)";
            navbar.style.backdropFilter = "blur(15px)";
            navbar.style.webkitBackdropFilter = "blur(15px)";
            navbar.style.padding = "15px 0";
        }
    });
}

/* =========================================
   EFECTO PARALLAX COMPARTIDO (Mouse Move)
   ========================================= */
// Buscamos si existe el Hero del Home O la tarjeta del Login
const parallaxTarget = document.querySelector(".hero-content") || document.querySelector(".login-card");

if (parallaxTarget && window.innerWidth > 992) {
    document.addEventListener("mousemove", (e) => {
        // Movimiento sutil en base al centro de la pantalla
        const x = (window.innerWidth / 2 - e.clientX) / 70;
        const y = (window.innerHeight / 2 - e.clientY) / 70;
        
        parallaxTarget.style.transform = `translate(${x}px, ${y}px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
    });

    // Regreso ultrasuave cuando el mouse sale de la ventana gráfica
    document.addEventListener("mouseleave", () => {
        parallaxTarget.style.transform = "translate(0px, 0px) rotateX(0deg) rotateY(0deg)";
        parallaxTarget.style.transition = "transform 0.8s ease-out";
    });
    
    document.addEventListener("mouseenter", () => {
        parallaxTarget.style.transition = "none";
    });
}