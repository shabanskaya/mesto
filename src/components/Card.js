export default class Card {
	constructor(data, templateSelector, handlePopupImagePreview) {
		this._link = data.link;
		this._name = data.name;
		this._templateSelector = templateSelector;
		this._handlePopupImagePreview = handlePopupImagePreview;
	}

	// метод для получения элемента шаблона
	_getTemplate() {
		const templateCard = document.querySelector(this._templateSelector).content.querySelector('.card');
		const card = templateCard.cloneNode(true);
		return card
	}

	// метод возвращающий заполненный элемент карточки со всеми слушателями
	createCard() {
		this._element = this._getTemplate()
		this._cardPicture = this._element.querySelector('.card__pic');
		this._cardTitle = this._element.querySelector('.card__title');

		this._cardPicture.src = this._link;
		this._cardPicture.alt = this._name;
		this._cardTitle.textContent = this._name;
		this._setEventListeners()

		return this._element;
	}

	//метод, устанавливающий слушателей события на карточку
	_setEventListeners() {
		this._likeButton = this._element.querySelector('.card__like');
		this._trashButton = this._element.querySelector('.card__delete-button');

		this._likeButton.addEventListener('click', () => {
			this._handleLikeButton();
		});
		this._trashButton.addEventListener('click', () => {
			this._handleDeleteCard();
		});
		this._cardPicture.addEventListener('click', () => {
			this._handlePopupImagePreview();
		});
	}
	
	//метод управления кнопкой лайка
	_handleLikeButton() {
		this._likeButton.classList.toggle('card__like_active');
	}

	//метод управления кнопкой корзины
	_handleDeleteCard(evt) {
		this._cardPicture.closest('.card').remove();
	}
}