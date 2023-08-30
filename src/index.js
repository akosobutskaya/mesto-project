
import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Api } from "./components/Api_.js";
import { addPopupEvents } from "./components/modal.js";
import { getProfilInfo, getCards } from "./components/api.js";
import { setUserInfo } from "./components/profile.js";
import { validationConfig, popupImageSelector, popupEditProfileSelector, apiData, editBtn, userName, userJob } from "./components/constants.js"

Promise.all([getProfilInfo(), getCards()])
  .then(([profileData, cards]) => {
    setUserInfo(profileData);
    renderCards(cards);
  })
  .catch(err => {
    console.log(err);
  });

//addPopupEvents();

const api = new Api(apiData);

// Validation
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

// Popup
const popupImage = new PopupWithImage(popupImageSelector);

// Edit Profile
const editProfileSubmitCallback = data => {
  popupEditProfile.setBtnStatusSaving(true);
  api.patchProfile(data)
    .then(res => {
      // set userInfo
      popupEditProfile.close();
    })
    .catch(err => {
      console.log('Ошибка редактирования профиля', err);
    })
    .finally(() => {
      popupEditProfile.setBtnStatusSaving(false);
    });
};

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  editProfileSubmitCallback
);

const setProfileFormData = () => {
  const userData = {name: "11", about: "222"}//getUserInfo();
  userName.value = userData.name;
  userJob.value = userData.about;
};

editBtn.addEventListener('click', () => {
  setProfileFormData();
  popupEditProfile.open();
});
