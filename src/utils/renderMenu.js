import Menu from '../components/menu';

export default async function renderMenu() {
  const menuItems = [
    {route: '/', label: 'Main'},
    {route: '/list', label: 'List'}
  ];
  const menuNode = document.querySelector('#menu');
  const menu = new Menu(menuItems);
  menuNode.appendChild(await menu.render());
}
