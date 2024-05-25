$(document).ready(function() {
    const $form = $("form");

    // Verificar si hay un nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        $("#usernameDisplay").text(storedUsername);
    }

    $form.on("submit", function(event) {
        event.preventDefault();
        
        const email = $("#exampleInputEmail1").val();
        const password = $("#exampleInputPassword1").val();
        
        if (email === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (email === "usuario@example.com" && password === "password123") {
            alert("Inicio de sesión exitoso!");

            const username = "UsuarioPredeterminado"; // Este sería el nombre del usuario obtenido del sistema de autenticación
            localStorage.setItem('username', username);
            $("#usernameDisplay").text(username);

            window.location.href = "index.html";
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
        }
    });
});
