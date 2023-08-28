
import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { FormValidator } from "./components/FormValidator.js";
import { addPopupEvents } from "./components/modal.js";
import { getProfilInfo, getCards } from "./components/api.js";
import { setUserInfo } from "./components/profile.js";
import { validationConfig } from "./components/constants.js"

Promise.all([getProfilInfo(), getCards()])
  .then(([profileData, cards]) => {
    setUserInfo(profileData);
    renderCards(cards);
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

//test feature push