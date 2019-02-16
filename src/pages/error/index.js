import renderTemplate from '../../utils/renderTemplate';
import template from './error.pug';
import './error.css';
import renderPage from '../../utils/renderPage';
import '../../common';

class ErrorPage {
  async render() {
    return renderTemplate(template, {
      header: 'Error!',
      message: '404 - Not found!'
    });
  }
}

renderPage(ErrorPage);
