let form = document.querySelector('.form-register');
let progressOptions = document.querySelectorAll('.progressbar__option');
// Inputs del formulario que se van a validar
let elEmail = form.querySelector('#email');
let elPassword = form.querySelector('#password');
let elPassworConfirmation = form.querySelector('#password_confirmation');
let elFirstName = form.querySelector('#first_name');
let elLastName = form.querySelector('#last_name');
// Aquí agregar todos los inputs que se desean validar

form.addEventListener('click', function(e) {
    let element = e.target;
    let isButtonNext = element.classList.contains('step__button--next');
    let isButtonBack = element.classList.contains('step__button--back');
    if (isButtonNext || isButtonBack) {
        let currentStep = document.getElementById('step-' + element.dataset.step);
        let jumpStep = document.getElementById('step-' + element.dataset.to_step);
        if (isButtonNext && !validate(element.dataset.step)) {
            // La validación falló, no avanzar al siguiente paso
            return;
        }
        currentStep.addEventListener('animationend', function callback() {
            currentStep.classList.remove('active');
            jumpStep.classList.add('active');
            if (isButtonNext) {
                currentStep.classList.add('to-left');
                progressOptions[element.dataset.to_step - 1].classList.add('active');
            } else {
                jumpStep.classList.remove('to-left');
                progressOptions[element.dataset.step - 1].classList.remove('active');
            }
            currentStep.removeEventListener('animationend', callback);
        });
        currentStep.classList.add('inactive');
        jumpStep.classList.remove('inactive');
    }
});

// Escuchar el evento de cuando el formuario va enviar los datos
form.addEventListener('submit', function(e) {
    // Validar los datos antes de enviarlos
    // Pasar el último paso, en este ejemplo el último paso es el 3
    if (!validate(3)) {
        // Los datos son incorrectos por lo tanto no se deben de enviar
        e.preventDefault();
        return;
    }
    // Los datos se envian
});

function validate(currentStep) {
    // Validar que el correo no esté vacio
    if (elEmail.value === '') {
        alert('El campo correo es requerido');
        elEmail.focus();
        return false;
    }
    // Validar que la contraseña no esté vacia
    if (elPassword.value === '') {
        alert('El campo contraseña es requerido');
        elPassword.focus();
        return false;
    }
    // Validar que la contraseña tenga al menos 8 caracteres
    if (elPassword.value.length <= 7) {
        alert('El campo contraseña debe tener al menos 8 caracteres');
        elPassword.focus();
        return false;
    }
    // Validar que la contraseña coincida con la confirmación
    if (elPassword.value !== elPassworConfirmation.value) {
        alert('El campo contraseña no coincide con la confirmación');
        elPassworConfirmation.focus();
        return false;
    }
    // Validar campos del paso 2
    if (parseInt(currentStep) >= 2) {
        // Validar que el nombre no esté vacio
        if (elFirstName.value === '') {
            alert('El campo nombre es requerido');
            elFirstName.focus();
            return false;
        }
        // Validar que el apellido no esté vacio
        if (elLastName.value === '') {
            alert('El apellido es requerido');
            elLastName.focus();
            return false;
        }
    }
    // Validar los datos del paso 3 si es necesario
    if (parseInt(currentStep) >= 3) {
        console.log('Validar datos del paso 3.');
    }
    return true;
}
