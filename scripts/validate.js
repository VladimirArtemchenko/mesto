const validateObject = {
    formSelector: "popup__form",
    inputSelector: "popup__input",
    submitButtonSelector: "popup__save-button",
    inactiveButtonClass: "popup__save-button_type_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "error_active",
};

const enableValidation = (object) => {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, object);
    });
};

const setEventListeners = (formElement, object) => {
    const inputList = Array.from(
        formElement.querySelectorAll(`.${object.inputSelector}`)
    );
    const buttonElement = formElement.querySelector(
        `.${object.submitButtonSelector}`
    );
    toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(
                formElement,
                inputElement,
                object.errorClass,
                object.inputErrorClass
            );
            toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
        });
    });
};

const checkInputValidity = (
    formElement,
    inputElement,
    errorClass,
    inputErrorClass
) => {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            errorClass,
            inputErrorClass
        );
    } else {
        hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
};

const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    errorClass,
    inputErrorClass
) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (
    formElement,
    inputElement,
    errorClass,
    inputErrorClass
) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = "";
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${inactiveButtonClass}`);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(`${inactiveButtonClass}`);
        buttonElement.disabled = false;
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

enableValidation(validateObject);