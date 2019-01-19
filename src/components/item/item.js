import route from 'riot-route';
import './item.css';

export const Item = ({label, id, price}) => {
  const divElement = document.createElement('item');
  divElement.classList.add('item');
  divElement.onclick = () => route(`/item/${id}`);

  import(`../../assets/items/item${id}.png`).then(({default: imgSrc}) => {
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    divElement.appendChild(imgElement);

    const linkItem = document.createElement('a');
    linkItem.href = `/item/${id}`;
    const h2Element = document.createElement('h2');
    h2Element.innerText = label;
    linkItem.appendChild(h2Element);
    divElement.appendChild(linkItem);

    const h3Element = document.createElement('h3');
    h3Element.innerText = `$ ${price}`;
    divElement.appendChild(h3Element);
  });

  return divElement;
};
