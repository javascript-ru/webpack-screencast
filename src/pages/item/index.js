import router from 'lib/router';
import renderTemplate from 'utils/renderTemplate';
import template from './item.pug';
import './item.css';

export default class {
  constructor(route) {
    this.id = route.replace('item/', '');
  }

  async render() {
    console.log('render item page');
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
