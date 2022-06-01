import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";

import {
    cardsList,
    profileAvatar,
    cardTemplate,
    openEditFormButton,
    openNewCardFormButton,
    popupEditForm,
    popupEditInfoSelector,
    popupNewCardForm,
    popupNewCardSelector,
    popupPreviewSelector,
    profileJobSelector,
    profileNameSelector,
    validateObject,
    popupChangeAvatarSelector,
    buttonPopupAvatar,
    popupConfirmSelector,
    popupChangeAvatarForm,
} from "../utils/constants.js";

const userInfo = new UserInfo(profileNameSelector, profileJobSelector, profileAvatar)

const api = new Api({
    domain: "https://mesto.nomoreparties.co/v1/cohort-42",
    token: "308d04e2-be48-4647-a1c0-1964231c9473",
});

api
    .getData("/users/me", "/cards")
    .then((res) => {
        const [userData, cardData] = res;
        userInfo.setUserInfo({
            userName: userData.name,
            userJob: userData.about,
        });
        userInfo.setAvatar(userData.avatar);
        userInfo.setUserId(userData._id);
        cardList.renderItems(cardData)
    })
    .catch((err) => {
        console.log(err)
    })

const popupPreview = new PopupWithImage(popupPreviewSelector)

const validateProfileForm = new FormValidator(popupEditForm, validateObject);

const validateNewCardForm = new FormValidator(popupNewCardForm, validateObject);

const validateChangeAvatarForm = new FormValidator(popupChangeAvatarForm, validateObject);

const popupConfirm = new PopupWithConfirm(popupConfirmSelector);


const createCard = (item) => {
    const card = new Card({
        data: item,
        userId: userInfo.getUserId(),
        template: cardTemplate,
        handlerCardClick: () => {
            popupPreview.open(item.name, item.link);
        },
        handlerLikeButton: () => {
            const url = `/cards/${card.getCardId()}/likes`
            if (card.isLiked) {
                api.makeRequest(url, "DELETE")
                    .then((data) => {
                        card.unsetLike();
                        card.likesCountUpdate(data.likes)
                    })
                    .catch((err) => {
                        console.log(`ошибка ${err}`)
                    })
            } else {
                api.makeRequest(url, 'PUT')
                    .then((data) => {
                        card.setLike();
                        card.likesCountUpdate(data.likes)
                    })
                    .catch((err) => {
                        console.log(`ошибка ${err}`)
                    })
            }
        },
        handlerDeleteClick: (evt) => {
            const url = `/cards/${card.getCardId()}`
            const cardElement = evt.target.closest('.card');
            popupConfirm.setHandlerSubmit((evt) => {
                evt.preventDefault();
                popupConfirm.isLoading(true);
                api.makeRequest(url, "DELETE")
                    .then(() => {
                        cardElement.remove()
                        popupConfirm.close();
                    })
                    .catch((err) => {
                        console.log(`ошибка ${err}`)
                    })
                    .finally(() => {
                        popupConfirm.isLoading(false);
                    });
            })
            popupConfirm.open();
        }
    })
    return card.createCard()
}

const cardList = new Section({
        renderer: (elem) => {
            const cardElement =
                createCard(elem);
            cardList.addItemAppend(cardElement)
        },
    },
    cardsList
)

const popupProfile = new PopupWithForm(popupEditInfoSelector, (data) => {
    const body = {name: data.userName, about: data.userJob};
    popupProfile.isLoading(true);
    api.makeRequest('/users/me', "PATCH", body)
        .then((data) => {
            userInfo.setUserInfo({userName: data.name, userJob: data.about});
            popupProfile.close();
        })
        .catch((err) => {
            console.log(`ошибка ${err}`)
        })
        .finally(() => {
            popupProfile.isLoading(false);
        });
})

const popupNewCard = new PopupWithForm(popupNewCardSelector, (data) => {
    const item = {
        name: data.cardName,
        link: data.cardLink
    }
    popupNewCard.isLoading(true);
    api.makeRequest("/cards", "POST", item)
        .then((card) => {
            const cardElement = createCard(card);
            cardList.addItemPrepend(cardElement);
            popupNewCard.close();
        })
        .catch((err) => {
            console.log(`ошибка ${err}`)
        })
        .finally(() => {
            popupNewCard.isLoading(false)
        })
})

const popupChangeAvatar = new PopupWithForm(popupChangeAvatarSelector, (data) => {
    const link = data.inputLink
    popupChangeAvatar.isLoading(true);
    api.makeRequest('/users/me/avatar', 'PATCH', {avatar: link})
        .then((data) => {
            console.log({avatar: link})
            userInfo.setAvatar(link);
            popupChangeAvatar.close();
        })
        .catch((err) => {
            console.log(`ошибка ${err.message}`)
        })
        .finally(() => {
            popupChangeAvatar.isLoading(false);
        })
})


openNewCardFormButton.addEventListener('click', () => {
    validateNewCardForm.resetForm();
    popupNewCard.open();
});

buttonPopupAvatar.addEventListener('click', () => {

    popupChangeAvatar.open();
    validateChangeAvatarForm.resetForm()
});

openEditFormButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    popupProfile.setInputValues(userData)
    validateProfileForm.resetForm();
    popupProfile.open();
});

popupPreview.setEventListeners();
// cardList.renderItems()
popupProfile.setEventListeners();
popupConfirm.setEventListeners();
popupChangeAvatar.setEventListeners();
validateProfileForm.enableValidation();
validateChangeAvatarForm.enableValidation();
popupNewCard.setEventListeners();
validateNewCardForm.enableValidation();
