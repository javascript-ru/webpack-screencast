import {handleLinkClick} from '../../utils';
import './banner.css';

export const Banner = (text, link) => {
  const divElement = document.createElement('div');
  divElement.classList.add('banner');
  if (link) {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.onclick = handleLinkClick(link);
    linkElement.innerText = text;
    divElement.appendChild(linkElement);
  } else {
    divElement.innerText = text;
  }
  return divElement;
};
