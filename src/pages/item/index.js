import renderTemplate from '../../utils/renderTemplate';
import template from './item.pug';
import './item.css';
import renderPage from '../../utils/renderPage';
import '../../common';

class ItemPage {
  constructor() {
    this.id = new URLSearchParams(window.location.search).get('id');
  }

  async render() {
    let allItems = await fetch('/items.json');
    allItems = await allItems.json();

    const item = allItems.find(item => this.id === item.id);
    if (!item) {
      window.location.assign('/error.html');
      return;
    }

    return renderTemplate(template, {
      item
    });
  }
}

renderPage(ItemPage);
