import Menu from '../components/menu';

const menuNode = document.querySelector('#menu');

export default async function renderMenu() {
  const menuItems = [
    {route: '/', label: 'Main'},
    {route: '/list', label: 'List'}
  ];

  const menu = new Menu(menuItems);
  menuNode.innerHTML = '';
  menuNode.appendChild(await menu.render());
}

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept('../components/menu', renderMenu);
}
/* eslint-enable no-undef */
