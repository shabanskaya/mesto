export default class Section {
	constructor({items, renderer}, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	//метод добаления заданного элемента в конейнер класса
	addItem(element) {
		this._container.prepend(element);
	}

	//метод отрисовки размеченных элементов в DOM
	renderItems() {
		this._items.forEach((item) => {
			this.addItem(this._renderer(item));
		})	
	}
}