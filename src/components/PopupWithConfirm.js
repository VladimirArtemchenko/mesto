import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement =
            this._popup.querySelector('.popup__form');
        this._subbmitButton = this._popup.querySelector('.popup__save-button')
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) =>
            this._handlerSubmitForm(evt)
        );
        super.setEventListeners();
    }

    setHandlerSubmit(handler) {
        this._handlerSubmitForm = handler
    }

    isLoading(isLoading) {
        if (isLoading === true) {
            this._subbmitButton.textContent = 'Удаление...';
            this._subbmitButton.disabled=true;
        } else {
            this._subbmitButton.textContent = 'Ok';
            this._subbmitButton.disabled=false;
        }
    }
}
