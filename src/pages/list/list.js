import {ItemsList} from '../../components';

export default async () => {
  const requestedItems = await fetch('/assets/items.json');
  const items = await requestedItems.json();
  const divElement = document.createElement('div');
  divElement.id = 'list';
  divElement.appendChild(ItemsList(items));
  return divElement;
};
