import router from 'lib/router';
import renderTemplate from '../../utils/renderTemplate';
import template from './item.pug';
import './item.css';

export default class {
  constructor(route) {
    this.id = route.replace('item/', '');
  }

  async render() {
    let allItems = await fetch('/items.json');
    allItems = await allItems.json();

    const item = allItems.find(item => this.id === item.id);
    if (!item) {
      router.notFoundHandler();
      return;
    }

    return renderTemplate(template, {
      item
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
