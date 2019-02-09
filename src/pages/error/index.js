import template from './error.pug';
import './error.css';

export default class {
  constructor(route, code, text) {
    this.code = code;
    this.text = text;
  }

  async render() {
    const elem = document.createElement('div');
    elem.id = 'error-page';
    elem.innerHTML = template({
      header: 'Error!',
      message: `${this.code} - ${this.text}`
    });
    return elem;
  }
}
