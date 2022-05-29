export default class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            userName: this._userNameElement.textContent,
            userJob: this._userJobElement.textContent,
        };
    }
    setUserInfo({userName,userJob}){
        this._userNameElement.textContent=userName;
        this._userJobElement.textContent=userJob;
    }
}
