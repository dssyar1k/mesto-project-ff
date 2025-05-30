//Функция открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("click", handleOverlayClose);
  document.addEventListener("keydown", handleEscClose);
}

// Функция закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("click", handleOverlayClose);
  document.removeEventListener("keydown", handleEscClose);
}

//Закрытие модального окна кнопкой "Escape"
export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
//Закрытие модального окна нажатием на оверлэй
export function handleOverlayClose(evt) {
  const popupElement = evt.target.closest(".popup");
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target === popupElement
  ) {
    closeModal(popupElement);
  }
}
