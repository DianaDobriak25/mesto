
const showInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.add(inputErrorClass);                    //Добавление класса с ошибкой 
    errorElement.textContent = inputElement.validationMessage;      // наполняем элемент текстом
    errorElement.classList.add(errorClass);                         // отображаем его на экране
};

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';                                  // очищаем текст
};

const checkingValidityInput = (formElement, inputElement, inputErrorClass, errorClass) => {
    console.log(inputElement.id)
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {//если состояние валидно ошибку не показываем
        showInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorClass);// прячем ошибку
    }
};//проверка валидации поля


const searchInvalidInput = (inputList) => {
    return inputList.some(inputElement => {// Имеем валидные инпуты
        return !inputElement.validity.valid;    //Не имеем валидные инпуты
    }); // возвращаем значение
};//поиск ошибки в форме



const disableFormSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

const enableFormSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
};

const buttonStatus = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector)//ищем кнопку

    if (searchInvalidInput(inputList)) {
        disableFormSubmitButton(buttonElement, inactiveButtonClass);
        // выключаем кнопку
    } else {
        enableFormSubmitButton(buttonElement, inactiveButtonClass);
    }// включаем кнопку
}; //проверка состояния кнопки




const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();// Навешиваем для них обработчик события.Для форм выключаем один раз действие по умолчанию. При сабмите действие по умолчанию нужно запретить.
    });//НАВЕШИВАНИЕ ОБРАБОТЧИКА СОБЫТИЯ К КОНКРЕТНО ОДНОЙ ФОРМЕ.

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));//находим все поля
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkingValidityInput(formElement, inputElement, inputErrorClass, errorClass);//если что-то было введено в поле, проверит валидно ли оно, если нет, окрасит в красный цвет
            buttonStatus(formElement, inputList, submitButtonSelector, inactiveButtonClass);//переключение состояния кнопки
        });
        buttonStatus(formElement, inputList, submitButtonSelector, inactiveButtonClass);//переключение состояния кнопки

    });//для каждого элемента навешиваем свои обработчики событий
};

/**
 * Функция отвечает за включение валидации
 */
const enableValidation = (config) => {
    // находим все формы и для каждой формы устанавливаем обработчики событий(setEventListeners)
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass, config.errorClass, config.inactiveButtonClass);
    });//
};


enableValidation({
    formSelector: 'form', //'.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error'
});