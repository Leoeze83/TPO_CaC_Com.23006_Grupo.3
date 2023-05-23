const formulario = document.getElementById('form');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const telefonoInput = document.getElementById('telefono');
const mensajeInput = document.getElementById('mensaje');
const alerta = document.getElementById('alerta');

formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents automatic form submission

  if (nombreInput.value.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu nombre');
    nombreInput.focus();
    return;
  }

  if (correoInput.value.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu correo electrónico');
    correoInput.focus();
    return;
  }

  if (!validarCorreoElectronico(correoInput.value.trim())) {
    mostrarAlerta('Por favor, ingresa un correo electrónico válido');
    correoInput.focus();
    return;
  }

  if (telefonoInput.value.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu número de teléfono');
    telefonoInput.focus();
    return;
  }

  if (!/^\d+$/.test(telefonoInput.value.trim())) {
    mostrarAlerta('Por favor, ingresa solo números en el campo de teléfono');
    telefonoInput.focus();
    return;
  }

  if (mensajeInput.value.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu mensaje');
    mensajeInput.focus();
    return;
  }

  alerta.innerHTML = ''; // Clears the alert message if any
  formulario.submit(); // Submits the form
});

function mostrarAlerta(mensaje) {
  alerta.innerHTML = mensaje;
}

function validarCorreoElectronico(correo) {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresionRegular.test(correo);
}