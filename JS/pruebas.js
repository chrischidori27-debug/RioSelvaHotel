document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('crear');

    if (!btn) {
        alert("Botón #crear no encontrado");
        return;
    }

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        const vehicleId = await crearVehiculo();

        if (!vehicleId) {
            alert("❌ Error al crear vehículo");
            return;
        }

        alert("✅ Vehículo creado correctamente. ID: " + vehicleId);
    });

});
async function crearVehiculo() {

    const token = localStorage.getItem('token');

    const marca = document.getElementById('marca').value;
    const color = document.getElementById('color').value;
    const placa = document.getElementById('placa')?.value;

    // VALIDACIÓN
    if (!marca || !color || !placa) {
        alert("❌ Campos incompletos (marca, color o placa)");
        return null;
    }

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

    const text = await response.text(); // 🔥 importante para ver errores

    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        alert("❌ Respuesta no es JSON válido:\n" + text);
        return null;
    }

    // SI FALLA EL BACKEND
    if (!response.ok) {
        alert(
            "❌ Error backend (" + response.status + "):\n\n" +
            (data.message || JSON.stringify(data))
        );
        return null;
    }

    // ÉXITO
    alert("🚗 Vehículo creado:\nID: " + data.datos.id);

    return data.datos.id;
}