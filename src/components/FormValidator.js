export default class FormValidator {
	constructor(data, formElement) {
		this._formSelector = data.formSelector;
		this._inputSelector = data.inputSelector;
		this._submitButtonSelector = data.submitButtonSelector;
		this._inactiveButtonClass = data.inactiveButtonClass;
		this._inputErrorClass = data.inputErrorClass;
		this._errorClass = data.errorClass;
		this._formElement = formElement;
	}

	//публичный метод валидации формы
	enableValidation() {
		this._setEventListeners();
	}

	// метод установки слушателей
	_setEventListeners() {
		this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
		});
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._isValid(inputElement);
				this._toggleButtonState();
			})
		})
	}

	//метод переключения состояния кпопки отправли формы в зависимости от валидности формы
	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._inactiveButtonClass);
			this._buttonElement.setAttribute('disabled', 'disabled');
		} else {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.removeAttribute('disabled')
		}
	}
	//метод провеки наличия хотя бы одного невалидного поля ввода в форме
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {return !inputElement.validity.valid});
	}

	//метод проверки поля ввода на валидность и запуска соответствующей инструкции
	_isValid(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	}

	// метод включения разметки ошибки при введении чего-либо в поле инпута
	_showInputError(inputElement) {
		inputElement.classList.add(this._inputErrorClass);
		this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		this._errorElement.classList.add(this._errorClass);
		this._errorElement.textContent = inputElement.validationMessage;
	}

	// метод выключения разметки ошибки
	_hideInputError(inputElement) {
		inputElement.classList.remove(this._inputErrorClass);
		this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		this._errorElement.classList.remove(this._errorClass);
		this._errorElement.textContent = '';
	}

	//публичный метод для очистки ошибок при закрытии и перезагрузке формы
	hideAllErrors() {
		this._buttonElement.classList.add('popup__save-button_disabled'); 
		this._buttonElement.setAttribute('disabled', 'disabled'); 
		this._inputList.forEach((inputElement) => { 
			this._hideInputError(inputElement); 
		}) 
	} 
}