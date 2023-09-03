export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getData(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfilInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(this._getData);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(this._getData);
    }

    patchProfile(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH', headers: this._headers,
            body: JSON.stringify(profileData)
        }).then(this._getData);
    }

    postNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards `, {
            method: 'POST', headers: this._headers, body: JSON.stringify(cardData)
        }).then(this._getData);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE', headers: this._headers
        }).then(this._getData);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT', headers: this._headers
        }).then(this._getData);
    }

    unLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE', headers: this._headers
        }).then(this._getData);
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH', headers: this._headers, body: JSON.stringify(data)
        }).then(this._getData);
    }

    loadData() {
        return Promise.all([this.getProfilInfo(), this.getCards()]);
    }

}
