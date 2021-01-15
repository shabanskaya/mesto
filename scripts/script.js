let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup_feature_edit');
let closeButtonEditForm = popupEdit.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let nameInput = popupEdit.querySelector('.popup__input_content_name');
let jobInput = popupEdit.querySelector('.popup__input_content_job');
let editFormElement = popupEdit.querySelector('.popup__form');

let addButton = document.querySelector('.profile__add-button');
let popupAdd = document.querySelector('.popup_feature_add');
let closeButtonAddForm = popupAdd.querySelector('.popup__close-button');
let labelInput = popupAdd.querySelector('.popup__input_content_label');
let linkInput = popupAdd.querySelector('.popup__input_content_link');
let addFormElement = popupAdd.querySelector('.popup__form');



const initialCards = [
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

const list = document.querySelector('.places__list');
const templateCard = document.querySelector('.template-card').content;

function openPopupEdit() {
	popupEdit.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}

function closePopup() {
	popupEdit.classList.remove('popup_opened');
	popupAdd.classList.remove('popup_opened');
	labelInput.value = "";
	linkInput.value = "";
}

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = jobInput.value;
	closePopup();
}

function handleAddFormSubmit(evt) {
	evt.preventDefault();
	let item = {name: '', link: ''};
	item.name = labelInput.value;
	item.link = linkInput.value;
	addCard(item)
	closePopup();
}

function initialAdd() {
	initialCards.forEach(addCard);
}

function addCard(item) {
	let card = templateCard.cloneNode(true);
	card.querySelector('.card__title').textContent = item.name;
	card.querySelector('.card__pic').setAttribute('src', item.link);
	card.querySelector('.card__pic').setAttribute('alt', item.name);
	card.querySelector('.card__like').addEventListener('click', like);
	card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
	list.prepend(card);
}

function deleteCard(evt) {
	evt.target.closest('.card').remove();
}

function openPopupAdd() {
	popupAdd.classList.add('popup_opened')
}

function like(evt) {
	console.log('was liked');
	evt.target.classList.toggle('card__like_active');
}

initialAdd();

editButton.addEventListener('click', openPopupEdit);
closeButtonEditForm.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', openPopupAdd);
closeButtonAddForm.addEventListener('click', closePopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);