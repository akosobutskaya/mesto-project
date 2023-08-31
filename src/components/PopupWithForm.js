import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formInputList = this._popupForm.querySelectorAll('.popup__input');
        this._btnName = this._popupForm.querySelector('.popup__submit-button');
        this._defaultBtnName = this._btnName.value;
        this._newInputValues = {};
        this._submitEvtHandler = this._submitEvtHandler.bind(this);
    }

    _getInputValues() {
        this._formInputList.forEach(input => {
            this._newInputValues[input.name] = input.value;
        });
        return this._newInputValues;
    }

    _setEventListeners() {
        super._setEventListeners();
        this._popupForm.addEventListener('submit', this._submitEvtHandler);
    }

    _submitEvtHandler(evt) {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._popupForm.removeEventListener('submit', this._submitEvtHandler);
    }

    close() {
        super.close();
        this._popupForm.reset();
        this._removeEventListeners();
    }

    setBtnStatusSaving(isLoading) {
        if (isLoading) {
            this._btnName.value = 'Сохранение...';
        } else {
            this._btnName.value = this._defaultText;
        }
    }
}