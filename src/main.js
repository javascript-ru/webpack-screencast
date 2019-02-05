import '@babel/polyfill';
import Router from 'lib/router';
import {renderPage, renderMenu} from './pages/utils';
import './styles.css';

renderMenu();
Router.getInstance()
  .addRoute(/item\/(.*)/, renderPage('item'))
  .addRoute(/list/, renderPage('list'))
  .addRoute('/', renderPage('main'))
  .setFallback(renderPage('main'))
  .listen();
