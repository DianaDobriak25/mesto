//класс позволяющий делать запросы для тех или иных действий(добавить карточки, загрузить карточки итд).
export default class Api {
    constructor({ address, groupId, token }) {
        this._address = address;
        this._groupId = groupId;
        this._token = token;
    }

    _url(query) {
        return `${this._address}/${this._groupId}/${query}`
    }

    _get(query) {
        const option = {
            headers: {
                authorization: this._token
            }
        }
        return fetch(this._url(query), option).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    _set(query, method, body) {
        const option = {
            method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        return fetch(this._url(query), option).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    // Запрос информации о пользователе
    getUserInfo() {
        return this._get('users/me')
    }

    // Запрос начальных карточек
    getCardList() {
        return this._get('cards')
    }
    // Редактирование профиля
    setUserInfo(data) {
        return this._set('users/me', 'PATCH', data)
    }

    //создание новой карточки
    createNewCard(data) {
        return this._set('cards', 'POST', data)
    }

    //запрос сохранения аватара
    setUserAvatar(data) {
        return this._set('users/me/avatar', 'PATCH', data)
    }

    // Удаление карточки
    deleteCard(data) {
        return this._set(`cards/${data._id}`, 'DELETE', {});
    }

    //`cards/like/${id}` обновляем состояние лайка, liked- создание лайка(поставится), если true, если false, то сработает метод DELETE
    //запрос постановки лайка
    setLikes(id, liked) {
        return this._set(`cards/likes/${id}`, liked ? 'DELETE' : 'PUT', {});
    }

    // Объединение двух запросов в один промис для одновременной обработки
    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getCardList()]);
    }
}