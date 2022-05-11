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
        this._cardLikeButton = this._cardElement.querySelector(".card__like-button")
        this._cardLikeButton.addEventListener("click", () => this._handlerLikeButton());

        this._cardElement
            .querySelector(".card__delete-button")
            .addEventListener("click", () => this._handlerDeleteButton());

        this._cardImage.addEventListener("click", () => handleCardClick(this._name,this._link));
    }

    _handlerLikeButton() {
        this._cardLikeButton.classList.toggle("card__like-button_active");
    }

    _handlerDeleteButton() {
        this._cardElement.remove();
        this._cardElement=null
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