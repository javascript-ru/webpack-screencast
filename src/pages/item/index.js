import router from 'lib/router';
import template from './item.pug';
import './item.css';

export default class {
  constructor(route) {
    this.id = route.replace('item/', '');
  }

  async render() {
    let allItems = await fetch('/assets/items.json');
    allItems = await allItems.json();

    const item = allItems.find(item => this.id === item.id);
    if (!item) {
      router.notFoundHandler();
      return;
    }

    const elem = document.createElement('div');
    elem.id = 'item-page';
    elem.innerHTML = template({
      item,
      // todo: move to template
      img: `/assets/items/${this.id}.png`
    });
    return elem;
  }
}
