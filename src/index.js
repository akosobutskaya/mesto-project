
import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { FormValidator } from "./components/FormValidator.js";
import { addPopupEvents } from "./components/modal.js";
import { getProfilInfo, getCards } from "./components/api.js";
import { setUserInfo } from "./components/profile.js";
import { cardsGrid, validationConfig } from "./components/constants.js"
import Section from "./components/card.js"
import Card from "./components/card.js"


Promise.all([getProfilInfo(), getCards()])
  .then(([profileData, cards]) => {
    setUserInfo(profileData);
    cardsList.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });

addPopupEvents();

// Validation
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

// New section for list of cards

const cardsList = new Section({
  data: items,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generate();
    cardsList.addItem(cardElement);
  }
}, cardsGrid);
