import {router} from 'lib/router';
import {handleLinkClick} from '../../utils';
import './item.css';

export const Item = ({label, id, price}) => {
  const divElement = document.createElement('item');
  divElement.classList.add('item');
  divElement.onclick = () => router.navigate(`/item/${id}`);

  const imgElement = document.createElement('img');
  imgElement.src = `/assets/items/item${id}.png`;
  divElement.appendChild(imgElement);

  const linkItem = document.createElement('a');
  linkItem.href = `/item/${id}`;
  linkItem.onclick = handleLinkClick(`/item/${id}`);
  const h2Element = document.createElement('h2');
  h2Element.classList.add('item_text');
  h2Element.innerText = label;
  linkItem.appendChild(h2Element);
  divElement.appendChild(linkItem);

  const h3Element = document.createElement('h3');
  h3Element.classList.add('item_text');
  h3Element.innerText = `$ ${price}`;
  divElement.appendChild(h3Element);

  return divElement;
};
