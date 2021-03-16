import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

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
	addForm,
	popupWithAvatarFormSelector,
	avatarForm,
	avatarButton, 
  profileSaveButton, 
  addSaveButton, 
	avatarSaveButton,
	imageSelector
} from '../utils/constants.js'

//создания экземпляра класса для доступа к API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '1cd62782-b164-46da-a535-37873cfea4cf',
    'Content-Type': 'application/json'
  }
});

//функция для включения загрузки на кнопках форм в процессе обращения в серверу
function loading(isLoading, button, originalText) {
	if(isLoading) {
		button.textContent = "Сохранение...";
	} else {
		button.textContent = originalText;
	}
}

//запуска валидации на каждой форме документа
const profileValidator = new FormValidator(selectorsData, profileForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(selectorsData, addForm);
addCardValidator.enableValidation(); 

const avatarValidator = new FormValidator(selectorsData, avatarForm);
avatarValidator.enableValidation();


//создания экземпляра класса для управления данными профиля
const userInfo = new UserInfo({nameSelector: nameSelector, aboutSelector: aboutSelector, imageSelector: imageSelector})


//создание экземпляра класса PopupWithForm для формы редактирования аватара и активация его слушателей
const popupWithAvatarForm = new PopupWithForm(popupWithAvatarFormSelector, {
	handleSubmit: (item) => {
		loading(true, avatarSaveButton, 'Сохранить')
		userInfo.setUserAva(item);
		api.updateUserAvatar(item)
			.finally((res)=>{				
				loading(false, avatarSaveButton, 'Сохранить');
			});
	},
	hideAllErrors: () => avatarValidator.hideAllErrors()
})
popupWithAvatarForm.setEventListeners()

//создание экземпляра класса PopupWithForm для формы редактирования профиля и активация его слушателей
const popupWithEditForm = new PopupWithForm(popupWithEditFormSelector, {
	handleSubmit: (item) => {
		loading(true, profileSaveButton, 'Сохранить')
		userInfo.setUserInfo(item);
		api.updateUserInfo(item)
			.finally((res)=>{				
				loading(false, profileSaveButton, 'Сохранить');
			});
	}, 
	hideAllErrors: (list) => profileValidator.hideAllErrors()
})
popupWithEditForm.setEventListeners()


//запрос для получения данных текущего пользователя
api.getUserInfo()
	.then((dataOfUser) => {
		//установка начальных аватара, имени и описания профиля с сервера
		userInfo.setUserInfo(dataOfUser);
		userInfo.setUserAva(dataOfUser);

		//функция возвращающая разметку карточки по ее данным
		function cardRenderer(cardItem, userId) {
				//создание экзмемпляра класса карточки 
				const card = new Card(
					cardItem, 
					templateCardSelector,
					userId,
					{handlePopupImagePreview: () => {imagePopup.open(cardItem.name, cardItem.link);}, 
					handlePopupConfirm: (cardElem, cardId) => {popupWithConfirmForm.open(cardElem, cardId)},  
					//функция для управления кнопкой лайка в экземпляре класса Card:
					handleLikeButton: (likeButton, likes) => {
						if (!likeButton.classList.contains('card__like_active')) {
							api.putLike(cardItem._id).then((res) => {
								likes.textContent = res.likes.length
							})
						} else {
							api.deleteLike(cardItem._id).then((res) => {
								likes.textContent = res.likes.length
							})
						}
						likeButton.classList.toggle('card__like_active')
					}}
				);
				return card.createCard();
		}

		//функция добавления размеченной карточки в массив cardList
		function addCard(item, cardList, id) {
			cardList.addItem(cardRenderer(item, id))
		} 

		//создание экземпляра класса Section
		const cardList = new Section({renderer: cardRenderer}, '.places__list', dataOfUser._id)

		//добавление на страницу начальных карточек
		api.getInitialCards()
			.then((data) => {cardList.renderItems(data.reverse())})

		//создание экземпляра класса PopupWithForm для формы добавления фото и активация его слушателей
		const popupWithAddForm = new PopupWithForm(popupWithAddFormSelector, {handleSubmit: (item) => {
			loading(true, addSaveButton, 'Cоздать')
			api.postNewCard(item)
				.then( (res) => {addCard(res, cardList, dataOfUser._id)} )
				.finally((res)=>{				
					loading(false, addSaveButton, 'Создать');
				});
		}, hideAllErrors: () => addCardValidator.hideAllErrors()})
		popupWithAddForm.setEventListeners()
		
		//создание слушателя на кнопке "+"
		addButton.addEventListener('click', () => popupWithAddForm.open());
	})


//создание экземпляра класса PopupWithForm для формы подтверждения удаления фото. Активация его слушателей.
const popupWithConfirmForm = new PopupWithForm('.popup_feature_confirm', {
	handleSubmit: (temp, openCard, cardId) => {
		openCard.handleDeleteCard();
		api.deleteCard(cardId);
	}, hideAllErrors: ()=>{}
})
popupWithConfirmForm.setEventListeners()


//создание экземпляра класса PopupWithImage для показа фото и активация его слушателей
const imagePopup = new PopupWithImage(popupWithImageSelector)
imagePopup.setEventListeners();


//добавление слушателей на кнопки "аватар" и "редактировать"
editButton.addEventListener('click', () => popupWithEditForm.open(userInfo.getUserInfo()));
avatarButton.addEventListener('click', () => popupWithAvatarForm.open())

