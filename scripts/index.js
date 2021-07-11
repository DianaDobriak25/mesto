// подключили скрипт и он работает
// console.log(`Привет, мир`);


// провожу выборку DOM элементов

const popupButtonElement = document.querySelector('.popup__button');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

const formInputName = document.getElementById("name");
const formInputDescription = document.getElementById("description");

const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
// console.log(popupButtonElement, profileEditButtonElement, popupElement, popupCloseButtonElement);


// Функция, которая «переключает» состояние всплывающего окошка. Функция toggle смотрит есть ли класс (popup_is-opened в html), то эта функция ее убирает, если нет, то добавляет. 
//classList.toggle("class") – добавить класс, если его нет - удалить(чередование).

//const togglePopupVisibility = function() {
//   console.log(popupElement.classList.toggle('popup_is-opened')
//}

//Метод add объекта classList позволяет добавлять CSS классы элементу
const profileOpenPopup = function () {
    formInputName.value = nameElement.textContent; // задать в input name="name" значение из елемента profile__name
    formInputDescription.value = descriptionElement.textContent; // задать в input name="description" значение из елемента profile__description
    popupElement.classList.add('popup_is-opened');
    // console.log('Open popup clicked')
}

////Метод remove объекта classList позволяет удалять CSS классы элемента
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

//togglePopupVisibility() // при вызове в первый раз всплывающего окна нет
//togglePopupVisibility() // при вызове во второй раз - пояаилось окошко
//togglePopupVisibility() // при вызове в третий раз - снова окошко исчезло



// Регистрируем обработчики событий по клику
//addEventListener - определяет  2 обязательных типа аргумента:
//-тип события (напр.: "click", что произойдет) и функцию, которая будет исполнена после указанного события.
profileEditButtonElement.addEventListener('click', profileOpenPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupButtonElement.addEventListener('click', closePopup);




const formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameElement.textContent = formInputName.value;
    descriptionElement.textContent = formInputDescription.value;

}
formElement.addEventListener('submit', formSubmitHandler); // добавляем обработчик события на отправку формы, т.е. указываем, что при отправке формы ('submit'), будет вызвана функция formSubmitHandler
