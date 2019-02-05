import './title.css';

export function Title(text) {
  const divElement = document.createElement('div');

  divElement.classList.add('title');
  const h1Element = document.createElement('h1');
  h1Element.innerText = text;
  divElement.appendChild(h1Element);

  return divElement;
}
