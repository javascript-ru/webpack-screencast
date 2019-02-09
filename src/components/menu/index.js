import moment from 'moment';
import './menu.css';
import template from './menu.pug';

export default class {
  constructor(menuItems) {
    this.menuItems = menuItems;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = template({
      items: this.menuItems,
      date: moment().format('MMMM')
    });
    return element;
  }
}
