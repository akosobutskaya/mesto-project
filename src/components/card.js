export class Card {
  constructor({
    data,
    cardTemplate,
    userId,
    handleCardClick,
    handleAddLike,
    handleRemoveLike,
    handleDelBtn,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDelBtn = handleDelBtn;
  }

  //   Get card template
  _getElement() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode("true");

    return cardElement;
  }

  //   Does user is a 'like' owner
  _isLikedByUser() {
      if (this._likes.some(like => like._id === this._userId)) {
        this._likeBtn.classList.add("card_liked");
      };
    }

  //   Show like counter
  _setLikeCount() {
    this._cardLikeCountElement.textContent = this._likes.length;
  }

likeToggle(data) {
  this._likeBtn.classList.toggle('card_liked');
  this._likes = data.likes;
  this._setLikeCount();
}

  // Set card listeners
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._likeBtn.addEventListener("click", () => {
      if (this._likes.some(like => like._id === this._userId)) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleAddLike(this._cardId);
      }
    });

    if (this._cardOwnerId === this._userId.id) {
      this._deleteBtn.addEventListener("click", () => {
        this._handleDelBtn(this._cardId);
      });
    }
  }

  //   Show delete button if user is a card owner
  _hasDeleteButton() {
    if (this._cardOwnerId === this._userId) {
      this._deleteBtn = this._cardElement.querySelector(".card__delete");
      this._deleteBtn.removeAttribute("hidden");
    }
  }

  // generate card
  generate() {
    this._cardElement = this._getElement();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeBtn = this._cardElement.querySelector(".card__like");
    this._cardLikeCountElement =
      this._cardElement.querySelector(".card__like-count");
    this._cardElement.id = this._cardId;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._hasDeleteButton();
    this._isLikedByUser();
    this._setLikeCount();
    this._setEventListeners();

    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
  }
}

/* import { openPopup } from "./utils.js";
import {
  profile,
  profileTitle,
  popupMesto,
  popupTitle,
  popupImg,
  cardsGrid,
  cardElementTmpl,
} from "./constants.js";
import { deleteCard, likeCard, unLikeCard } from "./api.js";

function setLiked(like) {
  like.classList.add("card_liked");
}

function setUnliked(like) {
  like.classList.remove("card_liked");
}

function setLikedbyUser(card, value) {
  card.setAttribute("likedbyuser", value);
}

function isLikedByUser(likes) {
  return likes.some((like) => like["name"] === profileTitle.textContent);
}

function handleLikeBtn(evt) {
  const card = evt.target.closest(".card");
  const cardLike = evt.target.closest(".card__like");
  card.getAttribute("likedbyuser") == "true"
    ? unLikeCard(card)
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

// Delete card button
function handleDelBtn(evt) {
  const card = evt.target.closest(".card");
  deleteCard(card.id)
    .then(() => card.remove())
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

// Full size image 
function handlePopupFullSize(item) {
  openPopup(popupMesto);
  popupTitle.textContent = item.name;
  popupImg.src = item.link;
  popupImg.alt = item.name;
}

export function setLikeCount(cardElement, count, likes) {
  const cardLikeCountElement = cardElement.querySelector(".card__like-count");
  cardLikeCountElement.textContent = count;
}

function addDeleteBtn(cardElement) {
  const deleteBtn = cardElement.querySelector(".card__delete");
  deleteBtn.removeAttribute("hidden");
  deleteBtn.addEventListener("click", handleDelBtn);
}

// Create new card 
function createCard(item) {
  const cardElement = cardElementTmpl.cloneNode(true);
  const cardLike = cardElement.querySelector(".card__like");
  cardElement.id = item._id;
  setLikedbyUser(cardElement, isLikedByUser(item.likes));
  cardElement.querySelector(".card__text").textContent = item.name;
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", handleDelBtn);
  cardLike.addEventListener("click", handleLikeBtn);
  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardImg.addEventListener("click", () => handlePopupFullSize(item));
  if (item.likes) {
    setLikeCount(cardElement, item.likes.length);
    isLikedByUser(item.likes) ? setLiked(cardLike) : setUnliked(cardLike);
  }
  if (!item.owner || item.owner._id === profile.id) addDeleteBtn(cardElement);
  return cardElement;
}

export function renderCards(initialCards) {
  initialCards.forEach((item) => {
    cardsGrid.prepend(createCard(item));
  });
} */
