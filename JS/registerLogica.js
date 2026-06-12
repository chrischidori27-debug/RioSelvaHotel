document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registerForm');

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const form = document.getElementById('registerForm');
        const name = document.getElementById('name');
        const apellido = document.getElementById('apellido');
        const direccion = document.getElementById('direccion');
        const telefono = document.getElementById('telefono');
        const email = document.getElementById('email');


        form.addEventListener('submit', (e) => {
            if (name.value.trim().length < 3 || name.value.trim().length > 30) {
                e.preventDefault();
                name.classList.add('is-invalid');
            } else {
                name.classList.remove('is-invalid');
            }
            if (apellido.value.trim().length < 3 || apellido.value.trim().length > 30) {
                e.preventDefault();
                apellido.classList.add('is-invalid');
            } else {
                apellido.classList.remove('is-invalid');
            }
            if (direccion.value.trim().length < 10 || direccion.value.trim().length > 50) {
                e.preventDefault();
                direccion.classList.add('is-invalid');
            } else {
                direccion.classList.remove('is-invalid');
            }
            
            if (!email.value.endsWith('@gmail.com')) {
                e.preventDefault();
                email.classList.add('is-invalid');
            } else {
                email.classList.remove('is-invalid');
            }
        });

        const data = {
            name: document.getElementById('name').value,
            apellido: document.getElementById('apellido').value,
            direccion: document.getElementById('direccion').value,
            ci: document.getElementById('ci').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password_confirmation: document.getElementById('password_confirmation').value
        };
        console.log(data);
        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                localStorage.setItem(
                    'token',
                    result.token
                );
                alert('Usuario registrado correctamente');
                form.reset();
                window.location.href =
                    'loginProyectoIntegrador.html';
            } else {

                alert(
                    result.message ||
                    result.mensaje ||
                    'Error de validación'
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                'Registro invalido'
            );
        }
    });
});