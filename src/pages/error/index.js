import TitleHeader from '../../components/titleHeader';

export default class {
  constructor(route, code, text) {
    this.code = code;
    this.text = text;
  }

  async render() {
    const elem = document.createElement('div');
    elem.id = 'error-page';
    elem.appendChild(new TitleHeader('Error!').render());
    elem.appendChild(new TitleHeader(`${code} - ${text}`).render());
    return elem;
  }

}
