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

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
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
	selectorsData
};