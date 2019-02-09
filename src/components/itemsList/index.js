import template from './itemList.pug';
import './item.css';

export default class {
  constructor(items) {
    this.items = items;
  }

  getPreparedItems() {
    return this.items.map(({label, id, price}) => ({
      label,
      price: `$ ${price}`,
      link: `/item/${id}`,
      img: `/assets/items/${id}.png`
    }));
  }

  async render() {
    const elem = document.createElement('div');
    elem.classList.add('item-list');
    elem.innerHTML = template({
      items: this.getPreparedItems()
    });
    return elem;
  }
}
