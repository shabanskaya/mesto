//import { popupWithEditFormSelector } from "../utils/constants";

export default class Card {
	constructor(data, templateSelector, myId, handlers) {
		this._link = data.link;
		this._label = data.name;
		this._likes = data.likes;
		this._owner = data.owner._id
		this._templateSelector = templateSelector;
		this._handlePopupImagePreview = handlers.handlePopupImagePreview;
		this._handlePopupConfirm = handlers.handlePopupConfirm;
		this._myId = myId;
		this._id = data._id;
		this._handleLikeButton = handlers.handleLikeButton;
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
		this._cardLikes = this._element.querySelector('.card__likes')
		this._cardPicture.src = this._link;
		this._cardPicture.alt = this._label;
		this._cardTitle.textContent = this._label;
		this._cardLikes.textContent = this._likes.length;
		this._putTrash(this._owner, this._myId)
		this._setEventListeners()
		if (this._likes.some((elem) => elem._id == this._myId)) this._likeButton.classList.add('card__like_active');
		return this._element;
	}

	//метод, устанавливающий слушателей события на карточку
	_setEventListeners() {
		this._likeButton = this._element.querySelector('.card__like');
		

		this._likeButton.addEventListener('click', () => {
			//this._likeButton.classList.toggle('card__like_active');
			this._handleLikeButton(this._likeButton, this._cardLikes);
		});
		
		this._cardPicture.addEventListener('click', () => {
			this._handlePopupImagePreview();
		});
	}

	//метод управления кнопкой корзины
	handleDeleteCard(evt) {
		this._cardPicture.closest('.card').remove();
	}

	_putTrash(myId, ownerId) {
		if (myId == ownerId) {
			this._element.insertAdjacentHTML('beforeend', '<button class="card__delete-button" aria-label="Удалить" type="button"></button>')
			this._trashButton = this._element.querySelector('.card__delete-button');
			this._trashButton.addEventListener('click', () => {
				this._handlePopupConfirm(this, this._id);
			});
			
		}
		
	}
}