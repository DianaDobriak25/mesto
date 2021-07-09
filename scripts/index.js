// подключили скрипт и он работает
// console.log(`Привет, мир`);


// провожу выборку DOM элементов

const popupButtonElement = document.querySelector('.popup__button')
const profileEditButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
// console.log(popupButtonElement, profileEditButtonElement, popupElement, popupCloseButtonElement);


// Функция, которая «переключает» состояние всплывающего окошка. Функция toggle смотрит есть ли класс (popup_is-opened в html), то эта функция ее убирает, если нет, то добавляет. 
//classList.toggle("class") – добавить класс, если его нет - удалить(чередование).

//const togglePopupVisibility = function() {
//   console.log(popupElement.classList.toggle('popup_is-opened')
//}

//Метод add объекта classList позволяет добавлять CSS классы элементу
const profileEditButton = function() {
    popupElement.classList.add('popup_is-opened')
    // console.log('Open popup clicked')
  }
  
  ////Метод remove объекта classList позволяет удалять CSS классы элемента
  const closePopup = function() {
    popupElement.classList.remove('popup_is-opened')
  }

  const popupButton = function() {
    popupElement.classList.remove('popup_is-opened')
  }

//togglePopupVisibility() // при вызове в первый раз всплывающего окна нет
//togglePopupVisibility() // при вызове во второй раз - пояаилось окошко
//togglePopupVisibility() // при вызове в третий раз - снова окошко исчезло



// Регистрируем обработчики событий по клику
//addEventListener - определяет  2 обязательных типа аргумента:
//-тип события (напр.: "click", что произойдет) и функцию, которая будет исполнена после указанного события.
profileEditButtonElement.addEventListener('click', profileEditButton)
popupCloseButtonElement.addEventListener('click', closePopup)
popupButtonElement.addEventListener('click', popupButton)




const formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();

    const formInputName = document.getElementById("name").value; // в переменную formInputName сохранили значение из input с id=name;
    const formInputDescription = document.getElementById("description").value;

    const nameElement = document.querySelector('.profile__name');// в еременную nameElement сохраняем тег с классом .profile__name;
    const descriptionElement = document.querySelector('.profile__description');

    nameElement.textContent = formInputName; // свойству textContent элемента nameElement присваиваем значение из переменной formInputName, в которую до этого сохранили значение из input с атрибутом name="name"
    descriptionElement.textContent = formInputDescription;

}
formElement.addEventListener('submit', formSubmitHandler); // добавляем обработчик события на отправку формы, т.е. указываем, что при отправке формы ('submit'), будет вызвана функция formSubmitHandler
  