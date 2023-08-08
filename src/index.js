
import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { addPopupEvents } from "./components/modal.js";
import { getProfilInfo, getCards } from "./components/api.js";
import { setUserInfo } from "./components/profile.js";

Promise.all([getProfilInfo(), getCards()])
  .then(([profileData, cards]) => {
    setUserInfo(profileData);
    renderCards(cards);
  })
  .catch(err => {
    console.log(err);
  });

addPopupEvents();
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
});