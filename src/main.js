import '@babel/polyfill';
import './styles.css';
import {Menu} from './components';
import {renderPage} from './utils';

// TODO: make less components

// we're using export default?
import {router} from 'lib/router';

document.querySelector('#menu').appendChild(Menu());

router
  .addRoute(/item\/(.*)/, renderPage('item'))
  .addRoute(/list/, renderPage('list'))
  .addRoute('/', renderPage('main'))
  .setFallback(renderPage('main'))
  .listen();
