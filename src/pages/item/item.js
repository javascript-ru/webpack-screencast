import route from 'riot-route';
import items from '../../assets/items.json';
import {Title, Description, Image} from '../../components/index.js';

export default (id) => {
  const item = items.find(({id: itemId}) => id === itemId);
  if (!item) return route('/404');

  const divElement = document.createElement('div');
  divElement.id = 'item';
  divElement.appendChild(Title(item.label));
  divElement.appendChild(Description(item.description));
  import(`../../assets/items/item${item.id}.png`).then(({default: imgSrc}) => {
    divElement.appendChild(Image(imgSrc));
  });
  return divElement;
};
