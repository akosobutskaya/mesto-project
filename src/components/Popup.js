export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose(evt) {
        if (
            evt.target.classList.contains('popup') ||
            evt.target.classList.contains('popup__close-button')
        ) {
            this.close();
        }
    }

    open() {
        this._setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _setEventListeners() {
        this._popup.addEventListener('click', this._handleClickClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    _removeEventListeners() {
        this._popup.removeEventListener('click', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

}
