import Banner from '../../components/banner';
import TitleHeader from '../../components/titleHeader';
import ItemsList from '../../components/itemsList';

export default async function MainPage() {
  const requestedItems = await fetch('/assets/items.json');
  const items = await requestedItems.json();

  const divElement = document.createElement('div');
  divElement.id = 'main';
  divElement.appendChild(new TitleHeader('Framework shop!').render());
  divElement.appendChild(new Banner('Buy only from us, everything is free').render());
  divElement.appendChild(new ItemsList(items.slice(0, 5)).render());
  divElement.appendChild(new Banner('See all frameworks', '/list').render());
  return divElement;
}
