import renderTemplate from '../../utils/renderTemplate';
import ItemsList from '../../components/itemsList';
import template from './main.pug';
import './main.css';
import renderPage from '../../utils/renderPage';
import '../../common';

class MainPage {
  async render() {
    let allItems = await fetch('/items.json');
    allItems = await allItems.json();

    const elem = renderTemplate(template, {
      title: 'Framework shop!',
      banners: [
        {
          text: 'Buy only from us, everything is free'
        },
        {
          link: '/items-list.html',
          text: 'See all frameworks'
        }
      ]
    });

    const itemsList = new ItemsList(allItems.slice(0, 5));
    elem.appendChild(await itemsList.render());

    return elem;
  }
}

renderPage(MainPage);
