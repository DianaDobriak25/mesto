const containerOfCards = document.querySelector('.elements');

// New Place
const popupElementNewPlace = document.querySelector('.popup_new-place');
const profileAddButton = document.querySelector('.profile__add-button');
const formInputNameNewPlace = document.getElementById("nameNewPlace");
const formInputDescriptionNewPlace = document.getElementById("descriptionNewPlace");
const popupNewPlaceCloseButtonElement = popupElementNewPlace.querySelector('.popup__close');
const newPlaceForm = popupElementNewPlace.querySelector('form');

// Preview
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = popupPreview.querySelector('.popup__image');
const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
const popupPreviewClose = popupPreview.querySelector('.popup__close');

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

// Добавление новой карточки, вызывается каждый раз, когда добавляется элемент на страницу.
function addCardItem(item) {
    const elementTemplateContent = document.getElementById('elementTemplate').content;
    const newItem = elementTemplateContent.cloneNode(true);
    const newItemImage = newItem.querySelector('.element__grid');
    const newItemDescription = newItem.querySelector('.element__appellation');
    newItemImage.setAttribute('src', item.link);
    newItemDescription.textContent = item.name;
    containerOfCards.prepend(newItem);
    const firstChild = containerOfCards.firstChild.nextSibling;
    showCardPreview(firstChild);
    toggleLike(firstChild);
    deleteCard(firstChild);
}

defaultCards.forEach(function (item) {
    addCardItem(item);
});

// Новое место
const newPlaceOpenPopup = function () {
    popupElementNewPlace.classList.add('popup_is-opened');
}
const newPlaceClosePopup = function () {
    popupElementNewPlace.classList.remove('popup_is-opened');
}

function newPlaceFormSubmitHandler(evt) {
    evt.preventDefault();
    const name = formInputNameNewPlace.value;
    const link = formInputDescriptionNewPlace.value;
    const newItem = {
        name: name,
        link: link
    }
    addCardItem(newItem);
    newPlaceClosePopup();
}
newPlaceForm.addEventListener('submit', newPlaceFormSubmitHandler);
profileAddButton.addEventListener('click', newPlaceOpenPopup);
popupNewPlaceCloseButtonElement.addEventListener('click', newPlaceClosePopup);

// Превью
function showCardPreview(item) {
    item.addEventListener('click', function () {
        openPopupPreview();
        const elImage = item.querySelector('.element__grid');
        const elImageName = item.querySelector('.element__appellation');
        popupPreviewImage.setAttribute('src', elImage.getAttribute('src'));
        popupPreviewImageName.textContent = elImageName.textContent;
    });
}
function openPopupPreview() {
    popupPreview.classList.add('popup_is-opened');
}
function closePopupPreview() {
    popupPreview.classList.remove('popup_is-opened');
}
popupPreviewClose.addEventListener('click', closePopupPreview);


// Редактирование профиля
const profileOpenPopup = function () {
    formInputNameEdit.value = nameElementProfile.textContent;
    formInputDescriptionEdit.value = descriptionElementProfile.textContent;
    popupElementEdit.classList.add('popup_is-opened');
}
const profileClosePopup = function () {
    popupElementEdit.classList.remove('popup_is-opened');
}
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    nameElementProfile.textContent = formInputNameEdit.value;
    descriptionElementProfile.textContent = formInputDescriptionEdit.value;
}
editForm.addEventListener('submit', editFormSubmitHandler);
profileEditButtonElement.addEventListener('click', profileOpenPopup);
popupEditCloseButtonElement.addEventListener('click', profileClosePopup);

// Лайк
function toggleLike(item) {
    const element = item.querySelector('.element__like');
    element.addEventListener('click', function (evt) {
        evt.stopPropagation();
        evt.target.classList.toggle('element__like_active');
    });
}


//Удаление карточки

function deleteCard(item) {
    const bin = item.querySelector('.element__delete');
    bin.addEventListener('click', function(evt) {
        evt.stopPropagation();
        item.remove();
    })
}