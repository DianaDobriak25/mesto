//отвечает за отрисовку элементов на странице
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items; //массив данных, которые нужно добавить на страницу 
        this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице.
        this._container = document.querySelector(containerSelector);//при помощи селектора добавляются созданные элементы.
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item)
        });
    }
    //принимает DOM-элемент и добавляет его в контейнер.

    addItem(element) {
        this._container.prepend(element);
    }
}

