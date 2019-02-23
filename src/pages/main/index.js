import renderTemplate from 'utils/renderTemplate';
import template from './main.pug';
import './main.css';

export default class {
  async render() {

    return renderTemplate(template, {
      title: 'Framework shop!',
      banners: [
        {
          text: 'Buy only from us, everything is free'
        },
        {
          link: '/list',
          text: 'See all frameworks'
        }
      ]
    });

  }
}
