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

//поиск и определние переменных для просмотра фото
const popupImage = document.querySelector('.popup_feature_fullview'); 
const closeButtonImage = popupImage.querySelector('.popup__close-button');
const imageSubtitle = popupImage.querySelector('.popup__subtitle');
const previewPic = popupImage.querySelector('.popup__pic');

const placesWrap = document.querySelector('.places__list'); //контейнер с карточками
const templateCard = document.querySelector('.template-card').content; //шаблон карточки


//функции для управления попапами
function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
}


//функции для обработки событий с формой редактирования профиля
function handleEditFormOpen() {
	openPopup(popupEdit);
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = jobInput.value;
	closePopup(popupEdit);
}

function handleClosePopup(evt) {
	closePopup(evt.target.closest('.popup'))
}


//функции для обработки событий с формой добавления фотографии
function handleAddFormOpen() {
	openPopup(popupAdd);
}

function handleAddFormSubmit(evt) {
	evt.preventDefault();
	const item = {name: '', link: ''};
	item.name = labelInput.value;
	item.link = linkInput.value;
	addCard(item, placesWrap);
	addFormElement.reset();
	closePopup(popupAdd);
}


//добавление начальных карточек
function addInitial() {
	initialCards.forEach((item) => {
		addCard(item, placesWrap);
	});
}

function addCard(item, wrap) {
	wrap.prepend(createCard(item));
}

//функция создающая разметку карточки по заданным данным
function createCard(item) {
	const card = templateCard.cloneNode(true);
	const pic = card.querySelector('.card__pic');
	const likeButton = card.querySelector('.card__like');
	const trash = card.querySelector('.card__delete-button');
	const title = card.querySelector('.card__title');
	pic.src = item.link;
	pic.alt = item.name;
	title.textContent = item.name;
	likeButton.addEventListener('click', handleLikeButton);
	trash.addEventListener('click', handleDeleteCard);
	pic.addEventListener('click', () => handlePopupImagePreview(item));
	return card;
}


//функции для обработки событий с попапом просмотра отдельного фото, закрытие выше
function handlePopupImagePreview(item) {
	openPopup(popupImage);
	imageSubtitle.textContent = item.name
	previewPic.src = item.link;
	previewPic.alt = item.name;
}


//функции дляобработки собятий с кномнами на карточках
function handleDeleteCard(evt) {
	evt.target.closest('.card').remove();
}

function handleLikeButton(evt) {
	evt.target.classList.toggle('card__like_active');
}


addInitial();

editButton.addEventListener('click', handleEditFormOpen);
closeButtonEditForm.addEventListener('click', handleClosePopup);
editFormElement.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', handleAddFormOpen);
closeButtonAddForm.addEventListener('click', handleClosePopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);

closeButtonImage.addEventListener('click', handleClosePopup);