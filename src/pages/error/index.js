import renderTemplate from 'utils/renderTemplate';
import template from './error.pug';
import './error.css';

export default class {
  async render() {
    console.log('render error page');
    return renderTemplate(template, {
      header: 'Error!',
      message: '404 - Not found!'
    });
  }
}
