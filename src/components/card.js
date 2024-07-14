const cardTemplate = document.querySelector("#card-template").content;

function removeCard(event) {
  event.target.closest(".card").remove();
}

function toggleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function createCard(
  cardData,
  deleteCallback,
  likeCallback,
  imageClickCallback
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const removeButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  removeButton.addEventListener("click", deleteCallback);
  likeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", imageClickCallback);

  return cardElement;
}

export { createCard, removeCard, toggleLike };
