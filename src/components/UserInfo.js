export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            userName: this._userNameElement.textContent,
            userJob: this._userJobElement.textContent,
        };
    }

    setUserInfo({userName, userJob}) {
        this._userNameElement.textContent = userName;
        this._userJobElement.textContent = userJob;
    }

    setAvatar(link) {
        this._avatarElement.src = `${link}`;
    }

    setUserId(userId) {
        this._userId = userId
    }

    getUserId() {
        return this._userId
    }
}
