const openEditFormButton = document.querySelector('.profile__edit-button');
const closeEditFormButton = document.querySelector('.popup__close-button_type_edit');
const submitEditFormButton = document.querySelector('.popup__save-button_type_edit');
const popupEditInfo = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_name_username');
const jobInput = document.querySelector('.popup__input_name_userjob');
const editForm = document.querySelector('.popup__form_type_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsList = document.querySelector(".cards__list");
const popupNewCard = document.querySelector('.popup_type_new-card');
const openNewCardFormButton = document.querySelector('.profile__new-card-button');
const closeAddFormButton = document.querySelector('.popup__close-button_type_new-card');
const newCardForm = document.querySelector('.popup__form_type_new-card');
const newCardName = document.querySelector('.popup__input_name_card-name');
const newCardLink = document.querySelector('.popup__input_name_card-link');
const cardTemplate = document.querySelector('#card-template').content;
const preview = document.querySelector('.popup_type_preview');
const previewImage = document.querySelector('.popup__image');
const previewTitle = document.querySelector('.popup__title_type_preview');
const closePreviewButton = document.querySelector('.popup__close-button_type_preview');

openEditFormButton.addEventListener("click", editButtonHandler);
closeEditFormButton.addEventListener("click", closeEditFormButtonHandler);
editForm.addEventListener("submit", editFormSubmitHandler);
openNewCardFormButton.addEventListener('click', openNewCardFormButtonHandler);
closeAddFormButton.addEventListener("click", closeNewCardFormButtonHandler);
newCardForm.addEventListener("submit", newCardFormSubmitHandler);
closePreviewButton.addEventListener('click', closePreviewButtonHandler);

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
    togglePopup(popupEditInfo);
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function closeEditFormButtonHandler() {
    togglePopup(popupEditInfo);
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEditInfo);
}

function openNewCardFormButtonHandler() {
    togglePopup(popupNewCard);
}

function closeNewCardFormButtonHandler() {
    togglePopup(popupNewCard);
}

function newCardFormSubmitHandler(evt) {
    evt.preventDefault();
    insertCard(createCard({
        name: newCardName.value,
        link: newCardLink.value
    }));
    newCardName.value = '';
    newCardLink.value = '';
    togglePopup(popupNewCard);
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
    togglePopup(preview);
}

function closePreviewButtonHandler() {
    togglePopup(preview);
}