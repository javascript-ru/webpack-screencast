import router from 'lib/router';
import template from './item.pug';
import './item.css';

export default class {
  constructor (route) {
    this.id = route.replace('item/', '');
  }

  async render() {
    const requestedItems = await fetch('/assets/items.json');
    const items = await requestedItems.json();

    const item = items.find(({id: itemId}) => this.id === itemId);
    if (!item) router.fallbackHandler();

    const elem = document.createElement('div');
    elem.id = 'item-page';
    elem.innerHTML = template({
      ...item,
      img: `/assets/items/${this.id}.png`
    });
    return elem;
  }
}