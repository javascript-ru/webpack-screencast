import './menu.css';

const items = [
  {route: '/', label: 'Главная'},
  {route: '/list', label: 'Каталог'}
];

export const Menu = () => {
  const divElement = document.createElement('div');

  items.forEach(({route, label}) => {
    const linkElement = document.createElement('a');
    linkElement.href = route;
    linkElement.innerText = label;
    divElement.appendChild(linkElement);
  });

  return divElement;
};
