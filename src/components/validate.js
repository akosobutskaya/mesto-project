const showInputError = (formElement, inputElement, errorMessage, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(data.errorClass);
};

const hideInputError = (formElement, inputElement, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(data.inputErrorClass);
  inputElement.classList.remove(data.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, data) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideInputError(formElement, inputElement, data);
  }
};

function invalidInputExists(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButtonElement, inactiveButtonClass) {
  if (invalidInputExists(inputList)) {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, data) => {
  const submitButtonElement = formElement.querySelector(data.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));

  toggleButtonState(inputList, submitButtonElement, data.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, data);
      toggleButtonState(inputList, submitButtonElement, data.inactiveButtonClass);
    });
  });
};

export const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, data);
  });
}