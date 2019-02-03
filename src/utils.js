import {router} from 'lib/router';

const root = document.querySelector('#content');

const clearBlock = (block) => {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
};

const loadChunkAndRender = async (page, ...routeParams) => {
  const {default: renderPage} = await import(`./pages/${page}/${page}`);
  clearBlock(root);
  const renderedPage = await renderPage(...routeParams);
  root.appendChild(renderedPage);
};

export const handleLinkClick = (path) => (e) => {
  e.preventDefault();
  router.navigate(path);
};

export const renderPage = (page) => (...routeParams) => loadChunkAndRender(page, ...routeParams);
