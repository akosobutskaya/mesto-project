import { openPopup } from "./utils.js";
import { profile, profileTitle, popupMesto, popupTitle, popupImg, cardsGrid, cardElementTmpl } from "./constants.js";
import { deleteCard, likeCard, unLikeCard } from "./api.js";

function setLiked(like) {
    like.classList.add('card_liked');
}

function setUnliked(like) {
    like.classList.remove('card_liked');
}

function setLikedbyUser(card, value) {
    card.setAttribute('likedbyuser', value);
}

function isLikedByUser(likes) {
    return likes.some(like => like['name'] === profileTitle.textContent);
}

/* Like button */
function handleLikeBtn(evt) {
    const card = evt.target.closest('.card');
    const cardLike = evt.target.closest('.card__like');
    card.getAttribute('likedbyuser') == "true" ?
        unLikeCard(card)
            .then((res) => {
                setLikeCount(card, res.likes.length, res.likes);
                setLikedbyUser(card, false);
                setUnliked(cardLike);
            })
            .catch((err) => {
                console.error(`Ошибка: ${err}`);
            })
        : likeCard(card)
            .then((res) => {
                setLikeCount(card, res.likes.length, res.likes);
                setLikedbyUser(card, true);
                setLiked(cardLike);
            })
            .catch((err) => {
                console.error(`Ошибка: ${err}`);
            });
}

/* Delete card button */
function handleDelBtn(evt) {
    const card = evt.target.closest('.card');
    deleteCard(card.id)
        .then(() => card.remove())
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        });
}

/* Full size image */
function handlePopupFullSize(item) {
    openPopup(popupMesto);
    popupTitle.textContent = item.name;
    popupImg.src = item.link;
    popupImg.alt = item.name;
}

export function setLikeCount(cardElement, count, likes) {
    const cardLikeCountElement = cardElement.querySelector('.card__like-count');
    cardLikeCountElement.textContent = count;
}

function addDeleteBtn(cardElement) {
    const deleteBtn = cardElement.querySelector('.card__delete');
    deleteBtn.removeAttribute('hidden');
    deleteBtn.addEventListener('click', handleDelBtn);
}

/* Create new card */
function createCard(item) {
    const cardElement = cardElementTmpl.cloneNode(true);
    const cardLike = cardElement.querySelector('.card__like');
    cardElement.id = item._id;
    setLikedbyUser(cardElement, isLikedByUser(item.likes));
    cardElement.querySelector('.card__text').textContent = item.name;
    cardElement.querySelector('.card__delete').addEventListener('click', handleDelBtn);
    cardLike.addEventListener('click', handleLikeBtn);
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = item.link;
    cardImg.alt = item.name;
    cardImg.addEventListener('click', () => handlePopupFullSize(item));
    if (item.likes) {
        setLikeCount(cardElement, item.likes.length);
        (isLikedByUser(item.likes)) ? setLiked(cardLike) : setUnliked(cardLike);
    }
    if (!item.owner || item.owner._id === profile.id) addDeleteBtn(cardElement)
    return cardElement;
}

export function renderCards(initialCards) {
    initialCards.forEach((item) => {
        cardsGrid.prepend(createCard(item));
    });
}



