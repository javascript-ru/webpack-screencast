import ItemsList from '../../components/itemsList';
import renderPage from '../../utils/renderPage';
import '../../common';

class ItemsListPage {
  async render() {
    let allItems = await fetch('/items.json');
    allItems = await allItems.json();

    const elem = document.createElement('div');

    elem.appendChild(await new ItemsList(allItems).render());

    return elem;
  }
}

renderPage(ItemsListPage);
