import banner from '../../components/banner';
import titleHeader from '../../components/titleHeader';
import itemList from '../../components/itemList';

export default async function MainPage() {
  const requestedItems = await fetch('/assets/items.json');
  const items = await requestedItems.json();

  const divElement = document.createElement('div');
  divElement.id = 'main';
  divElement.appendChild(Title('Framework shop!'));
  divElement.appendChild(Banner('Buy only from us, everything is free'));
  divElement.appendChild(ItemsList(items.slice(0, 5)));
  divElement.appendChild(Banner('See all frameworks', '/list'));
  return divElement;
}
