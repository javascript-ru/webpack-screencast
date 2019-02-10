import renderTemplate from '../../utils/renderTemplate';
import template from './itemList.pug';
import './item.css';

export default class {
  constructor(items) {
    this.items = items;
  }

  async render() {
    return renderTemplate(template, {
      items: this.items
    });
  }
}
