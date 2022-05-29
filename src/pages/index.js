import "./index.css";
import Card from "../components/Card.js";
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
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

const userInfo = new UserInfo(profileNameSelector, profileJobSelector)

const createCard = (item) => {
    const card = new Card(item, cardTemplate, () => {
        popupPreview.open(item.name, item.link);
    })
    return card.createCard()
}

const popupPreview = new PopupWithImage(popupPreviewSelector)
popupPreview.setEventListeners();

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
cardList.renderItems()

const popupProfile = new PopupWithForm(popupEditInfoSelector, (evt) => {
    evt.preventDefault();
    const formValues = popupProfile._getInputValues();
    userInfo.setUserInfo({
        userName: formValues.userName,
        userJob: formValues.userJob,
    })
    popupProfile.close();
})

popupProfile.setEventListeners();

const validateProfileForm = new FormValidator(popupEditForm, validateObject);
validateProfileForm.enableValidation()

const popupNewCard = new PopupWithForm(popupNewCardSelector, (evt) => {
    evt.preventDefault();
    const formValues = popupNewCard._getInputValues();
    const item = {
        name: formValues.cardName,
        link: formValues.cardLink
    }
    cardList.addItem(createCard(item))
    popupNewCard.close();
})

popupNewCard.setEventListeners();

const validateNewCardForm = new FormValidator(popupNewCardForm, validateObject);
validateNewCardForm.enableValidation();

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
