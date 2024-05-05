// Import CSS
import "./pages/index.css";
// Import cards.js
import { initialCards } from "./scripts/cards.js";
// Import modal.js
import { openPopup, closePopup } from "./scripts/modal.js";
// Import card.js
import { deleteCard, likeCard, createCard } from "./scripts/card.js";

// DOM nodes
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const cardList = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const jobInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);

// Open edit profile form handler
const openEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
};

// Handle profile form submission
const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

// Open image scale popup handler
const openImagePopup = (name, link) => {
  const popup = document.querySelector(".popup_type_image");
  openPopup(popup);
  const imgLink = popup.querySelector(".popup__image");
  const imgCaption = popup.querySelector(".popup__caption");
  imgLink.src = link.src;
  imgCaption.textContent = name.textContent;
};

const submitNewCard = (evt) => {
  evt.preventDefault();

  const cardData = {
    link: newCardPopup.querySelector(".popup__input_type_url").value,
    name: newCardPopup.querySelector(".popup__input_type_card-name").value,
  };

  const cardEl = createCard(cardData, deleteCard, likeCard, openImagePopup);
  cardList.prepend(cardEl);

  // Reset the form fields instead of setting each input value manually
  newCardForm.reset();

  closePopup(newCardPopup);
};

// Open add new card form handler
const openAddCard = () => {
  openPopup(newCardPopup);
};

// Load cards from cards.js
initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, openImagePopup);
  cardList.append(card);
});

// Open edit profile form listener
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", openEditProfile);

// Submit profile form listener
editProfileForm.addEventListener("submit", submitProfileForm);

// Open add new card form listener
document
  .querySelector(".profile__add-button")
  .addEventListener("click", openAddCard);

// Submit new card listener
newCardForm.addEventListener("submit", submitNewCard);

// Konstantin_N training project Yandex-Learning-Platform
