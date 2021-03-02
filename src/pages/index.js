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
	selectorsData
} from '../utils/constants.js'

//создания экземпляра класса для управления данными профиля
const userInfo = new UserInfo({nameSelector: nameSelector, aboutSelector: aboutSelector})

//создание экземпляра класса PopupWithForm для формы добавления фото и активация его слушателей
const popupWithAddForm = new PopupWithForm(popupWithAddFormSelector, {handleSubmit: (evt, item) => {
	evt.preventDefault();
	addCard({name: item[0], link: item[1]});
}})
popupWithAddForm.setEventListeners()

//создание экземпляра класса PopupWithForm для формы редактирования профиля и активация его слушателей
const popupWithEditForm = new PopupWithForm(popupWithEditFormSelector, {handleSubmit: (evt, item) => {
	evt.preventDefault();
	userInfo.setUserInfo({name: item[0], about: item[1]});
}, name: userInfo.getUserInfo().name, about: userInfo.getUserInfo().about})
popupWithEditForm.setEventListeners()


//создание экземпляра класса Section и добавление на страницу начальных карточек и активация его слушателей
const cardList = new Section({items: initialCards, renderer: cardRenderer}, '.places__list')
cardList.renderItems();

//функция возвращающая разметку карточки по ее данным
function cardRenderer(cardItem) {
	const card = new Card(cardItem, templateCardSelector, () => {
		const imagePopup = new PopupWithImage(popupWithImageSelector, cardItem.name, cardItem.link)
		imagePopup.open();
		imagePopup.setEventListeners();
	});
	return card.createCard();
}

//функция добавления размеченной карточки в массив cardList
function addCard(item) {
	cardList.addItem(cardRenderer(item))
} 

//функция запуска валидации на каждой форме документа
function enableValidationForms(args) {
	const formList = Array.from(document.querySelectorAll(args.formSelector));
	formList.forEach((formElement) => {
		const validator = new FormValidator(args, formElement);
		validator.enableValidation();
	})
}

//добавление слушателей на кнопки "+" и "редактировать"
editButton.addEventListener('click', () => popupWithEditForm.open());
addButton.addEventListener('click', () => popupWithAddForm.open());

//запуск лайв-валидации форм
enableValidationForms(selectorsData);