import { openPopup } from "./utils.js";
import { popupMesto, popupTitle, popupImg, cardsGrid, cardElementTmpl } from "./constants.js";
import { user } from "./profile.js";
import { deleteCard, likeCard, unLikeCard } from "./api.js";

function setLiked (like) {
    like.classList.add('card_liked');
}

function setUnliked (like) {
    like.classList.remove('card_liked');
}

function setLikedbyowner (card, value) {
    card.setAttribute('likedbyowner',value);
}

/* Like button */
function handleLikeBtn(evt) {
    const card = evt.target.closest('.card');
    card.getAttribute('likedbyowner') == "true" ?  unLikeCard(card) : likeCard(card);
}

/* Delete card button */
function handleDelBtn(evt) {
    const card = evt.target.closest('.card');
    card.remove();
    deleteCard(card.id);
}

/* Full size image */
function handlePopupFullSize(item) {
    openPopup(popupMesto);
    popupTitle.textContent = item.name;
    popupImg.src = item.link;
    popupImg.alt = item.name;
}

export function setLikeCount (cardElement, count, likes) {
    const cardLikeCountElement = cardElement.querySelector('.card__like-count');
    const cardLikeElement = cardElement.querySelector('.card__like');
    cardLikeCountElement.textContent = count;
    count > 0 ? setLiked(cardLikeElement) : setUnliked(cardLikeElement);
    if (likes)  setLikedbyowner (cardElement, likes.some( like => like['name'] === user.name ));

}

function addDeleteBtn (cardElement) {
    const deleteBtn = cardElement.querySelector('.card__delete');
    deleteBtn.removeAttribute('hidden');
    deleteBtn.addEventListener('click', handleDelBtn);
}

/* Create new card */
function createCard(item) {
    const cardElement = cardElementTmpl.cloneNode(true);
    const cardLike = cardElement.querySelector('.card__like');
    cardElement.id = item._id;
    cardElement.setAttribute('likedbyowner', item.likes.some( like => like['name'] === user.name ));
    cardElement.querySelector('.card__text').textContent = item.name;
    cardElement.querySelector('.card__delete').addEventListener('click', handleDelBtn);
    cardLike.addEventListener('click', handleLikeBtn);
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = item.link;
    cardImg.alt = item.name;
    cardImg.addEventListener('click', () => handlePopupFullSize(item));
    if (item.likes) {
        setLikeCount (cardElement, item.likes.length);
        (item.likes.length > 0) ? setLiked(cardLike) : setUnliked(cardLike);
    }
    if (!item.owner || item.owner._id === user._id) addDeleteBtn (cardElement)
    return cardElement;
}

export function renderCards(initialCards) {
    initialCards.forEach((item) => {
        cardsGrid.prepend(createCard(item));
    });
}



