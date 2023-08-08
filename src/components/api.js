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


