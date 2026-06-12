let currentUserId = null;
document.addEventListener('DOMContentLoaded', () => {
    cargarReservas();
    cargarUsuario();
    document
        .getElementById('profileForm')
        .addEventListener('submit', actualizarUsuario);
});
async function cargarUsuario() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        alert("Error cargando usuario");
        return;
    }
    const user = data.datos;
    currentUserId = user.id;
    document.getElementById('name').value = user.name ?? '';
    document.getElementById('apellido').value = user.apellido ?? '';
    document.getElementById('ci').value = user.ci ?? '';
    document.getElementById('direccion').value = user.direccion ?? '';
    document.getElementById('email').value = user.email ?? '';
    document.getElementById('telefono').value = user.telefono ?? '';
}
async function actualizarUsuario(e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const apellido = document.getElementById('apellido');
    const direccion = document.getElementById('direccion');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');

    let valido = true;

    if (name.value.trim().length < 3 || name.value.trim().length > 30) {
        name.classList.add('is-invalid');
        valido = false;
    } else {
        name.classList.remove('is-invalid');
    }

    if (apellido.value.trim().length < 3 || apellido.value.trim().length > 30) {
        apellido.classList.add('is-invalid');
        valido = false;
    } else {
        apellido.classList.remove('is-invalid');
    }

    if (direccion.value.trim().length < 10 || direccion.value.trim().length > 50) {
        direccion.classList.add('is-invalid');
        valido = false;
    } else {
        direccion.classList.remove('is-invalid');
    }

    if (!email.value.trim().toLowerCase().endsWith('@gmail.com')) {
        email.classList.add('is-invalid');
        valido = false;
    } else {
        email.classList.remove('is-invalid');
    }

    if (
        telefono.value.trim().length !== 8 ||
        !/^\d+$/.test(telefono.value.trim())
    ) {
        telefono.classList.add('is-invalid');
        valido = false;
    } else {
        telefono.classList.remove('is-invalid');
    }

    if (!valido) {
        return;
    }
    const token = localStorage.getItem('token');
    if (!currentUserId) {
        alert("No se pudo identificar el usuario");
        return;
    }
    const body = {
        name: document.getElementById('name').value,
        apellido: document.getElementById('apellido').value,
        ci: document.getElementById('ci').value,
        direccion: document.getElementById('direccion').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    };
    const response = await fetch(
        `http://127.0.0.1:8000/api/user/actualizar/${currentUserId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
    );
    const data = await response.json();
    if (!response.ok) {
        alert(data.message || "Error actualizando usuario");
        return;
    }
    alert("Usuario actualizado correctamente");
    cargarUsuario();
}
async function cargarReservas() {

    const token = localStorage.getItem('token');

    const response = await fetch('http://127.0.0.1:8000/api/reservation/index', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        alert("Error cargando reservas");
        return;
    }

    const container = document.getElementById('reservasContainer');
    container.innerHTML = '';

    data.datos.forEach(reserva => {
        
        const servicios = reserva.services?.length
            ? reserva.services.map(s => `${s.nombre} (Bs. ${s.precio})`).join(', ')
            : 'Sin servicios';

        const habitacion = reserva.room
            ? `${reserva.room.tipo ?? 'Habitación'} #${reserva.room.numero ?? ''}`
            : `Habitación ID: ${reserva.room_id}`;

        let vehiculoTexto = 'Sin vehículo';
        let parkingTexto = 'Sin parking';

        if (reserva.parkings?.length > 0) {
            const p = reserva.parkings[0];

            if (p.vehicle) {
                vehiculoTexto = `${p.vehicle.modelo} [${p.vehicle.placa}]`;
            }

            if (p.parking) {
                parkingTexto = `Espacio ${p.parking.numero_espacio} (Bs. ${p.parking.precio})`;
            }
        }

        const fechaEntrada = new Date(reserva.fecha_entrada).toLocaleDateString();
        const fechaSalida = new Date(reserva.fecha_salida).toLocaleDateString();

        container.innerHTML += `
            <div class="reserva-card-item">

                <div class="reserva-card-header d-flex justify-content-between align-items-center mb-3">
                    <span class="badge-suite">
                        <i class="bi bi-door-open me-1"></i>
                        ${habitacion}
                    </span>
                </div>

                <div class="reserva-card-body">

                    <p>
                        <i class="bi bi-calendar-range me-2 text-success"></i>
                        <strong>Fechas:</strong>
                        ${fechaEntrada} - ${fechaSalida}
                    </p>

                    <p>
                        <i class="bi bi-people me-2 text-success"></i>
                        <strong>Huéspedes:</strong>
                        ${reserva.cantidad_personas}
                    </p>

                    <p>
                        <i class="bi bi-gear me-2 text-success"></i>
                        <strong>Servicios:</strong>
                        ${servicios}
                    </p>

                    <p>
                        <i class="bi bi-car-front me-2 text-success"></i>
                        <strong>Vehículo:</strong>
                        ${vehiculoTexto}
                    </p>

                    <p>
                        <i class="bi bi-p-circle me-2 text-success"></i>
                        <strong>Parking:</strong>
                        ${parkingTexto}
                    </p>

                    <p>
                        <i class="bi bi-cash me-2 text-success"></i>
                        <strong>Total:</strong> Bs. ${reserva.total}
                    </p>

                </div>

                <div class="reserva-card-footer mt-3">
                    <button type="button"
                        class="btn btn-card-cancel w-100"
                        onclick="cancelarReserva(${reserva.id})">
                        Cancelar Reserva <i class="bi bi-x-circle ms-1"></i>
                    </button>
                </div>

            </div>
        `;
    });
}
async function cancelarReserva(id) {

    const token = localStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:8000/api/reservation/eliminar/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        alert("Error cancelando reserva");
        return;
    }

    alert("Reserva cancelada");
    cargarReservas();
}
