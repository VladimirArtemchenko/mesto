export const initialCards = [{
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
export const validateObject = {
    formSelector: "popup__form",
    inputSelector: "popup__input",
    submitButtonSelector: "popup__save-button",
    inactiveButtonClass: "popup__save-button_type_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "error_active",
};
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const popupPreviewSelector = '.popup_type_preview';
export const popupEditInfoSelector ='.popup_type_edit';
export const popupNewCardSelector = '.popup_type_new-card';
export const openEditFormButton = document.querySelector('.profile__edit-button');
export const openNewCardFormButton = document.querySelector('.profile__new-card-button');
export const popupEditForm = document.forms.edit;
export const popupNewCardForm = document.forms.newcard;
export const cardTemplate = "#card-template"
export const cardsList = document.querySelector(".cards__list");


