import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, toggleLike } from "./components/card.js";
import {
  openModal,
  closeModal,
  addModalListeners,
} from "./components/modal.js";

const placesList = document.querySelector(".places__list");

const editProfilePopupButton = document.querySelector(".profile__edit-button");
const addCardPopupButton = document.querySelector(".profile__add-button");

const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = profileForm.querySelector('input[name="name"]');
const jobInput = profileForm.querySelector('input[name="description"]');
const editPopup = document.querySelector(".popup_type_edit");

const cardForm = document.querySelector('form[name="new-place"]');
const titleInput = cardForm.querySelector('input[name="place-name"]');
const linkInput = cardForm.querySelector('input[name="link"]');
const cardPopup = document.querySelector(".popup_type_new-card");

const popupOpenImage = document.querySelector(".popup_type_image");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupCaption = popupOpenImage.querySelector(".popup__caption");

document.querySelectorAll(".popup").forEach(addModalListeners);

function renderCards(cardList) {
  placesList.innerHTML = "";
  cardList.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      removeCard,
      toggleLike,
      openImagePopup
    );
    placesList.append(cardElement);
  });
}

editProfilePopupButton.addEventListener("click", function () {
  const editPopup = document.querySelector(".popup_type_edit");

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  openModal(editPopup);
});

addCardPopupButton.addEventListener("click", function () {
  const addCardPopup = document.querySelector(".popup_type_new-card");

  openModal(addCardPopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;

  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = titleInput.value;
  const cardLink = linkInput.value;

  const newCard = {
    name: cardName,
    link: cardLink,
  };

  const cardElement = createCard(
    newCard,
    removeCard,
    toggleLike,
    openImagePopup
  );
  placesList.prepend(cardElement);

  cardForm.reset();

  const cardPopup = document.querySelector(".popup_type_new-card");
  closeModal(cardPopup);
}

function openImagePopup(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;

  openModal(popupOpenImage);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

renderCards(initialCards);
