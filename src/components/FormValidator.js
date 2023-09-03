export class FormValidator {
    constructor(config, formItem) {
        this._config = config;
        this._formItem = formItem;
    }

    _showInputError(formElement, inputElement, errorMessage, config) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        inputElement.classList.add(config.errorClass);
    };

    _hideInputError(formElement, inputElement, config) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(config.inputErrorClass);
        inputElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(formElement, inputElement, config) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else {
            this._hideInputError(formElement, inputElement, config);
        }
    };

    _invalidInputExists(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableButton(buttonElement, inactiveButtonClass) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    }

    _enableButton(buttonElement, inactiveButtonClass) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }

    _toggleButtonState(inputList, submitButtonElement, inactiveButtonClass) {
        if (this._invalidInputExists(inputList)) {
            this._disableButton(submitButtonElement, inactiveButtonClass)
        } else {
            this._enableButton(submitButtonElement, inactiveButtonClass)
        }
    }

    _setEventListeners(formElement, config) {
        const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

        this._toggleButtonState(inputList, submitButtonElement, config.inactiveButtonClass);

        formElement.addEventListener('reset', () => {
            this._disableButton(submitButtonElement, config.inactiveButtonClass);
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, config);
                this._toggleButtonState(inputList, submitButtonElement, config.inactiveButtonClass);
            });
        });
    };

    enableValidation() {
        this._formItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formItem, this._config);
    }

}