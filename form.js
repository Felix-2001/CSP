const DRAFT_KEY = 'kuivasjarvi-contact-draft';

const form = document.querySelector('#contact-form');
const statusBox = document.querySelector('#form-status');
const fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');

// Turn off the browser's bubbles, but only when this script runs.
form.noValidate = true;

function showError(field, message) {
    document.querySelector(`#${field.id}-error`).textContent = message;
    field.setAttribute('aria-invalid', 'true');
}

function clearError(field) {
    const error = document.querySelector(`#${field.id}-error`);
    if (error) error.textContent = '';
    field.removeAttribute('aria-invalid');
}

function messageFor(field) {
    const v = field.validity;
    const label = field.labels[0].textContent.replace(' *', '');
    if (v.valueMissing) return `${label}: please fill this in.`;
    if (v.typeMismatch) return 'Please enter an email address like name@example.com.';
    return 'Please check this field.';
}

// Submit: check everything, focus the first problem.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusBox.textContent = '';

    let firstInvalid = null;
    for (const field of fields) {
        if (field.validity.valid) {
            clearError(field);
        } else {
            showError(field, messageFor(field));
            firstInvalid ??= field;
        }
    }
    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

    const data = Object.fromEntries(new FormData(form));
    statusBox.textContent =
        `Thanks, ${data.name}! Your message is ready. We will get back to you.`;

    form.reset();
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
    }
});


form.addEventListener('input', (event) => {
    const field = event.target;
    if (field.getAttribute('aria-invalid') === 'true' && field.validity.valid) {
        clearError(field);
    }

    const data = Object.fromEntries(new FormData(form));
    delete data.access_key;
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (error) {
       
    }
});

try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
    if (saved) {
        for (const [name, value] of Object.entries(saved)) {
            if (form.elements[name]) form.elements[name].value = value;
        }
    }
} catch (error) {
}