export const popupImageSelector = '.popup#mesto';
export const popupEditProfileSelector = '.popup#edit-profile';
export const userNameSelector = '.profile__title';
export const userInfoSelector = '.profile__subtitle';
export const userAvatarSelector = '.profile__avatar';
export const popupEditAvatarSelector = '.popup#edit-avatar';
export const popupAddNewCardSelector = '.popup#add-mesto';
export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');
export const userName = document.querySelector('#user-name');
export const userJob = document.querySelector('#user-job');
export const avatarEditBtn = document.querySelector(".profile__avatar-edit");

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error_active",
};

export const apiData = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '945d8c08-a2b0-4b31-8bc8-ff311437b5f8',
        'Content-Type': 'application/json'
    }
};





