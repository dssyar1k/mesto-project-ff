import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import {
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserAPI,
  getCardsAPI,
  patchUserAPI,
  postAddCardAPI,
  editUserProfileAPI,
} from "./components/api.js";

const listPlaces = document.querySelector(".places__list");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const formProfile = document.querySelector('form[name="edit-profile"]');
const formProfileInputName = formProfile.querySelector('input[name="name"]');
const formProfileInputDescription = formProfile.querySelector(
  'input[name="description"]'
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popupProfileImage = document.querySelector(".popup_type_edit_avatar");
const formprofileImage = document.querySelector(
  'form[name="edit-profile-avatar"]'
);
const buttonOpenPopupAddNewCard = document.querySelector(
  ".profile__add-button"
);
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNewCardInputName = formAddNewCard.querySelector(
  'input[name="place-name"]'
);
const formAddNewCardInputLink =
  formAddNewCard.querySelector('input[name="link"]');
const popupFullImage = document.querySelector(".popup_type_image");
const popupFullImagePicture = popupFullImage.querySelector(".popup__image");
const popupFullImageCaption = popupFullImage.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const popupConfirmDeleteCard = document.querySelector(
  ".popup_type_confirm_delete_card"
);
const confirmDeleteCardButton =
  popupConfirmDeleteCard.querySelector(".popup__button");
const getDataAPI = Promise.all([getUserAPI(), getCardsAPI()]);

let currentUserId = null;
let cardToDelete = null;

function renderLoading(isLoading, button, loadingText = "Сохранение...") {
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
  } else {
    button.textContent = button.dataset.originalText || "Сохранить";
  }
}

function popupFullImageClick({ name, link }) {
  popupFullImagePicture.src = link;
  popupFullImagePicture.alt = name;
  popupFullImageCaption.textContent = name;
  openModal(popupFullImage);
}

function handleProfile(event) {
  event.preventDefault();
  const submitButton = formProfile.querySelector(".popup__button");
  renderLoading(true, submitButton, "Сохранение...");
  const { name, description } = event.currentTarget.elements;
  patchUserAPI({
    name: name.value,
    about: description.value,
  })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log("Ошибка обновления профиля:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Сохранение...");
    });
}

function handleprofileImage(event) {
  event.preventDefault();
  const submitButton = formprofileImage.querySelector(".popup__button");
  renderLoading(true, submitButton, "Сохранение...");
  const { link } = event.currentTarget.elements;
  editUserProfileAPI({ avatar: link.value })
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closeModal(popupProfileImage);
    })
    .catch((err) => {
      console.log("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Сохранение...");
    });
}

function handleAddNewCard(event) {
  event.preventDefault();
  const submitButton = formAddNewCard.querySelector(".popup__button");
  renderLoading(true, submitButton, "Создание...");
  const contentCard = {
    name: formAddNewCardInputName.value,
    link: formAddNewCardInputLink.value,
  };
  postAddCardAPI(contentCard)
    .then((card) => {
      const cardElement = createCard(
        card,
        addLikeCard,
        popupFullImageClick,
        card.owner._id,
        deleteLikeCard,
        handleDeleteIconClick
      );
      listPlaces.prepend(cardElement);
      formAddNewCard.reset();
      clearValidation(popupAddNewCard, validationConfig);
      closeModal(popupAddNewCard);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Создание...");
    });
}

function handleDeleteIconClick(cardId, cardElement) {
  cardToDelete = { id: cardId, element: cardElement };
  openModal(popupConfirmDeleteCard);
  console.log("Клик по иконке удаления карточки:", cardId);
}

function renderCards() {
  getDataAPI
    .then(([user, cards]) => {
      currentUserId = user._id;
      cards.forEach((contentCard) => {
        const cardElement = createCard(
          contentCard,
          addLikeCard,
          popupFullImageClick,
          user._id,
          deleteLikeCard,
          handleDeleteIconClick
        );
        listPlaces.append(cardElement);
      });
    })
    .catch((err) => {
      console.log("Ошибка получения карточек:", err);
    });
}

renderCards();

function fillUserData() {
  getDataAPI
    .then(([user, cards]) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => {
      console.log("Ошибка получения данных пользователя:", err);
    });
}

fillUserData();
enableValidation(validationConfig);

buttonOpenPopupProfile.addEventListener("click", () => {
  formProfileInputName.value = profileTitle.textContent;
  formProfileInputDescription.value = profileDescription.textContent;
  openModal(popupProfile);
  clearValidation(popupProfile, validationConfig);
});

buttonOpenPopupAddNewCard.addEventListener("click", () => {
  formAddNewCard.reset();
  openModal(popupAddNewCard);
  clearValidation(popupAddNewCard, validationConfig);
});

profileImage.addEventListener("click", () => {
  formprofileImage.reset();
  openModal(popupProfileImage);
  clearValidation(popupProfileImage, validationConfig);
});

formProfile.addEventListener("submit", handleProfile);
formAddNewCard.addEventListener("submit", handleAddNewCard);
formprofileImage.addEventListener("submit", handleprofileImage);

confirmDeleteCardButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (cardToDelete) {
    deleteCard(cardToDelete.id, cardToDelete.element);
    closeModal(popupConfirmDeleteCard);
    cardToDelete = null;
  }
});

popups.forEach((popup) => {
  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => closeModal(popup));
});
