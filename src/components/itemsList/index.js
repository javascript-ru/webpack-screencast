import renderTemplate from 'utils/renderTemplate';
import template from './itemsList.pug';
import './itemsList.css';
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
