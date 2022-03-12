let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name_username');
let jobInput = document.querySelector('.popup__name_userjob');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let form = document.querySelector('.popup__container');

function editButtonHandler() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closeButtonHandler() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeButtonHandler();
}

closeButton.addEventListener("click", closeButtonHandler);
editButton.addEventListener("click", editButtonHandler);
form.addEventListener("submit", formSubmitHandler);