export default class Api {
  constructor(options) {
		this._authorization = options.headers.authorization;
		this._contentType = options.headers['Content-Type'];
		this._baseUrl = options.baseUrl;
  }

  getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
  		headers: {
				authorization: this._authorization,
  		}
		})
			.then(this._checkResponse)
	}
	
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
  		headers: {
				authorization: this._authorization,
  		}
		})
			.then(this._checkResponse)
	}

	updateUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
			body: JSON.stringify(data)
		})
			.then(this._checkResponse)
	}

	postNewCard(data) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
			body: JSON.stringify(data)
		})
			.then(this._checkResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
		})
			.then(this._checkResponse)
	}

	putLike(cardId) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
		})
			.then(this._checkResponse)
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
		})
			.then(this._checkResponse)
	}

	updateUserAvatar(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
			body: JSON.stringify(data)
		})
			.then(this._checkResponse)
	}

	_checkResponse(res) {
		if (res.ok) {
				return res.json();
		}
		return Promise.reject(`Ошибка ${res.status}`);
	}
}