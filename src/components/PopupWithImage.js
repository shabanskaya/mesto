import Popup from './Popup.js'

//класс попапа с картинкой
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._imageSubtitle = this._popup.querySelector('.popup__subtitle');
		this._previewPic = this._popup.querySelector('.popup__pic');
	}

	//метод открытия попапа с картинкой, заполняющий данные для него
	open(name, link) {
		this._imageSubtitle.textContent = name
		this._previewPic.src = link;
		this._previewPic.alt = name;
		super.open()
	}

	//метод отменяющий всплытие клика для контейнера картинки
	_stopPropagationOnContainers() {
		this._popup.querySelector('.popup__pic-container').addEventListener('click', (evt) => evt.stopPropagation())
	}
}
