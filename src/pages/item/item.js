import Router from 'lib/router';
import {Title} from '../../components';
import './item.css';

function ItemDescription(text) {
  const divElement = document.createElement('div');
  divElement.classList.add('description');
  const pElement = document.createElement('p');
  pElement.innerText = text;
  divElement.appendChild(pElement);
  return divElement;
}

function ItemImage(link) {
  const imageElement = document.createElement('img');
  imageElement.classList.add('image');
  imageElement.src = link;
  return imageElement;
}

export default async function ItemPage(route) {
  const id = route.replace('item/', '');
  const requestedItems = await fetch('/assets/items.json');
  const items = await requestedItems.json();

  const item = items.find(({id: itemId}) => id === itemId);
  if (!item) return Router.navigate('/404');

  const divElement = document.createElement('div');
  divElement.id = 'item-page';
  divElement.appendChild(Title(item.label));
  divElement.appendChild(ItemDescription(item.description));
  divElement.appendChild(ItemImage(`/assets/items/${id}.png`));
  return divElement;
}
