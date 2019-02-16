import renderTemplate from '../../utils/renderTemplate';
import template from './error.pug';
import './error.css';
import router from 'lib/router';

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

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    router.refresh();
  });
}
/* eslint-enable no-undef */
