const containerOfCards = document.querySelector('.elements');
const elementTemplateContent = document.getElementById('elementTemplate').content;

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
function createCard(item) {
    const newItem = elementTemplateContent.cloneNode(true);
    const newItemImage = newItem.querySelector('.element__grid');
    const newItemDescription = newItem.querySelector('.element__appellation');
    newItemImage.setAttribute('src', item.link);
    newItemDescription.textContent = item.name;
    containerOfCards.prepend(newItem);
    const firstChild = containerOfCards.querySelector('.element');
    showCardPreview(firstChild);
    setLikeEventListener(firstChild);
    setDeleteCardListener(firstChild);
}

defaultCards.forEach(function (item) {
    createCard(item);
});

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

// Превью
function showCardPreview(item) {
    const elImage = item.querySelector('.element__grid');
    elImage.addEventListener('click', function () {
        openModal(popupPreview);
        const elImageName = item.querySelector('.element__appellation');
        popupPreviewImage.setAttribute('src', elImage.getAttribute('src'));
        popupPreviewImageName.textContent = elImageName.textContent;
    });
}
popupPreviewClose.addEventListener('click', function () {
    closeModal(popupPreview);
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

// Лайк
function setLikeEventListener(card) {
    const element = card.querySelector('.element__like');
    element.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
}


//Удаление карточки
function setDeleteCardListener(card) {
    const bin = card.querySelector('.element__delete');
    bin.addEventListener('click', function (evt) {
        card.remove();
    })
}

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
        const popapList = document.querySelectorAll('.popup');
        popapList.forEach((el) => {
            closeModal(el);
        })
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