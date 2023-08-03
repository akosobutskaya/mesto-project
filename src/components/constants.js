export const popupMesto = document.querySelector('.popup#mesto');
export const popupTitle = popupMesto.querySelector('.popup__mesto-title');
export const popupImg = popupMesto.querySelector('.popup__mesto-img');
export const cardsGrid = document.querySelector('.cards-grid');
export const cardElementTmpl = document.querySelector('.card-template').content.querySelector('.card');

export const popupEditProf = document.querySelector('.popup#edit-profile');
export const popupAddMesto = document.querySelector('.popup#add-mesto');
export const formEditProf = document.forms["edit-form"];
export const formAddMesto = document.forms["add-form"];
export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');
export const popupCloseBtns = document.querySelectorAll('.popup__close-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const userName = document.querySelector('#user-name');
export const userJob = document.querySelector('#user-job');
export const mestoName = document.querySelector('#mesto-name');
export const mestoSrc = document.querySelector('#mesto-src');
export const popups = document.querySelectorAll('.popup');

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

