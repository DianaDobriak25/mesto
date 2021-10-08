import { initPopupPreview } from "./index.js";

class Card {
    constructor(data, elementTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._elementTemplate = elementTemplate;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._elementTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);

        //возвращаем Dom-элемент карточки.
        return cardElement;
    }

    //создаем разметку в приватное поле _element, так у др элементов появится доступ к ней.
    getCard() {
        this._element = this._getElement();
        this._cardImage = this._element.querySelector('.element__grid');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__appellation').textContent = this._name;

        return this._element;
    }

    _setLikeEventListener(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    _setDeleteCardListener = (evt) => {
        evt.target.closest('.element').remove();

    };

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
        this._cardImage
            .addEventListener('click', () => {
                initPopupPreview(this._name, this._link);
            });
    }
}

// Экспортируем Card по дефолту из модуля
export { Card };