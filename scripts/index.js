import Card from "./Card.js";
import {initialCards,validateObject} from "./InitialData.js";
import FormValidator from "./FormValidator.js";

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
const cardTemplate = "#card-template"
const preview = document.querySelector('.popup_type_preview');
const previewImage = document.querySelector('.popup__image');
const previewTitle = document.querySelector('.popup__title_type_preview');
const popupList = Array.from(document.querySelectorAll('.popup'));

openEditFormButton.addEventListener("click", openProfilePopup);
openNewCardFormButton.addEventListener('click', openNewCardPopup);
editForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

const validateProfileForm= new FormValidator(editForm,validateObject);
validateProfileForm.enableValidation()
const validateNewCardForm= new FormValidator(newCardForm,validateObject);
validateNewCardForm.enableValidation()

popupList.forEach(popup => {
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
    const card = new Card(item, cardTemplate)
    return card.createCard()
}

function openProfilePopup() {
    validateProfileForm.resetForm()
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditInfo);
}

function openNewCardPopup() {
    newCardForm.reset();
    validateNewCardForm.resetForm()
    openPopup(popupNewCard)
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditInfo);
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    insertCard(createCard({
        name: newCardName.value,
        link: newCardLink.value
    }));
    closePopup(popupNewCard);
}

export function handleCardClick(name,link) {
    previewImage.src = link;
    previewImage.alt = name;
    previewTitle.textContent = name;
    openPopup(preview);
}