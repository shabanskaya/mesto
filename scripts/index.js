import Card from './Card.js';
import {initialCards} from './initial-cards.js';
import FormValidator from './FormValidator.js';

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


const placesWrap = document.querySelector('.places__list'); //контейнер с карточками

//поиск оверлеев попапов
const popupsArray = Array.from(document.querySelectorAll('.popup'));
//поиск контейнеров, чтобы остановить всплытие с них
const popupContainersArray = Array.from(document.querySelectorAll('.popup__container'));
const popupPicContainersArray = Array.from(document.querySelectorAll('.popup__pic-container'));

const selectorsData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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

//добавление начальных значений формы при загрузке страницы
function addInitialValues() {
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}

//функция запуска валидации на каждой форме документа
function enableValidationForms(args) {
	const formList = Array.from(document.querySelectorAll(args.formSelector));
	formList.forEach((formElement) => {
		const validator = new FormValidator(args, formElement);
		validator.enableValidation();
	})
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

//запуск валидации на всех формах документа
enableValidationForms({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});