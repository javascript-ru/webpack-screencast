import {Menu} from '../components';

const menuNode = document.querySelector('#menu');
const rootNode = document.querySelector('#content');

export async function renderMenu() {
  menuNode.appendChild(await Menu());
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
