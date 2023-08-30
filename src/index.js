
import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Api } from "./components/Api_.js";
import { addPopupEvents } from "./components/modal.js";
import { getProfilInfo, getCards } from "./components/api.js";
import { setUserInfo } from "./components/profile.js";
<<<<<<< HEAD
import { validationConfig, popupImageSelector, popupEditProfileSelector, apiData, editBtn, userName, userJob } from "./components/constants.js"
=======
import { cardsGrid, validationConfig } from "./components/constants.js"
import Section from "./components/card.js"
import Card from "./components/card.js"

>>>>>>> 7124a7abd12135d0240e2edb240f9a97c6cfee1d

Promise.all([getProfilInfo(), getCards()])
  .then(([profileData, cards]) => {
    setUserInfo(profileData);
    cardsList.renderItems(cards);
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

<<<<<<< HEAD
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
=======
// New section for list of cards

const cardsList = new Section({
  data: items,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generate();
    cardsList.addItem(cardElement);
  }
}, cardsGrid);
>>>>>>> 7124a7abd12135d0240e2edb240f9a97c6cfee1d
