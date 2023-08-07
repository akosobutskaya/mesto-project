import { openPopup, closePopup } from "./utils.js";
import { renderCards } from "./card.js";
import { disableButton } from "./validate.js";
import { setAvatar, patchProfile, postNewCard } from "./api.js";
import { mestoSbmt, editProfSbmt, avatarSbmt, formEditAvatar, avatarSrc, avatar, popups, popupEditProf, popupAddMesto, formEditProf, formAddMesto, editBtn, addBtn, profileTitle, profileSubtitle, userName, userJob, mestoName, mestoSrc, avatarEditBtn, popupEditAvatar} from "./constants.js";

export function renderLoading (btn, isLoading){
    if (isLoading) {
        btn.innerHTML = "Сохранение...";
    } else {
        btn.innerHTML = "Сохранить";
    }
  }

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

/* Popup Edit Avatar */
function handlePopupEditAvatar() {
    openPopup(popupEditAvatar);
}

/* Submit Profile Form */
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(editProfSbmt,true);
    profileTitle.textContent = userName.value;
    profileSubtitle.textContent = userJob.value;
    patchProfile({name: userName.value, about: userJob.value});
    closePopup(popupEditProf);
}

/* Submit Mesto Form */
function handleMestoFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(mestoSbmt,true);
    const card = {};
    card.name = mestoName.value;
    card.link = mestoSrc.value;
    renderCards([card]);
    postNewCard(card);
    closePopup(popupAddMesto);
    evt.target.reset();
    disableButton(popupAddMesto,'popup__submit-button_disabled');
}

function handleEditAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(avatarSbmt,true);
    avatar.src = avatarSrc.value;
    setAvatar(avatarSrc.value);
    closePopup(popupEditAvatar);
}

export function addPopupEvents() {

    /* Events */
    editBtn.addEventListener('click', handlePopupEditProf);
    addBtn.addEventListener('click', handlePopupAddMesto);
    avatarEditBtn.addEventListener('click', handlePopupEditAvatar);
    formEditProf.addEventListener('submit', handleProfileFormSubmit);
    formAddMesto.addEventListener('submit', handleMestoFormSubmit);
    formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);

}

// Close popup //
Array.from(popups).forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

