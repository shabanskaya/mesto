let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
	let popup = document.querySelector('.popup');
	let profileName = document.querySelector('.profile__name');
	let profileAbout = document.querySelector('.profile__about');
	let nameInput = document.querySelector('.popup__name');
	let jobInput = document.querySelector('.popup__about');
	popup.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}

function closePopup() {
	let popup = document.querySelector('.popup');
	let profileName = document.querySelector('.profile__name');
	let profileAbout = document.querySelector('.profile__about');
	let nameInput = document.querySelector('.popup__name');
	let jobInput = document.querySelector('.popup__about');
	popup.classList.remove('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileAbout.textContent;
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__container');

function handleFormSubmit(evt) {
	evt.preventDefault();
	
	let nameInput = document.querySelector('.popup__name');
	let jobInput = document.querySelector('.popup__about');

	let newName = nameInput.value
	let newJob = jobInput.value

	let profileName = document.querySelector('.profile__name');
	let profileAbout = document.querySelector('.profile__about');

	profileName.textContent = newName;
	profileAbout.textContent = newJob;

	closePopup()
}

formElement.addEventListener('submit', handleFormSubmit); 