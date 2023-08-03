import { openPopup } from "./utils.js";

const popupMesto = document.querySelector('.popup#mesto');
const popupTitle = popupMesto.querySelector('.popup__mesto-title');
const popupImg = popupMesto.querySelector('.popup__mesto-img');
const cardsGrid = document.querySelector('.cards-grid');
const cardElementTmpl = document.querySelector('.card-template').content.querySelector('.card');

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
    console.log("handlePopupFullSize");
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

