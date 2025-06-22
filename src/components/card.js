import { deleteCardAPI, addLikeCardAPI, deleteLikeCardAPI } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  cardContent,
  openCardCallback,
  userId,
  handleDeleteIconClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardContent.name;
  cardImage.alt = cardContent.name;
  cardImage.src = cardContent.link;
  cardLikeCounter.textContent = cardContent.likes.length;
  cardElement.id = cardContent._id;

  if (cardContent.owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  } else {
    cardDeleteButton.addEventListener("click", () => {
      handleDeleteIconClick(cardContent._id, cardElement);
    });
  }

  if (cardContent.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", likeCallback);

  cardImage.addEventListener("click", () => {
    openCardCallback(cardContent);
  });

  return cardElement;
}

const likeCallback = (event) => {
  const cardLikeButton = event.target;
  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );
  const likeMethod = isLiked ? deleteLikeCardAPI : addLikeCardAPI;
  likeMethod(event.target.closest(".card").id)
    .then((data) => {
      event.target.classList.toggle("card__like-button_is-active");
      const likeCountElement = event.target
        .closest(".card")
        .querySelector(".card__like-counter");
      likeCountElement.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(
        "Возникла ошибка ${isLiked ? 'удаления' : 'добавления' лайка:",
        err
      );
    });
};

function deleteCard(cardId, cardElement) {
  deleteCardAPI(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Возникла ошибка при удалении карточки:", err);
    });
}
export { createCard, deleteCard };
