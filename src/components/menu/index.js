import moment from 'moment';
import template from './menu.pug';
import './menu.css';

export default class {
  constructor(menuItems) {
    this.menuItems = menuItems;
  }

  async render() {
    const element = document.createElement('div');
    element.innerHTML = template({
      items: this.menuItems,
      date: moment().format('DD MMMM YYYY')
    });
    return element;
  }
}
