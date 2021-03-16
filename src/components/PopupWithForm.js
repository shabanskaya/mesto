import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, {handleSubmit, hideAllErrors}) {
		super(popupSelector);
		this._handleSubmit = handleSubmit;
		this._form = this._popup.querySelector('.popup__form');
		this._hideAllErrors = hideAllErrors;
	}

	//метод для получения ввденных в форму данных
	_getInputValues() {	
	  this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
		this._formValues = {};
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	//метод для установки слушателей сабмита на форму, а также наследования слушателей клика на "закрыть", оверлей и эскейп
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleSubmit(this._getInputValues(), this._openData, this._cardId);
			this.close()
		});
	}

	//метод закрытия попапа, сбравывающий также ошибки и поля формы для следующего открытия
	close() {
		super.close()
		this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
		this._hideAllErrors();
		this._form.reset();
	}

	//метод открытия попапа, добавляющий также в форму редактирования значения имени и описания пользователя
	open(data={name:'', link:'', avatar: ''}, cardId) {
		super.open();
		this._inputList = this._popup.querySelectorAll('.popup__input');
		this._inputList.forEach(input => {
				input.value = data[input.name]
		});
		//////
		this._openData = data;
		this._cardId = cardId
	}

}