import ItemsList from '../../components/itemsList';
import template from './main.pug';
import './main.css';

export default class {
  async render() {
    const requestedItems = await fetch('/assets/items.json');
    const items = await requestedItems.json();

    const elem = document.createElement('div');
    elem.id = 'main';
    elem.innerHTML = template({
      title: 'Framework shop!',
      firstBanner: 'Buy only from us, everything is free',
      secondBanner: 'See all frameworks',
      link: '/list'
    });
    const itemsList = new ItemsList(items.slice(0, 5));
    elem.appendChild(await itemsList.render());
    return elem;
  }
}
