import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Api } from "./components/Api.js";
import { setUserInfo } from "./components/profile.js";
import {
  validationConfig,
  popupImageSelector,
  popupEditProfileSelector,
  cardsGrid,
  apiData,
  editBtn,
  userName,
  userJob,
} from "./components/constants.js";
import { Section } from "./components/section.js";
import { Card } from "./components/card.js";

/*------------------------------- Убрать после перехода на Api----------*/
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "945d8c08-a2b0-4b31-8bc8-ff311437b5f8",
    "Content-Type": "application/json",
  },
};

let userId;

const getData = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

function getProfilInfo() {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    getData
  );
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    getData
  );
}

/*------------------------------------------------------------*/
Promise.all([getProfilInfo(), getCards()])
  .then(([profileData, cards]) => {
    userId = profileData._id;
    setUserInfo(profileData);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//addPopupEvents();

const api = new Api(apiData);

// Validation
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

// Popup
const popupImage = new PopupWithImage(popupImageSelector);

// Edit Profile
const editProfileSubmitCallback = (data) => {
  popupEditProfile.setBtnStatusSaving(true);
  api
    .patchProfile(data)
    .then((res) => {
      // set userInfo
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log("Ошибка редактирования профиля", err);
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
  const userData = { name: "11", about: "222" }; //getUserInfo();
  userName.value = userData.name;
  userJob.value = userData.about;
};

editBtn.addEventListener("click", () => {
  setProfileFormData();
  popupEditProfile.open();
});

const createCard = (cardData) => {
  const newCard = new Card({
    data: cardData,
    cardTemplate: ".card-template",
    userId: userId,
    handleCardClick: (data) => {
      PopupWithImage.open(data);
    },
    handleAddLike: (card) => {
      api
        .likeCard(card)
        .then((data) => {
          newCard.likeToggle(data);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    },
    handleRemoveLike: (card) => {
      api
        .unLikeCard(card)
        .then((data) => {
          newCard.likeToggle(data);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    },
    handleDelBtn: (cardId) => {
      api.deleteCard(cardId).then(() => {});
    },
  });
  return newCard.generate();
};

// New section for list of cards

const cardsList = new Section(
  {
    renderer: (card) => {
      cardsList.addItem(createCard(card));
    },
  },
  ".cards-grid"
);
