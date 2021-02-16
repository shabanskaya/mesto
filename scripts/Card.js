export default class Card {
	constructor(data, templateSelector) {
		this._link = data.link;
		this._name = data.name;
		this._templateSelector = templateSelector;
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

	//метод управления кликом по карточке
	_handlePopupImagePreview() {
		this._popupImage = document.querySelector('.popup_feature_fullview'); 
		this._imageSubtitle = this._popupImage.querySelector('.popup__subtitle');
		this._previewPic = this._popupImage.querySelector('.popup__pic');
		this._imageSubtitle.textContent = this._name
		this._previewPic.src = this._link;
		this._previewPic.alt = this._name;
		this._openPopup();
	}

	//метод закрытия попапа по кнопке эскейп
	_closePopupOnEsc(evt) {
		if (evt.key == 'Escape') {
			this._closePopup();
		};
	}

	//метод для закрытия попапа картинки по эскейпу
	_closePopup() {
		this._popupImage.classList.remove('popup_opened');
		document.removeEventListener('keydown', () => {this._closePopupOnEsc});
	}

	//метод для открытия попапа
	_openPopup(popup) {
		this._popupImage.classList.add('popup_opened');
		document.addEventListener('keydown', (evt) => {
			this._closePopupOnEsc(evt);
		});
	}
}

