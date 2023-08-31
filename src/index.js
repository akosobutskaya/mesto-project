import "./pages/index.css";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Api } from "./components/Api.js";
import {
  validationConfig, popupImageSelector, popupEditProfileSelector,
  apiData, editBtn, userName, userJob,
  userNameSelector,
  userInfoSelector,
  addBtn,
  userAvatarSelector, avatarEditBtn, popupEditAvatarSelector, popupAddNewCardSelector
} from "./components/constants.js"
import { Section } from "./components/section.js"
import { Card } from "./components/card.js"
import { UserInfo } from "./components/UserInfo.js"

const api = new Api(apiData);
const userInfo = new UserInfo(
  userNameSelector,
  userInfoSelector,
  userAvatarSelector
);

api.loadData()
  .then(data => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    //здесь нужен рендер cards
  })
  .catch(err => console.log(err));

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
      userInfo.setUserInfo(res);
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
  const userData = userInfo.getUserInfo();
  userName.value = userData.name;
  userJob.value = userData.about;
};

editBtn.addEventListener('click', () => {
  setProfileFormData();
  popupEditProfile.open();
});

//---------------------- Edit Avatar//

const editAvatarSubmitCallback = data => {
  popupEditAvatar.setBtnStatusSaving(true);
  api.setAvatar(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log('Ошибка редактирования аватара', err);
    })
    .finally(() => {
      popupEditAvatar.setBtnStatusSaving(false);
    });
};

const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  editAvatarSubmitCallback
);

avatarEditBtn.addEventListener('click', () => {
  popupEditAvatar.open();
});

//-------------------------------- Add new card---//
const addNewCardSubmitCallback = data => {
  popupAddNewCard.setBtnStatusSaving(true);
  api.postNewCard(data)
    .then(res => {
      //здесь должен быть card.addItem, видимо
      popupAddNewCard.close();
    })
    .catch(err => {
      console.log('Ошибка добавления новой карточки', err);
    })
    .finally(() => {
      popupAddNewCard.setBtnStatusSaving(false);
    });
};

const popupAddNewCard = new PopupWithForm(
  popupAddNewCardSelector,
  addNewCardSubmitCallback
);

addBtn.addEventListener('click', () => {
  popupAddNewCard.open();
});

//--------------------------------//

// New section for list of cards

const cardsList = new Section({
  data: items,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generate();
    cardsList.addItem(cardElement);
  }
}, cardsGrid);
