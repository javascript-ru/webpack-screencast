import '@babel/polyfill';
import './styles.css';
import {Menu} from './components';
import {renderPage} from './utils';
import {router} from 'lib/router';

document.querySelector('#menu').appendChild(Menu());

router
  .watch(/item\/(.*)/, renderPage('item'))
  .watch(/list/, renderPage('list'))
  .watch('/', renderPage('main'))
  .fallback(renderPage('main'))
  .listen();
