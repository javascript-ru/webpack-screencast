import Router from 'lib/router';
import './item.css';


function Item({label, id, price}) {
  const divElement = document.createElement('item');
  divElement.classList.add('item');
  divElement.onclick = Router.linkClickHandler(`/item/${id}`);

  const imgElement = document.createElement('img');
  imgElement.src = `/assets/items/${id}.png`;
  divElement.appendChild(imgElement);

  const linkItem = document.createElement('a');
  linkItem.href = `/item/${id}`;
  linkItem.onclick = Router.linkClickHandler(`/item/${id}`);

  const h2Element = document.createElement('h2');
  h2Element.classList.add('text');
  h2Element.innerText = label;
  linkItem.appendChild(h2Element);
  divElement.appendChild(linkItem);

  const h3Element = document.createElement('h3');
  h3Element.classList.add('text');
  h3Element.innerText = `$ ${price}`;
  divElement.appendChild(h3Element);

  return divElement;
}

export default class {
  constructor(items) {
    this.items = items;
  }

  // TODO
  render() {
    const divElement = document.createElement('div');

    divElement.classList.add('item-list');
    items.forEach((item) => {
      divElement.appendChild(Item(item));
    });

    return divElement;
  }

}
