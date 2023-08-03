
import "./pages/index.css";
import { renderCards } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { addPopupEvents } from "./components/modal.js";
import { initialCards } from "./components/constants.js";

renderCards(initialCards);
addPopupEvents();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
});