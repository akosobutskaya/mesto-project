export const popupMesto = document.querySelector('.popup#mesto');

export const popupImageSelector = '.popup#mesto';
export const popupEditProfileSelector = '.popup#edit-profile';
export const apiData = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '945d8c08-a2b0-4b31-8bc8-ff311437b5f8',
        'Content-Type': 'application/json'
    }
};

export const popupTitle = popupMesto.querySelector('.popup__mesto-title');
export const popupImg = popupMesto.querySelector('.popup__mesto-img');
export const cardsGrid = document.querySelector('.cards-grid');
export const cardElementTmpl = document.querySelector('.card-template').content.querySelector('.card');

export const popupEditProf = document.querySelector('.popup#edit-profile');
export const popupAddMesto = document.querySelector('.popup#add-mesto');
export const popupEditAvatar = document.querySelector('.popup#edit-avatar');
export const formEditProf = document.forms["edit-form"];
export const formAddMesto = document.forms["add-form"];
export const formEditAvatar = document.forms["edit-avatar"];
export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');
export const popupCloseBtns = document.querySelectorAll('.popup__close-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const userName = document.querySelector('#user-name');
export const userJob = document.querySelector('#user-job');
export const mestoName = document.querySelector('#mesto-name');
export const mestoSrc = document.querySelector('#mesto-src');
export const avatarSrc = document.querySelector('#avatar-src');
export const popups = document.querySelectorAll('.popup');
export const avatarEditBtn = document.querySelector(".profile__avatar-edit");
export const avatar = document.querySelector(".profile__avatar");
export const avatarSbmt = document.querySelector(".popup__submit-button#avatar");
export const mestoSbmt = document.querySelector(".popup__submit-button#add-mesto");
export const editProfSbmt = document.querySelector(".popup__submit-button#edit-profile");
export const profile = document.querySelector(".profile");

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error_active",
};





