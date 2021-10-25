import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector)
        this._callback = callback;
        this._popupContainer = this._popup.querySelector('.popup__container');
        this._inputData = this._popupContainer.querySelectorAll("input");
    }

    _getInputValues() {
        const formInfo = {};
        this._inputData.forEach(element => {
            formInfo[element.name] = element.value;
        });
        return formInfo;
    }

    close() {
      this._popupContainer.reset();
      super.close(); 
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._callback(inputValues);
            this.close();
        });
        super.setEventListeners()
    }
}