const cvcOnCardBack = document.getElementById('card-back-cvc')
const cvcInput = document.getElementById('card-form-card-cvc');
const expiryMonthOnCardFront = document.getElementById('card-front-expiry-month');
const expiryYearOnCardFront = document.getElementById('card-front-expiry-year');
const monthExpiryInput = document.getElementById('card-form-card-expiry-month');
const yearExpiryInput = document.getElementById('card-form-year-expiry');
const cvcError = document.getElementById('cvc-error');

function sanitizeInputLength(input, output, length) {
    if (input >= length) {
        output.value = output.value.slice(0, length);
    }
}


function inputHandlerExpiryMonth(event) {
    sanitizeInputLength(event.target.value, monthExpiryInput, 2);
    expiryMonthOnCardFront.innerHTML = event.target.value;
}

function inputHandlerCVC(event) {
    sanitizeInputLength(event.target.value, cvcInput, 3);
    cvcOnCardBack.innerHTML = event.target.value;
}

cvcInput.addEventListener('input', inputHandlerCVC);
monthExpiryInput.addEventListener('input', inputHandlerExpiryMonth)


//TODO Sanitize when input submitted !