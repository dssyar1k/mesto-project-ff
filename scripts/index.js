//Получение шаблона карточки
const cardTemplate = document.querySelector("#card-template").content;
//Контейнер для карточек
const placesList = document.querySelector(".places__list");

//функция создания карточки
function createCard(cardContent, deleteCard) {
  //Клонирование шаблона карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //Элементы внутри карточки
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //Установка значений из данных карточки
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  //Обработчик клика на кнопку
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  return cardElement;
}

//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//Вывод карточки на страницу
initialCards.forEach((cardContent) => {
  const cardElement = createCard(cardContent, deleteCard);
  placesList.append(cardElement);
});
