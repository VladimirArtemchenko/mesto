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

const preview = document.querySelector('.preview');
const previewImage = document.querySelector('.preview__image');
const previewTitle = document.querySelector('.preview__title');

const closePreviewButton = document.querySelector('.preview__close-button');

let initialCards = [{
        name: 'Корги',
        link: 'https://images.unsplash.com/photo-1645080009439-f47766ef9c1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Субару',
        link: 'https://images.unsplash.com/photo-1645112696911-9e1c2bddf835?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Охотники за приведениями',
        link: 'https://images.unsplash.com/photo-1644850701360-285f8e043435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Nzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Ламборджини',
        link: 'https://images.unsplash.com/photo-1644656783523-b114e00478c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Квадрокоптер',
        link: 'https://images.unsplash.com/photo-1644754485076-8d16cf4e77b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Привет Мир!',
        link: 'https://images.unsplash.com/photo-1644794472051-36d154dfe487?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MzF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    }
];

openEditFormButton.addEventListener("click", editButtonHandler);
closeEditFormButton.addEventListener("click", closeEditFormButtonHandler);
editForm.addEventListener("submit", editFormSubmitHandler);
openNewCardFormButton.addEventListener('click', openNewCardFormButtonHandler);
closeAddFormButton.addEventListener("click", closeNewCardFormButtonHandler);
newCardForm.addEventListener("submit", newCardFormSubmitHandler);
closePreviewButton.addEventListener('click', closePreviewButtonHandler);

renderCards()

function renderCards() {
    initialCards.forEach(renderCard);
}

function renderCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', likeButtonHandler);
    cardElement.querySelector('.card__image').addEventListener('click', previewHandler);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteButtonHandler);
    cardsList.prepend(cardElement);
}

function editButtonHandler() {
    popupEditInfo.classList.remove("popup_closed");
    popupEditInfo.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closeEditFormButtonHandler() {
    popupEditInfo.classList.add("popup_closed");
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeEditFormButtonHandler();
}

function openNewCardFormButtonHandler() {
    popupNewCard.classList.remove("popup_closed");
    popupNewCard.classList.add("popup_opened");
}

function closeNewCardFormButtonHandler() {
    popupNewCard.classList.add("popup_closed");
}

function newCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard(initialCards[initialCards.push({
        name: newCardName.value,
        link: newCardLink.value
    }) - 1]);
    newCardName.value = '';
    newCardLink.value = '';
    closeNewCardFormButtonHandler();
}

function likeButtonHandler(evt) {
    evt.target.classList.toggle('card__like-button_active');
}

function deleteButtonHandler(evt) {
    const cards = cardsList.querySelectorAll('.card');
    const newInitialCards = initialCards.reverse();
    cards[Array.from(cards).indexOf(evt.target.parentElement)].remove();
    newInitialCards.splice(Array.from(cards).indexOf(evt.target.parentElement), 1);
    initialCards = newInitialCards.reverse();
}

function previewHandler(evt) {
    previewImage.src = evt.target.src;
    previewImage.alt = evt.target.alt;
    previewTitle.textContent = evt.target.alt;
    preview.classList.remove('preview_closed');
    preview.classList.add("preview_opened");
}

function closePreviewButtonHandler() {
    preview.classList.add('preview_closed');
}