const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

renderCards(initialCards);

const popupEditProf = document.querySelector('.popup#edit-profile');
const popupAddMesto = document.querySelector('.popup#add-mesto');
const popupMesto = document.querySelector('.popup#mesto');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const popupSubmitBtn = document.querySelector('.popup__submit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const userName = document.querySelector('#user-name');
const userJob = document.querySelector('#user-job');
const mestoName = document.querySelector('#mesto-name');
const mestoSrc = document.querySelector('#mesto-src');

const popupSubmitMestoBtn = document.querySelector('.popup__submit-button#add-mesto');

function handlePopupEditProf() {
  popupEditProf.classList.toggle('popup_opened');
  if (popupEditProf.classList.contains('popup')){
    userName.value = profileTitle.textContent;
    userJob.value = profileSubtitle.textContent;
  }
}

function handleClosePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.toggle('popup_opened');
}

function handlePopupAddMesto () {
  popupAddMesto.classList.toggle('popup_opened');
}

function handlePopupFullSize (evt) {
  popupMesto.classList.toggle('popup_opened');
  let popupTitle = popupMesto.querySelector('.popup__mesto-title');
  let popupImg = popupMesto.querySelector('.popup__mesto-img');
  popupTitle.textContent = evt.target.closest('.card').querySelector('.card__text').textContent;
  popupImg.src = evt.target.src;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = userJob.value;
  handlePopup();
}

function handleMestoFormSubmit(evt) {
  evt.preventDefault();
  let card = {};
  let initialCards = [];
  card.name = mestoName.value;
  card.link = mestoSrc.value;
  initialCards.push(card);
  renderCards(initialCards);
  handlePopupAddMesto ()
}

function handleLikeBtn(evt) {
  evt.target.classList.toggle('card_liked');
}

function handleDelBtn(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function renderCards(initialCards) {
  const cardsGrid = document.querySelector('.cards-grid');
  const cardTemplate = document.querySelector('.card-template').content;
  initialCards.forEach((item) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = item.link;
    cardElement.querySelector('.card__text').textContent = item.name;
    let theFirstChild = cardsGrid.firstChild;
    cardsGrid.prepend(cardElement);
    const likeBtn = cardElement.querySelector('.card__like');
    const delBtn = cardElement.querySelector('.card__delete');
    likeBtn.addEventListener('click', handleLikeBtn);
    delBtn.addEventListener('click', handleDelBtn);
    cardImg.addEventListener('click', handlePopupFullSize);
 });
}

/* Events */
editBtn.addEventListener('click', handlePopupEditProf);
addBtn.addEventListener('click', handlePopupAddMesto);
popupSubmitBtn.addEventListener('click', handleFormSubmit);
popupSubmitMestoBtn.addEventListener('click', handleMestoFormSubmit);

Array.from(popupCloseBtns).forEach(btn => {
  btn.addEventListener('click', handleClosePopup);
});
