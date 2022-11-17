const cvcOnCardBack = document.getElementById('card-back-cvc')
const cvcInput = document.getElementById('card-form-card-cvc');
const expiryMonthOnCardFront = document.getElementById('card-front-expiry-month');
const expiryYearOnCardFront = document.getElementById('card-front-expiry-year');
const monthExpiryInput = document.getElementById('card-form-card-expiry-month');
const yearExpiryInput = document.getElementById('card-form-card-expiry-year');
const cardNumberOnCardFront = document.getElementById('card-front-card-number');
const cardNumberInput = document.getElementById('card-form-card-number');
const cardHolderNameOnCardFront = document.getElementById('card-front-card-name');
const cardNameInput = document.getElementById('card-form-card-name');
const submitButton = document.getElementById('card-form-submit');
const nameError = document.getElementById('name-error');
const numberError = document.getElementById('number-error');
const cvcError = document.getElementById('cvc-error');

const sanitizeInputLength = (input, output, length) => {
    if (input >= length) {
        console.log("Triggered")
        output.value = output.value.slice(0, length);
    }
}

const inputHandlerCardName = (event) => {
    cardHolderNameOnCardFront.innerHTML = event.target.value;
}

const inputHandlerCardNumber = (event) => {
    let target = event.target, position = target.selectionEnd, length = target.value.length;
    target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' &&
        target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
    sanitizeInputLength(length, cardNumberInput, 19)
    cardNumberOnCardFront.innerHTML = target.value.replaceAll(' ', '&nbsp;&nbsp;');
}

const inputHandlerExpiryMonth = (event) => {
    sanitizeInputLength(event.target.value, monthExpiryInput, 2);
    expiryMonthOnCardFront.innerHTML = event.target.value;
}

const inputHandlerExpiryYear = (event) => {
    sanitizeInputLength(event.target.value, yearExpiryInput, 2);
    expiryYearOnCardFront.innerHTML = event.target.value;
}

const inputHandlerCVC = (event) => {
    sanitizeInputLength(event.target.value, cvcInput, 3);
    cvcOnCardBack.innerHTML = event.target.value;
}

const checkInputEmpty = (input, error) => {
    if (input.value === '') {
        error.innerHTML = "Can't be empty.";
        input.classList.add('input-error');
        return true;
    } else {
        error.innerHTML = '';
        input.classList.remove('input-error');
        return false
    }
}

const checkInputType = (input, error, toCheck, typeOfCheck) => {
    if (toCheck.test(input.value)) {
        error.innerHTML = `Can't contain ${typeOfCheck}.`;
        input.classList.add('input-error');
        return true
    } else {
        return false
    }
}

const checkInputLength = (input, inputType, error, length) => {
    if (input.value.length < length && input.value.length > 0) {
        error.innerHTML = `${inputType} is too short.`;
        return true;
    } else {
        return false;
    }
}

const sanitizeAndSubmit = (event) => {
    event.preventDefault();
    let errorArray = [];
    let characterCheck = /[a-zA-Z]/;
    let numberCheck = /\d/;
    errorArray.push(checkInputEmpty(cardNameInput, nameError));
    errorArray.push(checkInputType(cardNameInput, nameError, numberCheck, "number"));
    errorArray.push(checkInputEmpty(cardNumberInput, numberError));
    errorArray.push(checkInputType(cardNumberInput, numberError, characterCheck, 'characters'));
    errorArray.push(checkInputLength(cardNumberInput, "Card number", numberError, 16));
    errorArray.push(checkInputEmpty(cvcInput, cvcError));
    errorArray.push(checkInputType(cvcInput, cvcError, characterCheck, 'characters'));
    errorArray.push(checkInputLength(cvcInput, 'CVC', cvcError, 3));
    if (errorArray.includes(false)) {

    } else {
        nameError.innerHTML = "";
        numberError.innerHTML = "";
        cvcError.innerHTML = "";
        cardNameInput.classList.remove('input-error');
        cardNumberInput.classList.remove('input-error');
        cvcInput.classList.remove('input-error');
    }
}

cvcInput.addEventListener('input', inputHandlerCVC);
monthExpiryInput.addEventListener('input', inputHandlerExpiryMonth);
yearExpiryInput.addEventListener('input', inputHandlerExpiryYear);
cardNumberInput.addEventListener('input', inputHandlerCardNumber);
cardNameInput.addEventListener('input', inputHandlerCardName);
submitButton.addEventListener('click', sanitizeAndSubmit)

//TODO Sanitize when input submitted!
//Need to add 0 to Card Month on submit if length = 1 and < 9 after sanitizing
