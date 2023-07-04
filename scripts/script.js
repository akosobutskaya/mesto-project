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

const popupEditProf = document.querySelector('.popup#edit-profile');
const popupAddMesto = document.querySelector('.popup#add-mesto');
const popupMesto = document.querySelector('.popup#mesto');
const formEditProf = document.forms["edit-form"];
const formAddMesto = document.forms["add-form"];
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const userName = document.querySelector('#user-name');
const userJob = document.querySelector('#user-job');
const mestoName = document.querySelector('#mesto-name');
const mestoSrc = document.querySelector('#mesto-src');
const popupTitle = popupMesto.querySelector('.popup__mesto-title');
const popupImg = popupMesto.querySelector('.popup__mesto-img');
const cardsGrid = document.querySelector('.cards-grid');
const cardElementTmpl = document.querySelector('.card-template').content.querySelector('.card')

/* Open popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/* Close popup */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
function handlePopupFullSize (item) {
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

/* Popup Edit Profile */
function handlePopupEditProf() {
  openPopup(popupEditProf);
  userName.value = profileTitle.textContent;
  userJob.value = profileSubtitle.textContent;
}

/* Popup Add Mesto */
function handlePopupAddMesto() {
  openPopup(popupAddMesto);
}

function handleClosePopup(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

/* Submit Profile Form */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = userJob.value;
  closePopup(popupEditProf);
}

/* Submit Mesto Form */
function handleMestoFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = mestoName.value;
  card.link = mestoSrc.value;
  renderCards([card]);
  closePopup(popupAddMesto);
  evt.target.reset();
}

function renderCards(initialCards) {
  initialCards.forEach((item) => {
    cardsGrid.prepend(createCard(item));
  });
}

renderCards(initialCards);

/* Events */
editBtn.addEventListener('click', handlePopupEditProf);
addBtn.addEventListener('click', handlePopupAddMesto);
formEditProf.addEventListener('submit', handleProfileFormSubmit);
formAddMesto.addEventListener('submit', handleMestoFormSubmit);

Array.from(popupCloseBtns).forEach(btn => {
  btn.addEventListener('click', handleClosePopup);
});
