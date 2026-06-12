document.addEventListener(
    'DOMContentLoaded',
    () => {
        cargarHabitaciones();
        cargarParkings();
        cargarServicios();
        document
            .getElementById('reservationForm')
            .addEventListener(
                'submit',
                enviarReserva
            );
    }
);
async function crearVehiculo() {

    const token = localStorage.getItem('token');

    const marca = document.getElementById('marca').value;
    const color = document.getElementById('color').value;
    const placa = document.getElementById('placa').value;

    if (!marca || !color || !placa) return null;

    const response = await fetch(
        'http://127.0.0.1:8000/api/vehicle/crear',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                placa: placa,
                color: color,
                modelo: marca
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("ERROR VEHÍCULO:", data);
        return null;
    }
    return data.datos.id;
}
async function cargarHabitaciones() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            'http://127.0.0.1:8000/api/room/index'
        );
        const rooms =
            await response.json();
        const container =
            document.getElementById(
                'roomsContainer'
            );
        container.innerHTML = '';
        rooms.datos.forEach(room => {
            container.innerHTML += `
                <div
                    class="room-card"
                    onclick="seleccionarHabitacion(${room.id}, this)">
                    <img
                        src="image/${room.imagen}"
                        alt="${room.tipo}">

                    <div class="room-info">
                        <h5>${room.tipo}</h5>
                        <p>
                            Capacidad:
                            ${room.capacidad}
                        </p>
                        <p>Numero: ${room.numero}</p>
                        <p>
                            Bs. ${room.precio}
                        </p>
                        <p>
                            ${room.descripcion}
                        </p>
                    </div>
                </div>
            `;
        });
    }
    catch(error) {
        console.error(
            'Error cargando habitaciones:',
            error
        );
    }
}
function seleccionarHabitacion(
    id,
    elemento
) {
    document
        .querySelectorAll('.room-card')
        .forEach(card =>
            card.classList.remove(
                'selected'
            )
        );
    elemento.classList.add(
        'selected'
    );
    document.getElementById(
        'room_id'
    ).value = id;
}
async function cargarServicios() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            'http://127.0.0.1:8000/api/service/index',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            }
        );
        if (!response.ok) {
            console.error('Error HTTP:', response.status);
            return;
        }
        const servicios = await response.json();
        const container = document.getElementById('serviciosContainer');
        container.innerHTML = '';
        servicios.datos.forEach(servicio => {
            container.innerHTML += `
                <div class="service-card"
                     onclick="seleccionarServicio(${servicio.id}, this)">
                    <div class="service-info">
                        <h5>${servicio.nombre}</h5>
                        <p>${servicio.descripcion}</p>
                        <p>${servicio.employee.nombre}</p>
                        <p><strong>Bs. ${servicio.precio}</strong></p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error cargando servicios:', error);
    }
}
let serviciosSeleccionados = [];
function seleccionarServicio(id, elemento) {
    const index = serviciosSeleccionados.indexOf(id);
    if (index === -1) {
        serviciosSeleccionados.push(id);
        elemento.classList.add('selected');
    } else {
        serviciosSeleccionados.splice(index, 1);
        elemento.classList.remove('selected');
    }
    console.log('Servicios seleccionados:', serviciosSeleccionados);
}
async function cargarParkings() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
            'http://127.0.0.1:8000/api/parking/index',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            }
        );
        if (!response.ok) {
            console.error('Error cargando parkings:', response.status);
            return;
        }
        const data = await response.json();
        const select = document.getElementById('parking_id');
        // mantener opción por defecto
        select.innerHTML = `
            <option value="">
                Sin estacionamiento
            </option>
        `;
        data.datos.forEach(parking => {
            select.innerHTML += `
                <option value="${parking.id}">
                    Parqueo ${parking.id} - Bs. ${parking.precio ?? 0}
                </option>
            `;
        });
    } catch (error) {
        console.error('Error cargando parkings:', error);
    }
}
async function enviarReserva(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const fechaEntrada = document.getElementById('fecha_entrada').value;
    const fechaSalida = document.getElementById('fecha_salida').value;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);

    if (entrada < hoy) {
        alert('La fecha de entrada no puede ser anterior a la fecha actual.');
        return;
    }

    if (salida < hoy) {
        alert('La fecha de salida no puede ser anterior a la fecha actual.');
        return;
    }

    if (entrada >= salida) {
        alert('La fecha de entrada debe ser menor que la fecha de salida.');
        return;
    }

    const marca = document.getElementById('marca')?.value;
    const color = document.getElementById('color')?.value;
    const placa = document.getElementById('placa')?.value;

    let vehicle_id = null;

    const tieneVehiculo = marca || color || placa;

    if (tieneVehiculo) {

        if (!marca || !color || !placa) {
            alert("Complete todos los datos del vehículo o déjelos vacíos");
            return;
        }

        vehicle_id = await crearVehiculo();

        if (!vehicle_id) {
            alert("Error al crear vehículo");
            return;
        }
    }

    // 2. ARMAR RESERVA
    const reserva = {
        fecha_entrada: document.getElementById('fecha_entrada').value,
        fecha_salida: document.getElementById('fecha_salida').value,
        metodo_pago: document.getElementById('metodo_pago').value,
        cantidad_personas: Number(document.getElementById('cantidad_personas').value),
        room_id: Number(document.getElementById('room_id').value),
        services: serviciosSeleccionados.length ? serviciosSeleccionados : null,
        parking_id: Number(document.getElementById('parking_id').value) || null,
        vehicle_id: vehicle_id
    };

    console.log("RESERVA FINAL:", reserva);

    // 3. ENVIAR
    const response = await fetch(
        'http://127.0.0.1:8000/api/reservation/crear',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reserva)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        console.error(result);
        alert(result.mensaje || 'Error creando reserva');
        return;
    }

    alert("Reserva creada correctamente");
    console.log(result);
}