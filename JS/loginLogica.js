document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {

            const response = await fetch(
                'http://127.0.0.1:8000/api/login',
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
                localStorage.setItem(
                    'user',
                    JSON.stringify(result.user)
                );
                alert('Inicio de sesión exitoso');
                window.location.href =
                    'IndexProyectoIntegrador.html';
            } else {

                alert(
                    result.mensaje ||
                    result.message ||
                    'Credenciales incorrectas'
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                'Error al conectar con el servidor'
            );
        }

    });

});