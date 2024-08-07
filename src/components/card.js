import { deleteCard, addLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLike(event, cardData, userId) {
  const likeButton = event.target;
  const cardId = cardData._id;
  const isLiked = cardData.likes.some((like) => like._id === userId);

  if (isLiked) {
    removeLike(cardId)
      .then((updatedCard) => {
        cardData.likes = updatedCard.likes;
        updateLikeState(likeButton, cardData.likes, userId);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((updatedCard) => {
        cardData.likes = updatedCard.likes;
        updateLikeState(likeButton, cardData.likes, userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function updateLikeState(likeButton, likes, userId) {
  const likeCounter = likeButton.nextElementSibling;
  const isLiked = likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeCounter.textContent = likes.length;
}

function createCard(
  cardData,
  userId,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardItem = cardElement.querySelector(".card");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const removeButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCount = cardElement.querySelector(".card__like-counter");

  cardItem.dataset.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likesCount.textContent = cardData.likes.length;

  updateLikeState(likeButton, cardData.likes, userId);

  if (cardData.owner._id !== userId) {
    removeButton.style.display = "none";
  } else {
    removeButton.addEventListener("click", () =>
      deleteCallback(cardItem, cardData._id)
    );
  }

  likeButton.addEventListener("click", (event) =>
    likeCallback(event, cardData, userId)
  );
  cardImage.addEventListener("click", imageClickCallback);

  return cardElement;
}

export { createCard, removeCard, handleLike };
