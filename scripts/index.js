import { Card } from "./card.js";
import FormValidator from "./FormValidator.js";

const defaultCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// New Place
const popupElementNewPlace = document.querySelector('.popup_new-place');
const profileAddButton = document.querySelector('.profile__add-button');
const formInputNameNewPlace = document.getElementById("nameNewPlace");
const formInputDescriptionNewPlace = document.getElementById("descriptionNewPlace");
const popupNewPlaceCloseButtonElement = popupElementNewPlace.querySelector('.popup__close');
const newPlaceForm = popupElementNewPlace.querySelector('form');




// Edit
const popupElementEdit = document.querySelector('.popup_edit');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupEditCloseButtonElement = popupElementEdit.querySelector('.popup__close');
const editForm = popupElementEdit.querySelector('form');
const formInputNameEdit = document.getElementById("nameEdit");
const formInputDescriptionEdit = document.getElementById("descriptionEdit");

// Profile
const nameElementProfile = document.querySelector('.profile__name');
const descriptionElementProfile = document.querySelector('.profile__description');

// Preview
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = popupPreview.querySelector('.popup__image');
const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
const popupPreviewClose = popupPreview.querySelector('.popup__close');

const cardSection = document.querySelector('.elements');

const formEdit = document.getElementById("formEdit");
const formNewPlace = document.getElementById("formNewPlace");

// Перенесли валидаторы из цикла в отдельные элементы
const validatorConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error'
};
const validatorEdit = new FormValidator(validatorConfig, formEdit);
validatorEdit.setEventListeners();

const validatorNewPlace = new FormValidator(validatorConfig, formNewPlace);
validatorNewPlace.setEventListeners();


defaultCards.forEach((item) => {
    const card = createCard(item);
    prependCard(card);
})

function initPopupPreview(name, link) {
    openModal(popupPreview);
    popupPreviewImage.setAttribute('src', link);
    popupPreviewImage.setAttribute('alt', name);
    popupPreviewImageName.textContent = name;
}
// откр. модальное окно, в функцию передаем вид. Вызыв. при клике на изображение карточки. Вызываем в классе Card.

popupPreviewClose.addEventListener('click', () => {
    closeModal(popupPreview);
});

function prependCard(card) {
    cardSection.prepend(card);
}

function createCard(item) {
    const newCard = new Card(item, '.elementTemplate');// созд. класс для каждой карточки
    const cardElement = newCard.getCard();// вставляем метод класса Card  в переменную
    return cardElement;
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
    const card = createCard(newItem);
    prependCard(card);
    closeModal(popupElementNewPlace);
}
newPlaceForm.addEventListener('submit', newPlaceFormSubmitHandler);
profileAddButton.addEventListener('click', function () {
    validatorNewPlace.resetValidation();
    openModal(popupElementNewPlace);
});
popupNewPlaceCloseButtonElement.addEventListener('click', function () {
    closeModal(popupElementNewPlace);
});


// Редактирование профиля
const profileOpenPopup = function () {
    validatorEdit.resetValidation();
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

export {
    initPopupPreview
}