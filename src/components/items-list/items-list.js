import './items-list.css';
import {Item} from '../item/item';

export const ItemsList = (items) => {
  const divElement = document.createElement('div');

  divElement.classList.add('item-list');
  items.forEach((item) => {
    divElement.appendChild(Item(item));
  });

  return divElement;
};
