import Popup from './Popup.js'
const popupImage = document.querySelector('.popup_feature_fullview'); 
const imageSubtitle = popupImage.querySelector('.popup__subtitle');
const previewPic = popupImage.querySelector('.popup__pic');
const picContainerSelector = '.popup__pic-container'

//класс попапа с картинкой
export default class PopupWithImage extends Popup {
	constructor(popupSelector, name, link) {
		super(popupSelector);
		this._name = name;
		this._link = link;
	}

	//метод открытия попапа с картинкой, заполняющий данные для него
	open() {
		imageSubtitle.textContent = this._name
		previewPic.src = this._link;
		previewPic.alt = this._name;
		super.open()
	}

	//метод отменяющий всплытие клика для контейнера картинки
	_stopPropagationOnContainers() {
		this._popup.querySelector(picContainerSelector).addEventListener('click', (evt) => evt.stopPropagation())
	}
}
