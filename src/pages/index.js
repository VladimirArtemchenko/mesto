import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {
    cardsList,
    cardTemplate,
    initialCards,
    openEditFormButton,
    openNewCardFormButton,
    popupEditForm,
    popupEditInfoSelector,
    popupNewCardForm,
    popupNewCardSelector,
    popupPreviewSelector,
    profileJobSelector,
    profileNameSelector,
    validateObject
} from "../utils/constants.js";

const userInfo = new UserInfo(profileNameSelector, profileJobSelector)

const popupPreview = new PopupWithImage(popupPreviewSelector)

const validateProfileForm = new FormValidator(popupEditForm, validateObject);

const validateNewCardForm = new FormValidator(popupNewCardForm, validateObject);

const createCard = (item) => {
    const card = new Card(item, cardTemplate, () => {
        popupPreview.open(item.name, item.link);
    })
    return card.createCard()
}

const cardList = new Section({
        items: initialCards,
        renderer: (elem) => {
            const cardElement =
                createCard(elem);
            cardList.addItem(cardElement)
        },
    },
    cardsList
)

const popupProfile = new PopupWithForm(popupEditInfoSelector, (data) => {
    userInfo.setUserInfo({
        userName: data.userName,
        userJob: data.userJob,
    })
    popupProfile.close();
})

const popupNewCard = new PopupWithForm(popupNewCardSelector, (data) => {
    const item = {
        name: data.cardName,
        link: data.cardLink
    }
    cardList.addItem(createCard(item))
    popupNewCard.close();
})

openNewCardFormButton.addEventListener('click', () => {
    validateNewCardForm.resetForm();
    popupNewCard.open();
});

openEditFormButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    popupProfile.setInputValues(userData)
    validateProfileForm.resetForm();
    popupProfile.open();
});

popupPreview.setEventListeners();
cardList.renderItems()
popupProfile.setEventListeners();
validateProfileForm.enableValidation()
popupNewCard.setEventListeners();
validateNewCardForm.enableValidation();
