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

    likeCard(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card.id}`, {
            method: 'PUT', headers: this._headers
        }).then(this._getData);
    }

    unLikeCard(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card.id}`, {
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

/*
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '945d8c08-a2b0-4b31-8bc8-ff311437b5f8',
        'Content-Type': 'application/json'
    }
}

const getData = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getProfilInfo() {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(getData);
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(getData);
}

export function patchProfile(profileData) {
    return fetch(`${config.baseUrl}/users/me`, { method: 'PATCH', headers: config.headers, body: JSON.stringify(profileData) }).then(getData);
}

export function postNewCard(cardData) {
    return fetch(`${config.baseUrl}/cards `, { method: 'POST', headers: config.headers, body: JSON.stringify(cardData) }).then(getData);
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: config.headers }).then(getData);
}

export function likeCard(card) {
    return fetch(`${config.baseUrl}/cards/likes/${card.id}`, { method: 'PUT', headers: config.headers }).then(getData);
}

export function unLikeCard(card) {
    return fetch(`${config.baseUrl}/cards/likes/${card.id}`, { method: 'DELETE', headers: config.headers }).then(getData);
}

export function setAvatar(data) {
    return fetch(`${config.baseUrl}/users/me/avatar`, { method: 'PATCH', headers: config.headers, body: JSON.stringify(data) }).then(getData);
}

*/