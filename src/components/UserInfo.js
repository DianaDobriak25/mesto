export default class UserInfo {
    constructor({ _id, cohort, userName, userDescription, userAvatar }) {
        this._id = _id;
        this._cohort = cohort;
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userAvatar = document.querySelector(userAvatar);
    }

    //получаем информацию о пользователе
    getUserInfo() {
        const dataUser = {};
        dataUser.id = this._id;
        dataUser.cohort = this._cohort;
        dataUser.userName = this._userName.textContent;
        dataUser.userDescription = this._userDescription.textContent;
        dataUser.userAvatar = this._userAvatar.getAttribute('src');
        return dataUser; // передаем все эти значения(из консоля)
    }

    // информация о пользователе
    setUserInfo({ _id, cohort, avatar, name, description }) {
        if (_id) this._id = _id;
        if (cohort) this._cohort = cohort;
        if (avatar) this._userAvatar.setAttribute("src", avatar);
        if (name) this._userName.textContent = name;
        if (description) this._userDescription.textContent = description;
    }
}