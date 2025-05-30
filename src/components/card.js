//Получение шаблона карточки
const cardTemplate = document.querySelector("#card-template").content;

//Создание карточки
export function createCard(
  cardContent,
  deleteCard,
  handleLikeButtonClick,
  handleCardImageClick
) {
  //Клонирование шаблона карточки
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  //Элементы внутри карточки
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  //Установка значений из данных карточки
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  //Обработчик клика на кнопку
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", handleLikeButtonClick);

  cardImage.addEventListener("click", () => {
    handleCardImageClick(cardContent);
  });

  return cardElement;
}

//Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
//Функция лайка карточки
export function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
