$(document).ready(function() {
    // Verificar si hay un nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        $("#usernameDisplay").text(storedUsername);
    }
});
