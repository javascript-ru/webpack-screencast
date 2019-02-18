import '@babel/polyfill';
import router from 'lib/router';
import renderMenu from 'utils/renderMenu';
import './styles.css';

renderMenu();

router
  .addRoute(/^item\/(.*)/, 'item')
  .addRoute(/^list\/?$/, 'itemsList')
  .addRoute('', 'main')
  .addRoute(/^404\/?$/, 'error')
  .setNotFoundPage('error')
  .listen();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => router.route());
}
