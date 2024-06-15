import "../pages/index.css";
import { createCard, deleteCard, toggleLikeButton } from "./card";
import {openPopup, closePopup} from "./modal";
import { enableValidation, clearValidation } from "./validation";
import { getInitialCards, getUserData, patchUserData, postNewCard, updateAvatar } from "./api";
const buttonPlus = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalOpenImage = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const profileFormElement = popupEdit.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(
  ".profile__description"
);
const buttonAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type-avatar");
const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
const modalEditProfile = document.querySelector(".popup_type_edit");
const profileAvatar = document.querySelector(".profile__image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list");
const imageModal = document.querySelector(".popup__image");
const imageModalCaption = document.querySelector(".popup__caption");
let userId = "";
let userAvatar = "";
function initializeApp() {
  Promise.all([getInitialCards(), getUserData()])
    .then(([initialCards, userData]) => {
      setupUserProfile(userData);
      renderInitialCards(initialCards);
    })
    .catch(handleError);
  setupEventListeners();
}
function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}
function setupUserProfile(userData) {
  userAvatar = userData.avatar;
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}
const openImageModal = (item) => {
  imageModal.src = item.link;
  imageModal.alt = item.name;
  imageModalCaption.textContent = item.name;
  openPopup(modalOpenImage);
};
function renderInitialCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData, {
      deleteCard,
      likeCard: toggleLikeButton,
      openImageCard: openImageModal,
      userId,
    });
    placesList.append(cardItem);
  });
}
//change avatar
function handleEditAvatar() {
  const avatarFormElement = avatarPopup.querySelector(".popup__form");
  const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");
  function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, "Сохранение...");

    updateAvatar({ avatar: avatarInput.value })
      .then((data) => {
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        closePopup(avatarPopup);
      })
      .catch((err) => {
        console.error("Ошибка обновления аватара:", err);
      })
      .finally(() => {
        renderLoading(evt.submitter, "Сохранить");
      });
  }
  avatarFormElement.addEventListener("submit", handleFormSubmitAvatar);
}
function handleAddCard(createCard, deleteCard, placesList) {
  const newCardFormElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = newCardFormElement.querySelector(
    ".popup__input_type_url"
  );
  function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, "Сохранение...");
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };
    postNewCard(card)
      .then((cardData) => {
        const cardItem = createCard(cardData, {
          deleteCard,
          likeCard: toggleLikeButton,
          openImageCard: openImageModal,
          userId,
        });
        placesList.prepend(cardItem);
        closePopup(popupNewCard);
        newCardFormElement.reset();
        clearValidation(newCardFormElement);
      })
      .catch((err) => {
        console.error("Error add new card:", err);
      })
      .finally(() => {
        renderLoading(evt.submitter, "Сохранить");
      });
  }
  newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}
function setYear() {
  const yearElement = document.querySelector(".footer__copyright");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Mesto Russia`;
  } else {
    console.error('class ".footer__copyright" not found');
  }
}
// popup close
export const setPopupCloseEventListener = (popupNode) => {
  const closeButton = popupNode.querySelector(".popup__close");
  if (!closeButton) {
    console.error("button not found");
    return;
  }
  closeButton.addEventListener("click", () => closePopup(popupNode));
  const popupContent = popupNode.querySelector(".popup__content");
  if (!popupContent) {
    console.error("popup body unknown");
    return;
  }
  popupContent.addEventListener("click", (evt) => evt.stopPropagation());
  popupNode.addEventListener("click", () => closePopup(popupNode));
};
//
//open popup
const setPopupOpenEventListener = (openButton, popupNode, callBack) => {
  const handleClick = () => {
    openPopup(popupNode);

    const popups = [popupEdit, popupNewCard, avatarPopup];
    popups.forEach((popup) => clearValidation(popup));

    if (typeof callBack === "function") {
      callBack();
    }
  };
  openButton.addEventListener("click", handleClick);
};
//Edit profile data from api
function handleEditProfile() {
  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, "Сохранение...");
    const name = nameInput.value;
    const job = jobInput.value;

    patchUserData({ name, about: job })
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        evt.target.reset();
        closePopup(popupEdit);
      })
      .catch((err) => {
        console.error("Ошибка обновления профиля:", err);
      })
      .finally(() => {
        renderLoading(evt.submitter, "Сохранить");
      });
  }

  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
}


const renderLoading = (element, status) => {
  if (!(element instanceof HTMLElement)) {
    console.error("this is not html element");
    return;
  }
  if (typeof status !== "string") {
    console.error("this is not string");
    return;
  }
  element.textContent = status;
};
function setupEventListeners() {
  setPopupCloseEventListener(modalNewCard);
  setPopupCloseEventListener(modalEditProfile);
  setPopupCloseEventListener(modalOpenImage);
  setPopupCloseEventListener(avatarPopup);
  setPopupOpenEventListener(buttonPlus, modalNewCard);
  setPopupOpenEventListener(
    buttonEditProfile,
    modalEditProfile,
    fillProfileInputs
  );
  setPopupOpenEventListener(buttonAvatar, avatarPopup);
  handleEditProfile();
  handleEditAvatar();
  handleAddCard(createCard, deleteCard, placesList);
  enableValidation();
  setYear();
}
function handleError(error) {
  console.error("Error:", error);
}
// initialize the app
initializeApp();

//KonstantinN traning project sprint 7
