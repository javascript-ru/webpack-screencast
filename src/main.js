import '@babel/polyfill';
import router from 'lib/router';
import Menu from './components/menu';
import renderPage from './pages/renderPage';
import './styles.css';

const menuItems = [
  {route: '/', label: 'Main'},
  {route: '/list', label: 'List'}
];
const menuNode = document.querySelector('#menu');
menuNode.appendChild(new Menu(menuItems).render());

router
  .addRoute(/^item\/(.*)/, renderPage('item'))
  .addRoute(/^list\/?$/, renderPage('itemsList'))
  .addRoute('', renderPage('main'))
  .addRoute(/^404\/?$/, renderPage('error', 404, 'Not found!'))
  .setFallbackHandler(renderPage('error', 404, 'Not found!'))
  .listen();
