import './index.css';
import Section from "../utils/components/Section.js";
import { Card } from "../utils/components/Card.js";
import FormValidator from "../utils/components/FormValidator.js";
import UserInfo from "../utils/components/UserInfo.js";
import { PopupWithImage } from "../utils/components/PopupWithImage.js";
import PopupWithForm from "../utils/components/PopupWithForm.js";

import {
    defaultCards,
    profileAddButton,
    profileEditButtonElement,
    cardSection,
    formEdit,
    formNewPlace
} from '../utils/constants.js';

const section = new Section({
    items: defaultCards,
    renderer: (item) => {
        const newCard = new Card(item, '.elementTemplate', (name, link) => {
            popupWithImage.open(name, link);
        });
        const cardElement = newCard.getCard();
        cardSection.prepend(cardElement);
    }
}, '.elements');
section.renderItems();


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

//созд. информацию о пользователе
const userInfo = new UserInfo({
    userName: '.profile__name',
    userDescription: '.profile__description'
});

//созд. попап с картинкой
const popupWithImage = new PopupWithImage('.popup_preview');
popupWithImage.setEventListeners();

// Редактирование профиля
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
    userInfo.setUserInfo(data);
});
popupEdit.setEventListeners();

profileAddButton.addEventListener('click', function () {
    validatorNewPlace.resetValidation();
    popupCard.open();
});
//=====================================================

// Создание новой карточки
const popupCard = new PopupWithForm('.popup_new-place', (data) => {
    const newCard = new Card(data, '.elementTemplate', (name, link) => {
        popupWithImage.open(name, link);
    });
    const cardElement = newCard.getCard();
    section.addItem(cardElement);
});
popupCard.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
    validatorEdit.resetValidation();
    popupEdit.open();
});
//=====================================================

const close = new URL('../images/close.png', import.meta.url);
const close2 = new URL('../images/close2.png', import.meta.url);
const closeIcon = new URL('../images/closeIcon.svg', import.meta.url);
const group = new URL('../images/Group.svg', import.meta.url);
const image1 = new URL('../images/image.png', import.meta.url);
const image2 = new URL('../images/image.svg', import.meta.url);
const kirillPershin = new URL('../images/kirill-pershin.png', import.meta.url);
const kirillPershin2 = new URL('../images/kirill-pershin2.png', import.meta.url);
const kirillPershin3 = new URL('../images/kirill-pershin3.svg', import.meta.url);
const kirillPershin4 = new URL('../images/kirill-pershin4.png', import.meta.url);
const likeActive = new URL('../images/like-active.svg', import.meta.url);
const like = new URL('../images/like.svg', import.meta.url);
const mesto = new URL('../images/mesto.svg', import.meta.url);
const plus = new URL('../images/plus.svg', import.meta.url);
const Vector = new URL('../images/Vector.svg', import.meta.url);


export const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'close', image: close },
  { name: 'close2', image: close2 },
  { name: 'closeIcon', link: closeIcon },
  { name: 'group', link: group },
  { name: 'image1', image: image1 },
  { name: 'image2', link: image2 },
  { name: 'kirillPershin', image: kirillPershin },
  { name: 'kirillPershin2', image: kirillPershin2 },
  { name: 'kirillPershin3', link: kirillPershin3 },
  { name: 'kirillPershin4', image: kirillPershin4 },
  { name: 'likeActive', link: likeActive },
  { name: 'like', link: like },
  { name: 'mesto', link: mesto },
  { name: 'plus', link: plus },
  { name: 'Vector', link: Vector }
]; 