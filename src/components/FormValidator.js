export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);                    //Добавление класса с ошибкой 
        this._errorElement.textContent = inputElement.validationMessage;      // наполняем элемент текстом
        this._errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.classList.remove(this._config.errorClass);
        this._errorElement.textContent = '';                                  // очищаем текст
    }

    _checkingValidityInput = (inputElement) => {
        if (!inputElement.validity.valid) {//если состояние валидно ошибку не показываем
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);// прячем ошибку
        }
    }//проверка валидации поля

    _searchInvalidInput = () => {
        return this._inputList.some(inputElement => {// Имеем валидные инпуты
            return !inputElement.validity.valid;    //Не имеем валидные инпуты
        }); // возвращаем значение
    }//поиск ошибки в форме

    _disableFormSubmitButton = () => {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableFormSubmitButton = () => {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _buttonStatus = () => {
        if (this._searchInvalidInput()) {
            this._disableFormSubmitButton();
            // выключаем кнопку
        } else {
            this._enableFormSubmitButton();
        }// включаем кнопку
    } //проверка состояния кнопки


    // Сброс состояния валидатора
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.value = ""; // очищаем поля
            this._hideInputError(inputElement)
        });
        this._buttonStatus();
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            // Навешиваем для них обработчик события.Для форм выключаем один раз действие по умолчанию.
            // При сабмите действие по умолчанию нужно запретить.
        })//НАВЕШИВАНИЕ ОБРАБОТЧИКА СОБЫТИЯ К КОНКРЕТНО ОДНОЙ ФОРМЕ.

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkingValidityInput(inputElement);
                //если что-то было введено в поле, проверит валидно ли оно, если нет, окрасит в красный цвет
                this._buttonStatus();//переключение состояния кнопки
            })
        })//для каждого элемента навешиваем свои обработчики событий
    }
}
