import template from './title.pug';
import './title.css';

export default class {
  constructor(text) {
    this.text = text;
  }

  async render() {
    const element = document.createElement('div');
    element.innerHTML = template({
      text: this.text
    });
    return element;
  }
}
