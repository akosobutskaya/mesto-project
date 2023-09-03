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

    if (this._cardOwnerId === this._userId) {
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

