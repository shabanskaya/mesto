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
			.then((res) => {
				if (res.ok) {return res.json()}
				else {return Promise.reject(`Ошибка: ${res.status}`)}
			})
			.catch((err) => {console.log(err)}); 
	}
	
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
  		headers: {
				authorization: this._authorization,
  		}
		})
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`)
			})
			.catch((err)=>console.log(err))
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
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch(err => console.log(err)) 
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
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch(err => console.log(err));
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
		})
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch(err => console.log(err));
	}

	putLike(cardId) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
		})
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch(err => console.log(err));
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._authorization,
				'Content-Type': this._contentType
			},
		})
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch(err => console.log(err));
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
			.then((res) => {
				if (res.ok) return res.json();
				else return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch(err => console.log(err)) 
	}
}