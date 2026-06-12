document.addEventListener('DOMContentLoaded', () => {
    cargarNavbar();
    cargarHabitaciones();
});
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnReservar');

    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (token) {
            window.location.href = 'reservaProyectoIntegrador.html';
        } else {
            window.location.href = 'loginProyectoIntegrador.html';
        }
    });
});
function cargarNavbar() {
    const menu = document.getElementById('menuUsuario');
    const token = localStorage.getItem('token');
    const user =
        JSON.parse(
            localStorage.getItem('user')
        );
    if (token) {
        menu.innerHTML += `
            <li class="nav-item">
                <a class="nav-link"
                   href="perfilReserva.html">
                    Usuario y Reservas
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                   href="#"
                   id="logoutBtn">
                    Cerrar Sesión
                </a>
            </li>
        `;
        document
            .getElementById('logoutBtn')
            .addEventListener(
                'click',
                logout
            );
    }
    else {
        menu.innerHTML += `
            <li class="nav-item">
                <a class="nav-link"
                   href="RegisterProyectoIntegrador.html">
                    Registrarse
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                   href="loginProyectoIntegrador.html">
                    Iniciar Sesión
                </a>
            </li>
        `;
    }
}
async function logout() {
    const token =
        localStorage.getItem('token');
    try {
        await fetch(
            'http://127.0.0.1:8000/api/logout',
            {
                method: 'POST',
                headers: {
                    'Authorization':
                        `Bearer ${token}`
                }
            }
        );
    }
    catch (error) {
        console.error(error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
}
async function cargarHabitaciones() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/room/index');
        const rooms = await response.json();
        const container = document.getElementById('roomsContainer');
        container.innerHTML = '';
        let html = '';
        rooms.datos.forEach(room => {
            html += `
                <div class="room-card-dynamic">
                    <img src="image/${room.imagen}" alt="${room.tipo}">
                </div>
            `;
        });
        container.innerHTML = html + html;
        iniciarCarruselAutomatico();
    } catch (error) {
        console.error(error);
    }
}
function iniciarCarruselAutomatico() {
    const container = document.getElementById('roomsContainer');
    let velocidad = 1;
    setInterval(() => {
        container.scrollLeft += velocidad;
        if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
        }
    }, 20);
}