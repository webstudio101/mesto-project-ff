import { removeCard, addLikeCard, removeLikeCard } from "./api";

// Find template from index.html
const template = document.querySelector("#card-template").content;

export function createCard(item, { deleteCard, likeCard, openImageCard, userId }) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeCountNode = cardElement.querySelector(".like-button__count");
  const likeButtonNode = cardElement.querySelector(".card__like-button");
 
  

  // Установка данных карточки
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.id = item._id;

  // Установка количества лайков
  likeCountNode.textContent = item.likes.length;

  // Проверка на возможность удаления карточки
  if (item.owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  } else {
    cardDeleteButton.addEventListener("click", deleteCard);
  }

  // Обработка клика по изображению для открытия модального окна
  cardImage.addEventListener("click", () => openImageCard(item));

  // Обработка клика по кнопке лайка
  likeButtonNode.addEventListener("click", () => likeCard(likeButtonNode, cardElement));

  // Проверка, поставил ли пользователь лайк
  if (item.likes.some(like => like._id === userId)) {
    likeButtonNode.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

export function deleteCard(event) {
  const deletedCard = event.target.closest(".card");

  if (!deletedCard) {
    console.error("Error: Card element not found.");
    return;
  }

  removeCard(deletedCard.id)
    .then(() => {
      deletedCard.remove();
    })
    .catch((err) => {
      console.error(`Error deleting card: ${err}`);
    });
}



export function toggleLikeButton(likeButton, cardNode) {
  const isMyLikeOnCard = likeButton.classList.contains("card__like-button_is-active");
  const cardId = cardNode.id;
  const likeCountNode = cardNode.querySelector(".like-button__count");

  if (!likeCountNode) {
    console.error("Error: Like count element not found.");
    return;
  }

  const action = isMyLikeOnCard ? removeLikeCard : addLikeCard;

  action(cardId)
    .then((result) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountNode.textContent = result.likes.length;
    })
    .catch((err) => console.error(`Error: ${err}`));
}
