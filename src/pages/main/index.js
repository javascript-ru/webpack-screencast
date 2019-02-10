import renderTemplate from '../../utils/renderTemplate';
import ItemsList from '../../components/itemsList';
import template from './main.pug';
import './main.css';

export default class {
  async render() {
    const requestedItems = await fetch('/assets/items.json');
    const items = await requestedItems.json();

    const elem = renderTemplate(template, {
      title: 'Framework shop!',
      banners: [
        {
          text: 'Buy only from us, everything is free'
        },
        {
          link: '/list',
          text: 'See all frameworks'
        }
      ]
    });
    const itemsList = new ItemsList(items.slice(0, 5));
    elem.appendChild(await itemsList.render());
    return elem;
  }
}
