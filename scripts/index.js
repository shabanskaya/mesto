class Card {
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
		document.removeEventListener('keydown', closePopupOnEsc);
	}

	//метод для открытия попапа
	_openPopup(popup) {
		this._popupImage.classList.add('popup_opened');
		document.addEventListener('keydown', (evt) => {
			this._closePopupOnEsc(evt);
		});
	}
}


//поиск и определние переменных для формы редактирования профиля 
const editButton = document.querySelector('.profile__edit-button'); 
const popupEdit = document.querySelector('.popup_feature_edit');
const closeButtonEditForm = popupEdit.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = popupEdit.querySelector('.popup__input_content_name');
const jobInput = popupEdit.querySelector('.popup__input_content_job');
const editFormElement = popupEdit.querySelector('.popup__form');

//поиск и определние переменных для формы добавления карточки
const addButton = document.querySelector('.profile__add-button'); 
const popupAdd = document.querySelector('.popup_feature_add');
const closeButtonAddForm = popupAdd.querySelector('.popup__close-button');
const labelInput = popupAdd.querySelector('.popup__input_content_label');
const linkInput = popupAdd.querySelector('.popup__input_content_link');
const addFormElement = popupAdd.querySelector('.popup__form');
const saveButtonAtAddForm = popupAdd.querySelector('.popup__save-button')

//поиск и определние переменных для просмотра фото
const popupImage = document.querySelector('.popup_feature_fullview'); 
const closeButtonImage = popupImage.querySelector('.popup__close-button');
const imageSubtitle = popupImage.querySelector('.popup__subtitle');
const previewPic = popupImage.querySelector('.popup__pic');

const placesWrap = document.querySelector('.places__list'); //контейнер с карточками
const templateCard = document.querySelector('.template-card').content; //шаблон карточки!!!!!!!!!!!!!!!!!!!!!!!

//поиск оверлеев попапов
const popupsArray = Array.from(document.querySelectorAll('.popup'));
//поиск контейнеров, чтобы остановить всплытие с них
const popupContainersArray = Array.from(document.querySelectorAll('.popup__container'));
const popupPicContainersArray = Array.from(document.querySelectorAll('.popup__pic-container'));


//функция остановки всплытия события клика по контейнеру попапа на его оверлей
function stopPropagationOnContainers(popupContainersArray) {
	popupContainersArray.forEach((popupContainer) => {
		popupContainer.addEventListener('click', (evt) => evt.stopPropagation());
	});
}

//функция закрытия попапа по клику на оверлей
function setListenersOnOverlay(popupsArray) {
	popupsArray.forEach((popup) => {
		popup.addEventListener('click', ()=> closePopup(popup));
	});
}

//функция закрытия попапа по кнопке эскейп
function closePopupOnEsc(evt) {
	if (evt.key == 'Escape') {
		closePopup(document.querySelector('.popup_opened'));
	};
}

//функции для управления попапами
function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupOnEsc);
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupOnEsc);
}


//функции для обработки событий с формой редактирования профиля
function handleEditFormOpen() {
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
	openPopup(popupEdit);
}

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = jobInput.value;
	closePopup(popupEdit);
}


//функции для обработки событий с формой добавления фотографии


function handleAddFormSubmit(evt) {
	evt.preventDefault();
	addCard({name: labelInput.value, link: linkInput.value}, placesWrap);
	addFormElement.reset();
	saveButtonAtAddForm.classList.add('popup__save-button_disabled');
	saveButtonAtAddForm.setAttribute('disabled', 'disabled');
	closePopup(popupAdd);
}


//добавление начальных карточек
function addInitial() {
	initialCards.forEach((item) => {
		addCard(item, placesWrap);	
	});
}

function addCard(item, wrap) {
	const card = new Card(item, '.template-card');
	//wrap.prepend(createCard(item));
	wrap.prepend(card.createCard());
}

//функция создающая разметку карточки по заданным данным
/* function createCard(item) {
	const card = templateCard.cloneNode(true);
	const cardPicture = card.querySelector('.card__pic');
	const likeButton = card.querySelector('.card__like');
	const trashButton = card.querySelector('.card__delete-button');
	const cardTitle = card.querySelector('.card__title');
	cardPicture.src = item.link;
	cardPicture.alt = item.name;
	cardTitle.textContent = item.name;
	likeButton.addEventListener('click', handleLikeButton);
	trashButton.addEventListener('click', handleDeleteCard);
	cardPicture.addEventListener('click', () => handlePopupImagePreview(item));
	return card;
} */

/* 
//функции для обработки событий с попапом просмотра отдельного фото, закрытие выше
function handlePopupImagePreview(item) {
	imageSubtitle.textContent = item.name
	previewPic.src = item.link;
	previewPic.alt = item.name;
	openPopup(popupImage);
} */


//функции дляобработки собятий с кномнами на карточках
/* function handleDeleteCard(evt) {
	evt.target.closest('.card').remove();
} */

/* function handleLikeButton(evt) {
	evt.target.classList.toggle('card__like_active');
} */

//добавление начальных значений формы при загрузке страницы
function addInitialValues() {
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}


addInitial();
addInitialValues();

setListenersOnOverlay(popupsArray);
stopPropagationOnContainers(popupContainersArray);
stopPropagationOnContainers(popupPicContainersArray);


editButton.addEventListener('click', handleEditFormOpen);
closeButtonEditForm.addEventListener('click', () => closePopup(popupEdit));
editFormElement.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonAddForm.addEventListener('click', () => closePopup(popupAdd));
addFormElement.addEventListener('submit', handleAddFormSubmit);

closeButtonImage.addEventListener('click', () => closePopup(popupImage));


