import { openPopup, closePopup } from "./utils.js";
import { renderCards } from "./card.js";
import { disableButton } from "./validate.js";
import { popups, popupEditProf, popupAddMesto, formEditProf, formAddMesto, editBtn, addBtn, popupCloseBtns, profileTitle, profileSubtitle, userName, userJob, mestoName, mestoSrc } from "./constants.js";

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
    disableButton(popupAddMesto,'popup__submit-button_disabled');
}

export function addPopupEvents() {

    /* Events */
    editBtn.addEventListener('click', handlePopupEditProf);
    addBtn.addEventListener('click', handlePopupAddMesto);
    formEditProf.addEventListener('submit', handleProfileFormSubmit);
    formAddMesto.addEventListener('submit', handleMestoFormSubmit);

}

// Close popup //
Array.from(popups).forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

