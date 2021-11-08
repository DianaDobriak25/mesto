import Popup from './Popup.js'

// вставлятtn в попап картинку с src изображения и подписью к картинке.
export class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._name = this._popup.querySelector('.popup__image-name');
        this._link = this._popup.querySelector('.popup__image');
    }

    open(name, link) {
        this._name.textContent = name;
        this._link.alt = name;
        this._link.src = link;
        super.open();
    }
}