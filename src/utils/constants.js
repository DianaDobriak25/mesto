
export const defaultCards = [
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
export const popupElementNewPlace = document.querySelector('.popup_new-place');
export const profileAddButton = document.querySelector('.profile__add-button');
export const formInputNameNewPlace = document.getElementById("nameNewPlace");
export const formInputDescriptionNewPlace = document.getElementById("descriptionNewPlace");
export const popupNewPlaceCloseButtonElement = popupElementNewPlace.querySelector('.popup__close');
export const newPlaceForm = popupElementNewPlace.querySelector('form');


// Edit
export const popupElementEdit = document.querySelector('.popup_edit');
export const profileEditButtonElement = document.querySelector('.profile__edit-button');
export const popupEditCloseButtonElement = popupElementEdit.querySelector('.popup__close');
export const editForm = popupElementEdit.querySelector('form');
export const formInputNameEdit = document.getElementById("nameEdit");
export const formInputDescriptionEdit = document.getElementById("descriptionEdit");

// Profile
export const nameElementProfile = document.querySelector('.profile__name');
export const descriptionElementProfile = document.querySelector('.profile__description');

// Preview
export const popupPreview = document.querySelector('.popup_preview');
export const popupPreviewImage = popupPreview.querySelector('.popup__image');
export const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
export const popupPreviewClose = popupPreview.querySelector('.popup__close');

export const cardSection = document.querySelector('.elements');

export const formEdit = document.getElementById("formEdit");
export const formNewPlace = document.getElementById("formNewPlace");
