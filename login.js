$(document).ready(function() {
    // Seleccionar el formulario
    const $form = $("form");
    
    // Añadir un listener al evento de envío del formulario
    $form.on("submit", function(event) {
        // Prevenir el comportamiento por defecto del formulario
        event.preventDefault();
        
        // Obtener los valores de los campos de entrada
        const email = $("#exampleInputEmail1").val();
        const password = $("#exampleInputPassword1").val();
        
        // Validar que los campos no estén vacíos
        if (email === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Simular el proceso de autenticación
        if (email === "usuario@example.com" && password === "password123") {
            alert("Inicio de sesión exitoso!");
            // Redirigir a la página principal o a otra página
            window.location.href = "index.html";
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
        }
    });
});
