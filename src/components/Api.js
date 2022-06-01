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

    getData(infoDomain, cardsDomain) {
        return Promise.all([
            this.makeRequest(infoDomain),
            this.makeRequest(cardsDomain)
        ])
    }

}
