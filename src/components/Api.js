export default class Api {
    constructor({domain, token}) {
        this._domain = domain;
        this._headers = {authorization: token, "Content-Type": "application/json",}
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`${res.status} - ${res.statusText}`)
    }

    makeRequest(url, method = 'get', body) {
        const requestUrl = this._domain + url;
        return fetch(
            requestUrl,
            {
                method: method,
                headers: this._headers,
                body: JSON.stringify(body)
            }).then(this._checkResponse)
    }

    getUserInfo() {
        const infoDomain="/users/me"
        const cardsDomain="/cards"
        return Promise.all([
            this.makeRequest(infoDomain),
            this.makeRequest(cardsDomain)
        ])
    }

    deleteLikeCard(cardId) {
        const requestUrl = `/cards/${cardId}/likes`;
        return this.makeRequest(requestUrl, "DELETE")
    }

    addLikeCard(cardId) {
        const requestUrl = `/cards/${cardId}/likes`;
        return this.makeRequest(requestUrl, "PUT")
    }

    deleteCard(cardId) {
        const requestUrl = `/cards/${cardId}`;
        return this.makeRequest(requestUrl, "DELETE")
    }

    updateUserInfo(body) {
        const requestUrl = "/users/me";
        return this.makeRequest(requestUrl, "PATCH",body)
    }

    addNewCard(body) {
        const requestUrl = "/cards";
        return this.makeRequest(requestUrl, "POST",body)
    }
    updateAvatar(body) {
        const requestUrl = "/users/me/avatar";
        return this.makeRequest(requestUrl, "PATCH",body)
    }


}
