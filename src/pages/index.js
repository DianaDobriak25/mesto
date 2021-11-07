import './index.css';

import Api from '../components/Api.js';

import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";



import {
    profileAddButton,
    profileEditButtonElement,
    formEdit,
    formNewPlace,
    formUpdateAvatar,
    validatorConfig,
    profileUpdateAvatarButton
} from '../utils/constants.js';


const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1',
    groupId: 'cohort-29',
    token: '8b33a509-4e1f-4dbc-8edf-f6d68bfac89d'
});

const createCard = (data) => {
    const newCard = new Card(
        data,
        userInfo.getUserInfo().id,
        '.elementTemplate',
        (name, link) => {
            popupWithImage.open(name, link);
        },
        () => {
            popupDeleteCard.setInputValues(data);
            popupDeleteCard.open();
        },
        (card) => {
            api.setLikes(card.getId(), card.isLiked()).then((data) => {
                card.updateLikes(data.likes);
                card.toggleLikeActive();
            }) //передаем this и получаем card
        }
    );
    const cardElement = newCard.getCard();
    return cardElement;
}

const section = new Section({
    items: [],
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

const validatorUpdateAvatar = new FormValidator(validatorConfig, formUpdateAvatar);
validatorUpdateAvatar.setEventListeners();

//созд. информацию о пользователе
const userInfo = new UserInfo({
    userName: '.profile__name',
    userDescription: '.profile__description',
    userAvatar: '.profile__image'
});

//созд. попап с картинкой
const popupWithImage = new PopupWithImage('.popup_preview');
popupWithImage.setEventListeners();

// Редактирование профиля
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
    popupEdit.updateState('Сохранение...');
    api.setUserInfo({
        name: data.name,
        about: data.description
    }).then(data => {
        userInfo.setUserInfo({
            _id: data._id,
            name: data.name,
            description: data.about,
            avatar: data.avatar,
            cohort: data.cohort,
        });
        popupEdit.close();
        popupEdit.updateState('Сохранить');
    });
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
    //берем данные из формы создания карточки и посылаем на сервер для сохранения
    popupCard.updateState('Сохранение...');
    api.createNewCard(data).then(data => {
        // получили данные сохраненной карточки и отрисовали их на странице
        const cardElement = createCard(data);
        section.addItem(cardElement);
        popupCard.close();
        popupCard.updateState('Создать');
    })

});
popupCard.setEventListeners();

profileAddButton.addEventListener('click', function () {
    validatorNewPlace.resetValidation();
    popupCard.open();
});
//=====================================================

// Удаление карточки
const popupDeleteCard = new PopupWithForm('.popup_card-delete', (data) => {
    popupDeleteCard.updateState('Удаление...');
    api.deleteCard(data).then(() => {
        section.removeItem(data._id);
        popupDeleteCard.close();
        popupDeleteCard.updateState('Да');
    });
});
popupDeleteCard.setEventListeners();
//=====================================================

// обновление аватара
const popupAvatar = new PopupWithForm('.popup_avatar', (data) => {
    popupAvatar.updateState('Сохранение...');
    api.setUserAvatar(data).then(data => {
        userInfo.setUserInfo({
            _id: data._id,
            name: data.name,
            description: data.about,
            avatar: data.avatar,
            cohort: data.cohort,
        });
        popupAvatar.close();
        popupAvatar.updateState('Сохранить');
    })
});
popupAvatar.setEventListeners();

// при клике открываем попап для обновления изображения
profileUpdateAvatarButton.addEventListener('click', function () {
    validatorUpdateAvatar.resetValidation();
    const inputData = userInfo.getUserInfo();
    popupAvatar.setInputValues({
        avatar: inputData.userAvatar,
    })
    popupAvatar.open();
})

// Работа с API, получение данных и их обработка(вставка)
api
    .getAppInfo()
    .then(([userInfoRes, cardListRes]) => {
        // Вставили данные пользователя
        userInfo.setUserInfo({
            _id: userInfoRes._id,
            name: userInfoRes.name,
            description: userInfoRes.about,
            avatar: userInfoRes.avatar,
            cohort: userInfoRes.cohort,
        });

        // Создали карточки
        cardListRes.forEach(data => {
            const cardElement = createCard(data);
            section.addItem(cardElement);
        });
    })

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
const Vector2 = new URL('../images/Vector10.svg', import.meta.url);


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
    { name: 'Vector', link: Vector },
    { name: 'Vector2', link: Vector2 }
];
