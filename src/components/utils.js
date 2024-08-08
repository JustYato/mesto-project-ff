function setButtonText(button, text) {
  button.textContent = text;
}

function setButtonToLoading(button) {
  setButtonText(button, "Сохранение...");
  button.disabled = true;
}

function resetButton(button, originalText) {
  setButtonText(button, originalText);
}

export { setButtonToLoading, resetButton };
