import { openPopup, closePopup } from "./utils.js";
import { renderCards } from "./card.js";
import { disableButton } from "./validate.js";
import { setAvatar, patchProfile, postNewCard } from "./api.js";
import { formEditAvatar, avatarSrc, avatar, popups, popupEditProf, popupAddMesto, formEditProf, formAddMesto, editBtn, addBtn, profileTitle, profileSubtitle, userName, userJob, mestoName, mestoSrc, avatarEditBtn, popupEditAvatar } from "./constants.js";

export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = buttonText;
    }
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);
    request()
        .then(() => {
            evt.target.reset();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        });
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
    function makeRequest() {
        return patchProfile({ name: userName.value, about: userJob.value }).then((userData) => {
            profileTitle.textContent = userData.name;
            profileSubtitle.textContent = userData.about;
            closePopup(popupEditProf);
        });
    }
    handleSubmit(makeRequest, evt);
}

/* Submit Mesto Form */
function handleMestoFormSubmit(evt) {
    function makeRequest() {
        return postNewCard({ name: mestoName.value, link: mestoSrc.value }).then((card) => {
            renderCards([card]);
            disableButton(popupAddMesto, 'popup__submit-button_disabled');
            closePopup(popupAddMesto);
        });
    }
    handleSubmit(makeRequest, evt);
}

function handleEditAvatarSubmit(evt) {
    function makeRequest() {
        return setAvatar({ avatar: avatarSrc.value }).then((res) => {
            avatar.src = res.avatar;
            closePopup(popupEditAvatar);
        });
    }
    handleSubmit(makeRequest, evt);
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

