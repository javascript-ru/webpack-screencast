import ItemsList from '../../components/itemsList';

export default class {
  async render() {
    const requestedItems = await fetch('/assets/items.json');
    const items = await requestedItems.json();

    const elem = document.createElement('div');
    elem.id = 'list';
    const itemsList = new ItemsList(items);
    elem.appendChild(await itemsList.render());
    return elem;
  }
}
