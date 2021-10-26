import './index.css';
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
    defaultCards,
    profileAddButton,
    profileEditButtonElement,
    formEdit,
    formNewPlace,
    validatorConfig
} from '../utils/constants.js';

const createCard = (data) => {
    const newCard = new Card(data, '.elementTemplate', (name, link) => {
        popupWithImage.open(name, link);
    });
    const cardElement = newCard.getCard();
    return cardElement;
}

const section = new Section({
    items: defaultCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
    }
}, '.elements');
section.renderItems();

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

profileEditButtonElement.addEventListener('click', () => {
    validatorEdit.resetValidation();
    const inputData = userInfo.getUserInfo();
    popupEdit.setInputValues(inputData);
    popupEdit.open();
});
//=====================================================

// Создание новой карточки
const popupCard = new PopupWithForm('.popup_new-place', (data) => {
    const cardElement = createCard(data);
    section.addItem(cardElement);
});
popupCard.setEventListeners();

profileAddButton.addEventListener('click', function () {
    validatorNewPlace.resetValidation();
    popupCard.open();
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
