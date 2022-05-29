export default class FormValidator {
    constructor(form, validationObject) {
        this._form = form;
        this._validationObject = validationObject;
        this._inputList = Array.from(this._form.querySelectorAll(`.${this._validationObject.inputSelector}`));
        this._button = this._form.querySelector(`.${this._validationObject.submitButtonSelector}`);

    }

    enableValidation() {
        this._setEventListeners();
    };


    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(`${this._validationObject.inputErrorClass}`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(`${this._validationObject.errorClass}`);
    };


    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(`${this._validationObject.inputErrorClass}`);
        errorElement.classList.remove(`${this._validationObject.errorClass}`);
        errorElement.textContent = "";
    };


    toggleButtonState() {
        if (!this._form.checkValidity()) {
            this._button.classList.add(`${this._validationObject.inactiveButtonClass}`);
            this._button.disabled = true;
        } else {
            this._button.classList.remove(`${this._validationObject.inactiveButtonClass}`);
            this._button.disabled = false;
        }
    };

    resetForm() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
