const root = document.querySelector('#content');

function clearBlock(block) {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
}

async function loadChunkAndRender(page, route) {
  const {default: pageRenderer} = await import(`./${page}/${page}`);
  clearBlock(root);
  const renderedPage = await pageRenderer(route);
  root.appendChild(renderedPage);
}

export function renderPage(page) {
  return route => loadChunkAndRender(page, route);
}
