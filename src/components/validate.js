const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.inputErrorClass);
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function invalidInputExists(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

export function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
}

function toggleButtonState(inputList, submitButtonElement, inactiveButtonClass) {
  if (invalidInputExists(inputList)) {
    disableButton(submitButtonElement, inactiveButtonClass)
  } else {
    enableButton(submitButtonElement, inactiveButtonClass)
  }
}

const setEventListeners = (formElement, config) => {
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  toggleButtonState(inputList, submitButtonElement, config.inactiveButtonClass);

  formElement.addEventListener('reset', () => {
    disableButton(submitButtonElement, config.inactiveButtonClass);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButtonElement, config.inactiveButtonClass);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}