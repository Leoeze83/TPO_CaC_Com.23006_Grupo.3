
const formulario = document.getElementById('form');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const telefonoInput = document.getElementById('telefono');
const mensajeInput = document.getElementById('mensaje');
const alerta = document.getElementById('alerta');

formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío automático del formulario

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

  if (mensajeInput.value.trim() === '') {
    mostrarAlerta('Por favor, ingresa tu mensaje');
    mensajeInput.focus();
    return;
  }

  // Si llega hasta aquí, todos los campos son válidos
  alerta.innerHTML = ''; // Limpia el mensaje de alerta si lo hay
  formulario.submit(); // Envía el formulario
});

function mostrarAlerta(mensaje) {
  alerta.innerHTML = mensaje;
}

function validarCorreoElectronico(correo) {
  // Utiliza una expresión regular para validar el formato del correo electrónico
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresionRegular.test(correo);
}