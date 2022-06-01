export default class Card {
    constructor({
                    data,
                    userId,
                    template,
                    handlerCardClick,
                    handlerLikeButton,
                    handlerDeleteClick
                }) {
        this._name = data.name;
        this._link = data.link;
        this._userId = userId;
        this._isCurrentUserCard = userId === data.owner._id;
        this._likes = data.likes;
        this._cardId = data._id;
        this._template = template;
        this._handlerCardClick = handlerCardClick;
        this._handlerLikeButton = handlerLikeButton;
        this._handlerDeleteButton = handlerDeleteClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._template)
            .content.querySelector(".card")
            .cloneNode(true);
    }

    _setEventListener() {
        this._cardLikeButton = this._cardElement.querySelector(".card__like-button")
        this._cardLikeButton.addEventListener("click", (evt) => this._handlerLikeButton(evt));

        if (this._isCurrentUserCard) {
            this._cardElement
                .querySelector(".card__delete-button")
                .addEventListener("click", (evt) => this._handlerDeleteButton(evt));
        }
        this._cardImage.addEventListener("click", this._handlerCardClick);
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".card__image");
        this._countLike = this._cardElement.querySelector('.card__like-count');
        if (!this._isCurrentUserCard) {
            this._cardElement.querySelector(".card__delete-button").remove()
        }
        this._cardElement.querySelector(".card__title").textContent =
            this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._countLike.textContent = this._likes.length;
        this._setEventListener()
        this._toggleLikeState()
        return this._cardElement;
    }

    _toggleLikeState() {
        if (this._checkUserLike()) {
            this.setLike();
        } else {
            this.unsetLike();
        }
    }

    setLike() {
        this._cardLikeButton.classList.add('card__like-button_active');
        this.isLiked = true
    }

    unsetLike() {
        this._cardLikeButton.classList.remove('card__like-button_active')
        this.isLiked = false
    }

    likesCountUpdate(data) {
        this._countLike.textContent = data.length;
    }

    _checkUserLike() {
        return this._likes.some((item) => item._id === this._userId)
    }

    getCardId() {
        return this._cardId
    }

}
