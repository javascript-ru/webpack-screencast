import renderTemplate from '../../utils/renderTemplate';
import template from './error.pug';
import './error.css';

export default class {
  constructor(route, code, text) {
    this.code = code;
    this.text = text;
  }

  async render() {
    return renderTemplate(template, {
      header: 'Error!',
      message: `${this.code} - ${this.text}`
    });
  }
}
