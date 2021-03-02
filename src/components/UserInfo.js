export default class UserInfo {
	constructor({nameSelector, aboutSelector}) {
		this._name = document.querySelector(nameSelector);
		this._about = document.querySelector(aboutSelector);
	}
	
	//метод для получения данных пользователя со страницы
	getUserInfo() {
		return {name: this._name.textContent, about: this._about.textContent};
	}

	//метод для установки данных пользователя на сранице
	setUserInfo(info) {
		this._name.textContent = info.name;
		this._about.textContent = info.about
	}
}