class Card {
    constructor(data, userId, elementTemplate, handleCardClick, handleCardDelete, handleLike) {
        this._id = data._id;  //
        this._owner = data.owner; // какого именно пользователя карточка
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes; // какого именно пользователя лайк
        this._userId = userId;
        this._elementTemplate = elementTemplate;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLike = handleLike; //обработчик события клика на лайк
        this._userIsOwner = data.owner._id === userId;
    }

    //в консоле смотрим, какие данные для конструктора требуются

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
        this._element.setAttribute("id", this._id);
        this._cardImage = this._element.querySelector('.element__grid');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__appellation').textContent = this._name;
        this._element.querySelector('.element__like-sum').textContent = this._likes.length; //передаем количество лайков
        
        // если карточка принадлежит пользователю, то мы ее можем удалить(свою)
        if (!this._userIsOwner) {
            this._element.querySelector('.element__delete').remove();
        }

        // если пользователь лайкнул карточку, то добавляем класс активного сердечка
        if (this.isLiked()) {
            this._element.querySelector('.element__like').classList.add('element__like_active');
        }
        return this._element;
    }

    // переключает класс активного лайка
    toggleLikeActive() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _setEventListeners() {
        this._element
            .querySelector('.element__like')
            .addEventListener('click', () => {
                this._handleLike(this); //при клике на лайк мы будем вызывать наш обработчик, в который передаем this - объект карточки
            });

        this._element
            .querySelector('.element__delete')
            .addEventListener('click', () => {
                this._handleCardDelete();
            });
        this._cardImage
            .addEventListener('click', () => {
                this._handleCardClick(this._name, this._link);
            });
    }
    //благодаря этому методу мы можем получать массив лайков
    updateLikes(likes) {
        this._likes = likes;
        //обновляем количество лайков
        this._element.querySelector('.element__like-sum').textContent = this._likes.length;
    }

    getId() {
        return this._id
    }

    //метод позволяет узнать лайкнул ли ты карточку. Если у юзера совпадает идентификатор с моим, значит лайк мой
    isLiked() {
        return Boolean(this._likes.find(user => user._id === this._userId))
    }


}

// Экспортируем Card по дефолту из модуля
export { Card };