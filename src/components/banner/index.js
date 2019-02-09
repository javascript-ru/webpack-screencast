import './banner.css';

export default class {
  constructor(text, link) {
    this.text = text;
    this.link = link;
  }

  render() {
    // TODO: template
    const divElement = document.createElement('div');
    divElement.classList.add('banner');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.innerText = text;
      divElement.appendChild(linkElement);
    } else {
      divElement.innerText = text;
    }
    return divElement;
  }
}
