import {handleCardClick} from "./index.js";

export default class Card {
    constructor(date, template) {
        this._name = date.name;
        this._link = date.link;
        this._template = template;
    }

    _getTemplate() {
        return document
            .querySelector(this._template)
            .content.querySelector(".card")
            .cloneNode(true);
    }

    _setEventListener() {
        this._cardElement
            .querySelector(".card__like-button")
            .addEventListener("click", (evt) => this._handlerLikeButton(evt));

        this._cardElement
            .querySelector(".card__delete-button")
            .addEventListener("click", (evt) => this._handlerDeleteButton(evt));

        this._cardImage.addEventListener("click", (event) => handleCardClick(event));
    }

    _handlerLikeButton(evt) {
        evt.target.classList.toggle("card__like-button_active");
    }

    _handlerDeleteButton(evt) {
        evt.target.closest(".card").remove();
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".card__image");
        this._setEventListener();

        this._cardElement.querySelector(".card__title").textContent =
            this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        return this._cardElement;
    }
}