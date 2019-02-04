import '@babel/polyfill';
import Router from 'lib/router';
import loadMoment from 'lib/moment';
import {Menu} from './components';
import {renderPage} from './pages/utils';
import './styles.css';

loadMoment();

document.querySelector('#menu').appendChild(Menu());

Router.getInstance()
  .addRoute(/item\/(.*)/, renderPage('item'))
  .addRoute(/list/, renderPage('list'))
  .addRoute('/', renderPage('main'))
  .setFallback(renderPage('main'))
  .listen();
