const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_feature_edit');
const closeButtonEditForm = popupEdit.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = popupEdit.querySelector('.popup__input_content_name');
const jobInput = popupEdit.querySelector('.popup__input_content_job');
const editFormElement = popupEdit.querySelector('.popup__form');

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_feature_add');
const closeButtonAddForm = popupAdd.querySelector('.popup__close-button');
const labelInput = popupAdd.querySelector('.popup__input_content_label');
const linkInput = popupAdd.querySelector('.popup__input_content_link');
const addFormElement = popupAdd.querySelector('.popup__form');

const popupImage = document.querySelector('.full-pic-popup');
const closeButtonImage = popupImage.querySelector('.full-pic-popup__close-button');

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
	popupImage.classList.remove('full-pic-popup_opened');
}

function handleEditFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = jobInput.value;
	closePopup();
}

function handleAddFormSubmit(evt) {
	evt.preventDefault();
	const item = {name: '', link: ''};
	item.name = labelInput.value;
	item.link = linkInput.value;
	addCard(item)
	closePopup();
}

function addInitial() {
	initialCards.forEach(addCard);
}

function addCard(item) {
	const card = templateCard.cloneNode(true);
	card.querySelector('.card__title').textContent = item.name;
	const pic = card.querySelector('.card__pic');
	pic.setAttribute('src', item.link);
	pic.setAttribute('alt', item.name);
	card.querySelector('.card__like').addEventListener('click', like);
	card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
	pic.addEventListener('click', openPopupImage);
	list.prepend(card);
}

function openPopupImage(evt) {
	popupImage.classList.add('full-pic-popup_opened');
	const link = evt.target.getAttribute('src');
	const label = evt.target.closest('.card').querySelector('.card__title').textContent;
	popupImage.querySelector('.full-pic-popup__subtitle').textContent = label
	popupImage.querySelector('.full-pic-popup__pic').setAttribute('src', link)
	popupImage.querySelector('.full-pic-popup__pic').setAttribute('alt', label)
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


addInitial();

editButton.addEventListener('click', openPopupEdit);
closeButtonEditForm.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', openPopupAdd);
closeButtonAddForm.addEventListener('click', closePopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);

closeButtonImage.addEventListener('click', closePopup);