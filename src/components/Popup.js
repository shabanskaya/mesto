export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this)
	}

	//метод закрытия попапа и удаления слушателя на эскейп
	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	//метод открытия попапа и установки слушателя на эскейп
	open() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);	
	}

	//функция, управляющая закрытие по клавише эскейп
	_handleEscClose(evt) {
		if (evt.key == 'Escape') {
			this.close();
		};
	}

	//метод для установки слушателей на попап: на кнопку "закрыть" и на оверлей 
	setEventListeners() {
		this._closeButton = this._popup.querySelector('.popup__close-button');
		this._closeButton.addEventListener('click', this.close.bind(this));
		this._popup.addEventListener('click', () => this.close());
		this._stopPropagationOnContainers();
	}

	//метод для остановки всплытия клика для закрытия попапа только кликом на оверлей
	_stopPropagationOnContainers() {
		this._popup.querySelector('.popup__container').addEventListener('click', (evt) => evt.stopPropagation())
	}
}