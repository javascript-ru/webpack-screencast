import moment from 'moment';
import Router from 'lib/router';
import './menu.css';

const items = [
  {route: '/', label: 'Главная'},
  {route: '/list', label: 'Каталог'}
];

export function Menu() {
  const divElement = document.createElement('div');

  items.forEach(({route, label}) => {
    const linkElement = document.createElement('a');
    linkElement.href = route;
    linkElement.onclick = Router.linkClickHandler(route);
    linkElement.innerText = label;
    divElement.appendChild(linkElement);
  });

  const date = document.createElement('span');
  date.classList.add('month');
  date.innerText = `Месяц: ${moment().format('MMMM')}`;
  divElement.appendChild(date);

  return divElement;
}
