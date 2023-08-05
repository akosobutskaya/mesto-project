import { openPopup } from "./utils.js";
import { popupMesto, popupTitle, popupImg, cardsGrid, cardElementTmpl } from "./constants.js";

/* Like button */
function handleLikeBtn(evt) {
    evt.target.classList.toggle('card_liked');
}

/* Delete card button */
function handleDelBtn(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

/* Full size image */
function handlePopupFullSize(item) {
    openPopup(popupMesto);
    popupTitle.textContent = item.name;
    popupImg.src = item.link;
    popupImg.alt = item.name;
}

/* Create new card */
function createCard(item) {
    const cardElement = cardElementTmpl.cloneNode(true);
    cardElement.querySelector('.card__text').textContent = item.name;
    cardElement.querySelector('.card__like').addEventListener('click', handleLikeBtn);
    cardElement.querySelector('.card__delete').addEventListener('click', handleDelBtn);
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = item.link;
    cardImg.alt = item.name;
    cardImg.addEventListener('click', () => handlePopupFullSize(item));
    return cardElement;
}

export function renderCards(initialCards) {
    initialCards.forEach((item) => {
        cardsGrid.prepend(createCard(item));
    });
}

