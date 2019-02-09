import ItemsList from '../../components/itemsList';

export default async function ItemsListPage() {
  const requestedItems = await fetch('/assets/items.json');
  const items = await requestedItems.json();

  const divElement = document.createElement('div');
  divElement.id = 'list';
  divElement.appendChild(new ItemsList(items).render());
  return divElement;
}
