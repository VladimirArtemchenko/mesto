const openEditFormButton = document.querySelector('.profile__edit-button');
const popupEditInfo = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_name_username');
const jobInput = document.querySelector('.popup__input_name_userjob');
const editForm = document.forms.edit;
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsList = document.querySelector(".cards__list");
const popupNewCard = document.querySelector('.popup_type_new-card');
const openNewCardFormButton = document.querySelector('.profile__new-card-button');
const newCardForm = document.forms.newcard;
const newCardName = document.querySelector('.popup__input_name_card-name');
const newCardLink = document.querySelector('.popup__input_name_card-link');
const cardTemplate = document.querySelector('#card-template').content;
const preview = document.querySelector('.popup_type_preview');
const previewImage = document.querySelector('.popup__image');
const previewTitle = document.querySelector('.popup__title_type_preview');
const popupList = Array.from(document.querySelectorAll('.popup'));

openEditFormButton.addEventListener("click", editButtonHandler);
openNewCardFormButton.addEventListener('click',() => openPopup(popupNewCard));
editForm.addEventListener("submit", editFormSubmitHandler);
newCardForm.addEventListener("submit", newCardFormSubmitHandler);
popupList.forEach( popup => {
    popup.addEventListener('mousedown', function (evt) {
        if (
            evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close-button')
        ) {
            closePopup(popup)
        }
    })
})

renderCards()

function renderCards() {
    initialCards.forEach(item => insertCard(createCard(item)));
}

function insertCard(data) {
    cardsList.prepend(data);
}

function createCard(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', likeButtonHandler);
    cardImage.addEventListener('click', previewHandler);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteButtonHandler);
    return cardElement;
}

function editButtonHandler() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditInfo);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closePopupEsc);
    resetForm(popup);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function resetForm(popup) {
    const button = popup.querySelector('.popup__save-button');
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    const errorList = Array.from(popup.querySelectorAll('.error'));
    errorList.forEach( error => {
        error.textContent = '';
        error.classList.remove('error_active')
    });
    inputList.forEach( input => {
        input.value = ''
        input.classList.remove('popup__input_type_error')
    });
    if (button) {
        button.disabled = true;
        button.classList.add('popup__save-button_type_disabled');
    }
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditInfo);
}

function newCardFormSubmitHandler(evt) {
    evt.preventDefault();
    insertCard(createCard({
        name: newCardName.value,
        link: newCardLink.value
    }));
    closePopup(popupNewCard);
}

function likeButtonHandler(evt) {
    evt.target.classList.toggle('card__like-button_active');
}

function deleteButtonHandler(evt) {
    evt.target.closest('.card').remove();
}

function previewHandler(evt) {
    previewImage.src = evt.target.src;
    previewImage.alt = evt.target.alt;
    previewTitle.textContent = evt.target.alt;
    openPopup(preview);
}