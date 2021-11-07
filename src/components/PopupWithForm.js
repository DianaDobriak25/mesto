import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector)
        this._callback = callback;
        this._popupContainer = this._popup.querySelector('.popup__container');
        this._inputData = this._popupContainer.querySelectorAll("input");
    }

    setInputValues(data) {
        for(let item in data) {
            const input = Array.from(this._inputData).find(el => el.getAttribute('id') === item);
            if (!input) continue;
            input.value = data[item];
        }
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

    updateState(state) {
        this._popup.querySelector('.popup__button').textContent = state;
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._callback(inputValues);
        });
        super.setEventListeners()
    }
}