import {ItemsList} from '../../components';
import items from '../../assets/items.json';

export default () => {
  const divElement = document.createElement('div');
  divElement.id = 'list';
  divElement.appendChild(ItemsList(items));
  return divElement;
};
