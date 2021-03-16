export default class Section {
	constructor({renderer}, containerSelector, userId) {
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
		this._userId = userId;
	}

	//метод добаления заданного элемента в конейнер класса
	addItem(element) {
		this._container.prepend(element);
	}

	//метод отрисовки размеченных элементов в DOM
	renderItems(items) {
		items.forEach((item) => {
			this.addItem(this._renderer(item, this._userId));
		})	
	}
}