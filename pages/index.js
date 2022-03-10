let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let form = document.querySelector('.popup__container');

function editButtonHandler() {
    popup.classList.add("popup__type_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closeButtonHandler() {
    popup.classList.remove("popup__type_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeButtonHandler();
}

closeButton.addEventListener("click", closeButtonHandler);
editButton.addEventListener("click", editButtonHandler);
submitButton.addEventListener("click", formSubmitHandler);
form.addEventListener("submit", formSubmitHandler);