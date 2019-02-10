import ItemsList from '../../components/itemsList';

export default class {
  async render() {
    let allItems = await fetch('/items.json');
    allItems = await allItems.json();

    const elem = document.createElement('div');

    elem.appendChild(await new ItemsList(allItems).render());

    return elem;
  }
}
