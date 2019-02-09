import '@babel/polyfill';
import router from 'lib/router';
import Menu from './components/menu';
import renderPage from './pages/renderPage';
import './styles.css';

const menuNode = document.querySelector('#menu');
menuNode.appendChild(new Menu());

router
  .addRoute(/^item\/(.*)/, renderPage('item'))
  .addRoute(/^list/, renderPage('list'))
  .addRoute('', renderPage('main'))
  .setFallbackHandler(renderPage('error', 404)) // TODO
  .listen();
