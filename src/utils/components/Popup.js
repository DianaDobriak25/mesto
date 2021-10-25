// отвечает за открытие и закрытие попапа. 
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._openModal = 'popup_is-opened';
        this._closeModal = 'popup__close';
        this._popupCloseEsc = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add(this._openModal);
        document.addEventListener('keydown', this._popupCloseEsc);
    }

    close() {
        this._popup.classList.remove(this._openModal);
        document.removeEventListener('keydown', this._popupCloseEsc);
    }
    //закрытиe попапа Esc.
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._openModal) || evt.target.classList.contains(this._closeModal)) {
                this.close();
            }
        })
    }
}
