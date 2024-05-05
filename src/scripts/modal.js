// Open modal handler
export const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  activateClosingListeners();
};

// Close modal handler
export const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  deactivateClosingListeners();
};

// Handle click on the close button of the popup
const handlePopupCloseClick = (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

// Handle click on overlay to close
const handleOverlayClose = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

// Activate a group of listeners
const activateClosingListeners = () => {
  document.addEventListener("click", handlePopupCloseClick);
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("click", handleOverlayClose);
};

// Deactivate a group of listeners
const deactivateClosingListeners = () => {
  document.removeEventListener("click", handlePopupCloseClick);
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("click", handleOverlayClose);
};

// Handle Esc key press
const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

// Konstantin_N training project Yandex-Learning-Platform
