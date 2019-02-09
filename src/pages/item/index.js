import Router from 'lib/router';
import template from './item.pug';
import './item.css';

export default async function ItemPage(route) {
  const id = route.replace('item/', '');
  const requestedItems = await fetch('/assets/items.json');
  const items = await requestedItems.json();

  const item = items.find(({id: itemId}) => id === itemId);
  if (!item) return Router.navigate('/404');

  const element = document.createElement('div');
  element.innerHTML = template({
    ...item,
    img: `/assets/items/${id}.png`
  });
  return element;
}
