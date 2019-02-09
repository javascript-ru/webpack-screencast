import './title.css';

export default class {
  constructor(text) {
    this.text = text;
  }

  render() {
    const divElement = document.createElement('div');

    divElement.classList.add('title');
    const h1Element = document.createElement('h1');
    h1Element.innerText = text;
    divElement.appendChild(h1Element);

    return divElement;
  }
}
