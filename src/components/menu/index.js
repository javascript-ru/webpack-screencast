import moment from 'moment';
import renderTemplate from '../../utils/renderTemplate';
import template from './menu.pug';
import './menu.css';

export default class {
  constructor(menuItems) {
    moment.locale(LANG); // eslint-disable-line no-undef
    this.menuItems = menuItems;
  }

  async render() {
    return renderTemplate(template, {
      items: this.menuItems,
      date: moment().format('DD MMMM YYYY')
    });
  }
}
