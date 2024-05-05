// Card creation function
export const createCard = (data, delCb, likeCb, openCb) => {
  const cardTemp = document.querySelector("#card-template").content;
  const cardEl = cardTemp.querySelector(".places__item").cloneNode(true);

  // Newly created card object
  const cardInfo = {
    name: cardEl.querySelector(".card__title"),
    link: cardEl.querySelector(".card__image"),
    altText: cardEl.querySelector(".card__image"),
  };

  // Populate the new card with data
  cardInfo.name.textContent = data.name;
  cardInfo.link.src = data.link;
  cardInfo.altText.alt = "This picture shows: " + data.name;

  // Attach listener to the delete card button
  const delBtn = cardEl.querySelector(".card__delete-button");
  delBtn.addEventListener("click", () => delCb(cardEl));

  // Attach listener to the like card button
  const likeBtn = cardEl.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => likeCb(likeBtn));

  // Attach listener to the image for enlargement
  cardInfo.link.addEventListener("click", () =>
    openCb(cardInfo.name, cardInfo.link)
  );

  // Return the ready card for insertion
  return cardEl;
};

// Card deletion handler function
export const deleteCard = (card) => {
  card.remove();
};

// Card like handler function
export const likeCard = (btn) => {
  btn.classList.toggle("card__like-button_is-active");
};

// Konstantin_N training project Yandex-Learning-Platform
