import template from './itemList.pug';
import renderTemplate from '../../utils/renderTemplate';

import './item.css';

export default class {
  constructor(items) {
    this.items = items;
  }

  // TODO: make in template
  getPreparedItems() {
    return this.items.map(({label, id, price}) => ({
      label,
      price: `$ ${price}`,
      link: `/item/${id}`,
      img: `/assets/items/${id}.png`
    }));
  }

  async render() {
    return renderTemplate(template, {
      items: this.items
    });
  }
}
