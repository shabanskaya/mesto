import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import {
	initialCards, 
	editButton, 
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
} from '../utils/constants.js'

//запуска валидации на каждой форме документа
const profileValidator = new FormValidator(selectorsData, profileForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(selectorsData, addForm);
addCardValidator.enableValidation(); 

//создания экземпляра класса для управления данными профиля
const userInfo = new UserInfo({nameSelector: nameSelector, aboutSelector: aboutSelector})

//создание экземпляра класса PopupWithForm для формы добавления фото и активация его слушателей
const popupWithAddForm = new PopupWithForm(popupWithAddFormSelector, {handleSubmit: (item) => {
	addCard(item);
}, hideAllErrors: (list) => addCardValidator.hideAllErrors(list)})
popupWithAddForm.setEventListeners()

//создание экземпляра класса PopupWithForm для формы редактирования профиля и активация его слушателей
const popupWithEditForm = new PopupWithForm(popupWithEditFormSelector, {
	handleSubmit: (item) => {
		userInfo.setUserInfo(item);
	}, 
	hideAllErrors: (list) => profileValidator.hideAllErrors(list)
})
popupWithEditForm.setEventListeners()


//создание экземпляра класса Section и добавление на страницу начальных карточек и активация его слушателей
const cardList = new Section({items: initialCards, renderer: cardRenderer}, '.places__list')
cardList.renderItems();

//создание экземпляра класса PopupWithImage для показа фото и активация его слушателей
const imagePopup = new PopupWithImage(popupWithImageSelector)
imagePopup.setEventListeners();

//функция возвращающая разметку карточки по ее данным
function cardRenderer(cardItem) {
	const card = new Card(cardItem, templateCardSelector, () => {imagePopup.open(cardItem.label, cardItem.link);});
	return card.createCard();
}

//функция добавления размеченной карточки в массив cardList
function addCard(item) {
	cardList.addItem(cardRenderer(item))
} 




//добавление слушателей на кнопки "+" и "редактировать"
editButton.addEventListener('click', () => popupWithEditForm.open(userInfo.getUserInfo()));
addButton.addEventListener('click', () => popupWithAddForm.open());

//запуск лайв-валидации форм
//enableValidationForms(selectorsData);