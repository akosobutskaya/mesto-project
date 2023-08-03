import { openPopup, closePopup } from "./utils.js";
import { renderCards } from "./card.js";

const popupEditProf = document.querySelector('.popup#edit-profile');
const popupAddMesto = document.querySelector('.popup#add-mesto');
const formEditProf = document.forms["edit-form"];
const formAddMesto = document.forms["add-form"];
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const userName = document.querySelector('#user-name');
const userJob = document.querySelector('#user-job');
const mestoName = document.querySelector('#mesto-name');
const mestoSrc = document.querySelector('#mesto-src');

/* Popup Edit Profile */
function handlePopupEditProf() {
    openPopup(popupEditProf);
    userName.value = profileTitle.textContent;
    userJob.value = profileSubtitle.textContent;
}

/* Popup Add Mesto */
function handlePopupAddMesto() {
    openPopup(popupAddMesto);
}

function handleClosePopup(evt) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
}

/* Submit Profile Form */
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = userName.value;
    profileSubtitle.textContent = userJob.value;
    closePopup(popupEditProf);
}

/* Submit Mesto Form */
function handleMestoFormSubmit(evt) {
    evt.preventDefault();
    const card = {};
    card.name = mestoName.value;
    card.link = mestoSrc.value;
    renderCards([card]);
    closePopup(popupAddMesto);
    evt.target.reset();
}

export function addPopupEvents() {

    /* Events */
    editBtn.addEventListener('click', handlePopupEditProf);
    addBtn.addEventListener('click', handlePopupAddMesto);
    formEditProf.addEventListener('submit', handleProfileFormSubmit);
    formAddMesto.addEventListener('submit', handleMestoFormSubmit);


    Array.from(popupCloseBtns).forEach(btn => {
        btn.addEventListener('click', handleClosePopup);
    });    
    
}

// Close popup //
window.addEventListener("click", (e) => {
    const isPopup = e.target.className.includes("popup");
    const isInput = e.target.className.includes("input");
    const isBtn = e.target.className.includes("button");
    if ( !isPopup ) return;
    if (isInput || isBtn) return;
    const popup = e.target.closest(".popup");
    closePopup(popup);
});