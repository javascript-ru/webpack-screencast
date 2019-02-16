import '@babel/polyfill';
import router from 'lib/router';
import renderPage from './utils/renderPage';
import renderMenu from './utils/renderMenu';
import './styles.css';

renderMenu();

router
  .addRoute(/^item\/(.*)/, renderPage('item'))
  .addRoute(/^list\/?$/, renderPage('itemsList'))
  .addRoute('', renderPage('main'))
  .addRoute(/^404\/?$/, renderPage('error', 404, 'Not found!'))
  .setNotFoundHandler(renderPage('error', 404, 'Not found!'))
  .listen();


if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => router.route(true));
}
