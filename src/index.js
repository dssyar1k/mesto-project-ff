import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleLikeButtonClick,
  deleteCard,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
const placesList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAddNewCard = document.querySelector('form[name="new-place"]');
const formAddNameCardInput = document.querySelector('input[name="place-name"]');
const formAddLinkInput = document.querySelector('input[name="link"]');

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

profileEditButton.addEventListener("click", () => {
  setProfileInputs();
  openModal(popupEdit);
});

initialCards.forEach((cardContent) => {
  const card = createCard(
    cardContent,
    deleteCard,
    handleLikeButtonClick,
    handleCardImageClick,
    openImagePopup
  );
  placesList.append(card);
});

function setProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEdit);
}

function handleCardImageClick({ link, name }) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    if (popup) {
      closeModal(popup);
    }
  });
});

formAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameCardValue = formAddNameCardInput.value;
  const linkInputValue = formAddLinkInput.value;

  const newCardElement = createCard(
    { name: nameCardValue, link: linkInputValue },
    deleteCard,
    handleLikeButtonClick,
    openImagePopup
  );
  placesList.prepend(newCardElement);

  formAddNewCard.reset();
  closeModal(popupNewCard);
});

function openImagePopup({ link, name }) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", () => openModal(popupNewCard));
