/* ===================================
   AOS
=================================== */

AOS.init({

    duration: 1200,
    once: true

});

/* ===================================
   VALIDACIONES BOOTSTRAP
=================================== */

(() => {

    'use strict';

    const forms =
        document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {

        form.addEventListener('submit', event => {

            if (!form.checkValidity()) {

                event.preventDefault();
                event.stopPropagation();

            }

            form.classList.add('was-validated');

        }, false);

    });

})();

/* ===================================
   MOSTRAR / OCULTAR PASSWORD
=================================== */

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    const type =
        passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";

    passwordInput.setAttribute("type", type);

    togglePassword.innerHTML =
        type === "password"
            ? '<i class="bi bi-eye-fill"></i>'
            : '<i class="bi bi-eye-slash-fill"></i>';

});

/* ===================================
   FUERZA DE CONTRASEÑA
=================================== */

const bar =
    document.getElementById("passwordBar");

const text =
    document.getElementById("passwordText");

passwordInput.addEventListener("input", () => {

    const value =
        passwordInput.value;

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    switch (score) {

        case 1:

            bar.style.width = "20%";
            bar.style.background = "#dc3545";

            text.innerHTML =
                "🔴 Contraseña muy débil";

            break;

        case 2:

            bar.style.width = "40%";
            bar.style.background = "#fd7e14";

            text.innerHTML =
                "🟠 Contraseña débil";

            break;

        case 3:

            bar.style.width = "60%";
            bar.style.background = "#ffc107";

            text.innerHTML =
                "🟡 Contraseña aceptable";

            break;

        case 4:

            bar.style.width = "80%";
            bar.style.background = "#20c997";

            text.innerHTML =
                "🟢 Contraseña fuerte";

            break;

        case 5:

            bar.style.width = "100%";
            bar.style.background = "#198754";

            text.innerHTML =
                "💪 Contraseña muy segura";

            break;

        default:

            bar.style.width = "0%";
            text.innerHTML = "";

    }

});

/* ===================================
   LUCIERNAGAS
=================================== */

const fireflies =
    document.getElementById("fireflies");

for (let i = 0; i < 40; i++) {

    const firefly =
        document.createElement("div");

    firefly.classList.add("firefly");

    firefly.style.left =
        Math.random() * 100 + "%";

    firefly.style.animationDuration =
        (8 + Math.random() * 10) + "s";

    firefly.style.animationDelay =
        Math.random() * 5 + "s";

    firefly.style.opacity =
        Math.random();

    fireflies.appendChild(firefly);

}

/* ===================================
   HOJAS CAYENDO
=================================== */

function createLeaf() {

    const leaf =
        document.createElement("div");

    leaf.classList.add("leaf");

    leaf.innerHTML = "🍃";

    leaf.style.left =
        Math.random() * window.innerWidth + "px";

    leaf.style.animationDuration =
        (6 + Math.random() * 8) + "s";

    leaf.style.opacity =
        Math.random();

    document.body.appendChild(leaf);

    setTimeout(() => {

        leaf.remove();

    }, 15000);

}

setInterval(createLeaf, 800);

/* ===================================
   EFECTO NAVBAR SCROLL
=================================== */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".glass-navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(0,0,0,.55)";

        navbar.style.backdropFilter =
            "blur(20px)";

    }
    else {

        navbar.style.background =
            "rgba(255,255,255,.08)";

    }

});

/* ===================================
   MENSAJE DE BIENVENIDA
=================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        console.log(
            "🌿 Bienvenido a Amazon Paradise Resort 🌿"
        );

    }, 1000);

});

/* ===================================
   EFECTO BRILLO CARD
=================================== */

const card =
    document.querySelector(".form-card");

document.addEventListener("mousemove", (e) => {

    const x =
        (window.innerWidth / 2 - e.pageX) / 35;

    const y =
        (window.innerHeight / 2 - e.pageY) / 35;

    card.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

/* ===================================
   RESTABLECER CARD
=================================== */

document.addEventListener("mouseleave", () => {

    card.style.transform =
        "rotateY(0deg) rotateX(0deg)";

});