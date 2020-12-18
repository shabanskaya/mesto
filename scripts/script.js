let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let nameInput = document.querySelector('.popup__input_content_name');
let jobInput = document.querySelector('.popup__input_content_job');
let formElement = document.querySelector('.popup__container');

function openPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = jobInput.value;
	closePopup()
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 