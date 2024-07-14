function handleEscClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}

function handleOverlayClose(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

function addModalListeners(popup) {
  popup.addEventListener("click", handleOverlayClose);
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(popup));
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
  }
}

export { openModal, closeModal, addModalListeners };
