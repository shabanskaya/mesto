//поиск и определние переменных для элементов кнопок "+" и "редактировать"
const editButton = document.querySelector('.profile__edit-button'); 
const addButton = document.querySelector('.profile__add-button'); 

//занесение необходимых селекторов в переменные
const nameSelector = '.profile__name'
const aboutSelector = '.profile__about'
const popupWithImageSelector = '.popup_feature_fullview'
const popupWithEditFormSelector = '.popup_feature_edit'
const popupWithAddFormSelector = '.popup_feature_add'
const templateCardSelector = '.template-card'

const selectorsData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileForm = document.querySelector(popupWithEditFormSelector).querySelector(selectorsData.formSelector);
const addForm = document.querySelector(popupWithAddFormSelector).querySelector(selectorsData.formSelector);


//данные для начальных карточек
export const initialCards = [
  {
    label: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    label: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    label: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    label: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    label: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    label: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {editButton, 
	addButton, 
	nameSelector, 
	aboutSelector, 
	popupWithImageSelector, 
	popupWithEditFormSelector, 
	popupWithAddFormSelector, 
	templateCardSelector, 
	selectorsData, 
	profileForm, 
	addForm
};