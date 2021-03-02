import Popup from './Popup.js';
import {selectorsData} from '../utils/constants.js'

export default class PopupWithForm extends Popup {
	constructor(popupSelector, {handleSubmit, name, about}) {
		super(popupSelector);
		this._handleSubmit = handleSubmit;
		this._form = this._popup.querySelector('.popup__form');
		this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
		this._name = name;
		this._about = about;
	}

	//метод для получения ввденных в форму данных
	_getInputValues() {	
		return [this._inputs[0].value, this._inputs[1].value]
	}

	//метод для установки слушателей сабмита на форму, а также наследования слушателей клика на "закрыть", оверлей и эскейп
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			this._handleSubmit(evt, this._getInputValues());
			this.close()
		});
	}

	//метод закрытия попапа, сбравывающий также ошибки и поля формы для следующего открытия
	close() {
		super.close()
		this._form.reset();
		this._hideErrors();
	}

	//метод открытия попапа, добавляющий также в форму редактирования значения имени и описания пользователя
	open() {
		super.open();
		if (this._popupSelector == '.popup_feature_edit') {
			this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
			this._inputs[0].value = this._name;
			this._inputs[1].value = this._about;
		}
	}

	//метод для сброса ошибок в конце работы с формой
	_hideErrors() {
		this._submitButton = this._popup.querySelector('.popup__save-button');
		this._submitButton.classList.add('popup__save-button_disabled');
		this._submitButton.setAttribute('disabled', 'disabled');
		this._inputs.forEach((inputElement) => {
			inputElement.classList.remove(selectorsData.inputErrorClass);
			selectorsData.errorElement = this._form.querySelector(`.${inputElement.id}-error`);
			selectorsData.errorElement.classList.remove(selectorsData.errorClass);
			selectorsData.errorElement.textContent = '';
		})
	}
}