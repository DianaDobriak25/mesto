//1
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

// Preview
const popupPreview = document.querySelector('.popup_preview');
const popupPreviewImage = popupPreview.querySelector('.popup__image');
const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
const popupPreviewClose = popupPreview.querySelector('.popup__close');


class Card {
    constructor(data, elementTemplate, openModalCard) {
        this._name = data.name;
        this._link = data.link;
        this._elementTemplate = elementTemplate;
        this._openModalCard = openModalCard;
    }

    _getElement() {
        const cardElement = document
            .querySelector('.elementTemplate')
            .content
            .querySelector('.element')
            .cloneNode(true);

        //возвращаем Dom-элемент карточки.
        return cardElement;
    }

    //создаем разметку в приватное поле _element, так у др элементов появится доступ к ней.
    getCard() {
        this._element = this._getElement();
        this._setEventListeners();
        //добавляем данные
        this._element.querySelector('.element__grid').src = this._link;
        this._element.querySelector('.element__grid').alt = this._name;
        this._element.querySelector('.element__appellation').textContent = this._name;

        return this._element;
    }

    _setLikeEventListener(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    _setDeleteCardListener = (evt) => {
        evt.target.closest('.element').remove();

    };

    _openPopupPreview () {
        popupPreview.classList.add('popup_is-opened');
        popupPreviewImage.setAttribute('src', this._link);
        popupPreviewImageName.textContent = this._name;
        document.addEventListener('keydown', this._popupCloseEscCard);
    }

    _closePopupPreview() {
        popupPreview.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._popupCloseEscCard );
    }

    _popupCloseEscCard = (evt) => {
        if (evt.key === 'Escape') {
            this._closePopupPreview()
        }
    }

    _setEventListeners() {
        this._element
            .querySelector('.element__like')
            .addEventListener('click', (evt) => {
                this._setLikeEventListener(evt);
            });

        this._element
            .querySelector('.element__delete')
            .addEventListener('click', (evt) => {
                this._setDeleteCardListener(evt);
            });

        this._element
            .querySelector('.element__grid')
            .addEventListener('click', () => {
                this._openPopupPreview();
            });

        popupPreviewClose.addEventListener('click', () => {
            this._closePopupPreview();
        });
    }
}

defaultCards.forEach((item) => {
    const newCard = new Card(item, item, '#template-element');// создаем класс для каждой карточки
    const cardSection = document.querySelector('.elements');// находим блок для карточек
    const cardElement = newCard.getCard(); //вставляем метод класса Card в переменную
    cardSection.prepend(cardElement);//добавляем карточку в конец блока
})

// Экспортируем Card по дефолту из модуля
export { Card };