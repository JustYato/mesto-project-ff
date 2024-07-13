import "./pages/index.css";
import {
  initialCards,
  createCard,
  removeCard,
  toggleLike,
  openImagePopup,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

const editProfilePopupButton = document.querySelector(".profile__edit-button");
const addCardPopupButton = document.querySelector(".profile__add-button");

const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = profileForm.querySelector('input[name="name"]');
const jobInput = profileForm.querySelector('input[name="description"]');

const cardForm = document.querySelector('form[name="new-place"]');
const titleInput = cardForm.querySelector('input[name="place-name"]');
const linkInput = cardForm.querySelector('input[name="link"]');

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

document.body.addEventListener("click", function (event) {
  const popup = event.target.closest(".popup");

  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup_is-opened")
  ) {
    closeModal(popup);
  }
});

document.addEventListener("keydown", function (event) {
  const openPopup = document.querySelector(".popup_is-opened");

  if (event.key === "Escape") {
    closeModal(openPopup);
  }
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;

  const editPopup = document.querySelector(".popup_type_edit");
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

  initialCards.unshift(newCard);

  const cardElement = createCard(newCard, removeCard);
  placesList.prepend(cardElement);

  cardForm.reset();

  const cardPopup = document.querySelector(".popup_type_new-card");
  closeModal(cardPopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

renderCards(initialCards);
