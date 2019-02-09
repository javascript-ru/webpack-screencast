import {Menu} from '../components';

const menuNode = document.querySelector('#menu');
const rootNode = document.querySelector('#content');

export function renderMenu() {
  menuNode.appendChild(Menu());
}

function clearBlock(block) {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
}

async function loadChunkAndRender(page, route) {
  const {default: pageRenderer} = await import(`./${page}/${page}`);
  clearBlock(rootNode);
  const renderedPage = await pageRenderer(route);
  rootNode.appendChild(renderedPage);
}

export function renderPage(page) {
  return route => loadChunkAndRender(page, route);
}
