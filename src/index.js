import "./pages/index.css";
import { createCard, removeCard, handleLike } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  openModal,
  closeModal,
  addModalListeners,
} from "./components/modal.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
  deleteCard,
} from "./components/api.js";
import { setButtonToLoading, resetButton } from "./components/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const placesList = document.querySelector(".places__list");

  const editProfilePopupButton = document.querySelector(
    ".profile__edit-button"
  );
  const addCardPopupButton = document.querySelector(".profile__add-button");
  const profileImage = document.querySelector(".profile__image");

  const profileForm = document.querySelector('form[name="edit-profile"]');
  const nameInput = profileForm.querySelector('input[name="name"]');
  const jobInput = profileForm.querySelector('input[name="description"]');
  const editPopup = document.querySelector(".popup_type_edit");

  const cardForm = document.querySelector('form[name="new-place"]');
  const titleInput = cardForm.querySelector('input[name="place-name"]');
  const linkInput = cardForm.querySelector('input[name="link"]');

  const avatarForm = document.querySelector('form[name="avatar"]');
  const avatarInput = avatarForm.querySelector('input[name="avatar-url"]');
  const avatarPopup = document.querySelector(".popup_type_avatar");

  const popupOpenImage = document.querySelector(".popup_type_image");
  const popupImage = popupOpenImage.querySelector(".popup__image");
  const popupCaption = popupOpenImage.querySelector(".popup__caption");

  const popupDeleteCard = document.querySelector(".popup_type_delete-card");
  const deleteCardForm = document.querySelector('form[name="delete-card"]');
  const deleteCardButton = deleteCardForm.querySelector(".popup__button");

  let currentUserId = null;
  let cardToDelete = null;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  document.querySelectorAll(".popup").forEach(addModalListeners);

  function renderCards(cardList, userId) {
    placesList.innerHTML = "";
    cardList.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        userId,
        handleDeleteCardClick,
        handleLike,
        openImagePopup
      );
      placesList.append(cardElement);
    });
  }

  function handleDeleteCardClick(cardElement, cardId) {
    cardToDelete = { cardElement, cardId };
    openModal(popupDeleteCard);
  }

  deleteCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cardToDelete) {
      removeCard(cardToDelete.cardElement, cardToDelete.cardId)
        .then(() => {
          closeModal(popupDeleteCard);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  editProfilePopupButton.addEventListener("click", function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(profileForm, validationConfig);
    openModal(editPopup);
  });

  profileImage.addEventListener("click", function () {
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
  });

  addCardPopupButton.addEventListener("click", function () {
    clearValidation(cardForm, validationConfig);
    openModal(document.querySelector(".popup_type_new-card"));
  });

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const originalText = evt.submitter.textContent;
    setButtonToLoading(evt.submitter);

    const name = nameInput.value;
    const about = jobInput.value;

    updateUserInfo(name, about)
      .then((updatedUser) => {
        profileTitle.textContent = updatedUser.name;
        profileDescription.textContent = updatedUser.about;
        closeModal(editPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        resetButton(evt.submitter, originalText);
      });
  }

  function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const originalText = evt.submitter.textContent;
    setButtonToLoading(evt.submitter);

    const cardName = titleInput.value;
    const cardLink = linkInput.value;

    addNewCard(cardName, cardLink)
      .then((newCard) => {
        const cardElement = createCard(
          newCard,
          currentUserId,
          handleDeleteCardClick,
          handleLike,
          openImagePopup
        );
        placesList.prepend(cardElement);
        cardForm.reset();
        closeModal(document.querySelector(".popup_type_new-card"));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        resetButton(evt.submitter, originalText);
      });
  }

  function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const originalText = evt.submitter.textContent;
    setButtonToLoading(evt.submitter);

    const avatarUrl = avatarInput.value;

    updateAvatar(avatarUrl)
      .then((updatedUser) => {
        profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
        closeModal(avatarPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        resetButton(evt.submitter, originalText);
      });
  }
  function openImagePopup(event) {
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;

    openModal(popupOpenImage);
  }

  profileForm.addEventListener("submit", handleProfileFormSubmit);
  cardForm.addEventListener("submit", handleCardFormSubmit);
  avatarForm.addEventListener("submit", handleAvatarFormSubmit);

  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  };

  enableValidation(validationConfig);

  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
      if (userInfo) {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
        currentUserId = userInfo._id;
      }
      if (cards) {
        renderCards(cards, currentUserId);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
