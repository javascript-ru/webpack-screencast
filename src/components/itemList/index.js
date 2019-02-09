import Router from 'lib/router';
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

  render() {
    const element = document.createElement('div');
    element.innerHTML = template({
      items: this.getPreparedItems()
    });
    return element;
  }
}
