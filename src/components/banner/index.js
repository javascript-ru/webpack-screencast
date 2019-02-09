import './banner.css';
import template from './banner.pug';

export default class {
  constructor(text, link) {
    this.text = text;
    this.link = link;
  }

  async render() {
    const element = document.createElement('div');
    element.innerHTML = template({
      link: this.link,
      text: this.text
    });
    return element;
  }
}
