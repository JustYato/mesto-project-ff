// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;

function removeCard(event) {
  event.target.closest(".card").remove();
}

function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const removeCard = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  removeCard.addEventListener("click", deleteCallback);

  return cardElement;
}

function renderCards(cardList) {
  const placesList = document.querySelector(".places__list");
  cardList.forEach((cardData) => {
    const cardElement = createCard(cardData, removeCard);
    placesList.append(cardElement);
  });
}

renderCards(initialCards);
