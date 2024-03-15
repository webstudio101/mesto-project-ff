
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  // @todo: DOM узлы
  const placesList = document.querySelector(".places__list");

  // @todo: Функция создания карточки
  const createCard = (data, deleteCardCallback) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data.link;
    cardImage.alt = data.name;

    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = data.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () =>
      deleteCardCallback(cardElement)
    );

    return cardElement;
  };

  // @todo: Функция удаления карточки
  const deleteCard = (cardElement) => {
    cardElement.remove();
  };

  // @todo: Вывести карточки на страницу
  const renderCards = (cards) => {
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, deleteCard);
      placesList.appendChild(cardElement);
    });
  };

  renderCards(initialCards);

