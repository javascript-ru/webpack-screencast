import './description.css';

export const Description = (text) => {
  const divElement = document.createElement('div');

  divElement.classList.add('description');
  const pElement = document.createElement('p');
  pElement.innerText = text;
  divElement.appendChild(pElement);

  return divElement;
};
