import { Card } from "./card.js";
import FormValidator from "./formValidator.js";


// New Place
const popupElementNewPlace = document.querySelector('.popup_new-place');
const profileAddButton = document.querySelector('.profile__add-button');
const formInputNameNewPlace = document.getElementById("nameNewPlace");
const formInputDescriptionNewPlace = document.getElementById("descriptionNewPlace");
const popupNewPlaceCloseButtonElement = popupElementNewPlace.querySelector('.popup__close');
const newPlaceForm = popupElementNewPlace.querySelector('form');




// Edit
const popupElementEdit = document.querySelector('.popup_edit');
const popupButtonEdit = popupElementEdit.querySelector('.popup__button');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupEditCloseButtonElement = popupElementEdit.querySelector('.popup__close');
const editForm = popupElementEdit.querySelector('form');
const formInputNameEdit = document.getElementById("nameEdit");
const formInputDescriptionEdit = document.getElementById("descriptionEdit");

// Profile
const nameElementProfile = document.querySelector('.profile__name');
const descriptionElementProfile = document.querySelector('.profile__description');





function createCard(item) {
    const newCard = new Card(item, item, '#template-element');// созд. класс для каждой карточки
    const cardSection = document.querySelector('.elements');// находим блок для карточек
    const cardElement = newCard.getCard();// вставляем метод класса Card  в переменную
    cardSection.prepend(cardElement);// добав. какрточку в конец блока
}



// Новое место
function newPlaceFormSubmitHandler(evt) {
    evt.preventDefault();
    const name = formInputNameNewPlace.value;
    const link = formInputDescriptionNewPlace.value;
    const newItem = {
        name: name,
        link: link
    }
    createCard(newItem);
    closeModal(popupElementNewPlace);
}
newPlaceForm.addEventListener('submit', newPlaceFormSubmitHandler);
profileAddButton.addEventListener('click', function () {
    openModal(popupElementNewPlace);
});
popupNewPlaceCloseButtonElement.addEventListener('click', function () {
    closeModal(popupElementNewPlace);
});


// Редактирование профиля
const profileOpenPopup = function () {
    formInputNameEdit.value = nameElementProfile.textContent;
    formInputDescriptionEdit.value = descriptionElementProfile.textContent;
    openModal(popupElementEdit);
}
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    nameElementProfile.textContent = formInputNameEdit.value;
    descriptionElementProfile.textContent = formInputDescriptionEdit.value;
    closeModal(popupElementEdit);
}
editForm.addEventListener('submit', editFormSubmitHandler);
profileEditButtonElement.addEventListener('click', profileOpenPopup);
popupEditCloseButtonElement.addEventListener('click', function () {
    closeModal(popupElementEdit);
});



// Управление модальным окном
function openModal(el) {
    el.classList.add('popup_is-opened');
    document.addEventListener('keydown', popupCloseEsc);
}
function closeModal(el) {
    el.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', popupCloseEsc);
}

const popupCloseEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popap = document.querySelector('.popup_is-opened');
        closeModal(popap);
    }
}

const popupCloseOverlay = () => {
    const popapList = Array.from(document.querySelectorAll('.popup'));
    popapList.forEach((el) => {
        const container = el.querySelector('.popup__container');
        container.addEventListener('click', evt => {
            evt.stopPropagation();
        })
        el.addEventListener('click', () => {
            closeModal(el);
        })
    })
}
popupCloseOverlay();

/**
 * Функция отвечает за включение валидации
 */
 const enableValidation = (config) => {
    // находим все формы и для каждой формы устанавливаем обработчики событий(setEventListeners)
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        const validator = new FormValidator(config, formElement);
        validator.setEventListeners();
    });//
};


enableValidation({
    formSelector: 'form', //'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error'
});