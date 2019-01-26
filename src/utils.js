const root = document.querySelector('#content');

const clearBlock = (block) => {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }
};

// TODO: async/await
export const renderPage = (page) => (...routeParams) => import(`./pages/${page}/${page}`)
  .then(({default: renderPage}) => {
    clearBlock(root);
    const renderedPage = renderPage(...routeParams);
    root.appendChild(renderedPage);
  });
