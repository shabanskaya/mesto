export default class UserInfo {
	constructor({nameSelector, aboutSelector, imageSelector}) {
		this._name = document.querySelector(nameSelector);
		this._job = document.querySelector(aboutSelector);
		this._ava = document.querySelector(imageSelector)
	}
	
	//метод для получения данных пользователя со страницы
	getUserInfo() {
		return {name: this._name.textContent, about: this._job.textContent, avatar: this._ava.src};
	}

	//метод для установки данных пользователя на сранице
	setUserInfo(info) {
		this._name.textContent = info.name;
		this._job.textContent = info.about;
	}
	setUserAva(info) {
		this._ava.src = info.avatar
	}
}