export class FormValidator {
    constructor(config, formItem) {
        this._formItem = formItem;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._submitButtonElement = formItem.querySelector(config.submitButtonSelector);
        this._inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formItem.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._inputErrorClass);
        inputElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError(inputElement) {
        const errorElement = this._formItem.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._inputErrorClass);
        inputElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _invalidInputExists() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableButton() {
        this._submitButtonElement.disabled = true;
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }

    _enableButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }

    _toggleButtonState() {
        if (this._invalidInputExists()) {
            this._disableButton()
        } else {
            this._enableButton()
        }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._formItem.addEventListener('reset', () => {
            this._disableButton();
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._formItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

}