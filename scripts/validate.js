// функция включения разметки ошибки при введении чего-либо в поле инпута
function showInputError(formElement, inputElement, errorMessage, args) {
	inputElement.classList.add(args.inputErrorClass);
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.classList.add(args.errorClass);
	errorElement.textContent = errorMessage;
}

// функция выключения разметки ошибки
function hideInputError(formElement, inputElement, args) {
	inputElement.classList.remove(args.inputErrorClass);
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.classList.remove(args.errorClass);
	errorElement.textContent = '';
}

//функция проверки поля ввода на валидность и запуска соответствующей инструкции
function isValid(formElement, inputElement, args) {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, args);
	} else {
		hideInputError(formElement, inputElement, args);
	}
}

//функция провеки наличия хотя бы одного невалидного поля ввода в форме
function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {return !inputElement.validity.valid});
}

//функция переключения состояния кпопки отправли формы в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement, args) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(args.inactiveButtonClass);
		buttonElement.setAttribute('disabled', 'disabled');
	} else {
		buttonElement.classList.remove(args.inactiveButtonClass);
		buttonElement.removeAttribute('disabled')
	}
}

//функция добавления слушателей инпута на полях ввода в форме
function setEventListeners(formElement, args) {
	const inputList = Array.from(formElement.querySelectorAll(args.inputSelector));
	const buttonElement = formElement.querySelector(args.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, args);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, args);
			toggleButtonState(inputList, buttonElement, args);
		})
	})
}

//функция запуска валидации на каждой форме документа
function enableValidation(args) {
	const formList = Array.from(document.querySelectorAll(args.formSelector));
	formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
		});
		setEventListeners(formElement, args);
	});
}

//запуск валидации на всех формах документа
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 