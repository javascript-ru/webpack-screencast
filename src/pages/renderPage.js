export default function(module, ...args) {
  return async function(route) {
    const {default: renderPage} = await import(`./${module}`);
    const page = await renderPage(route, ...args);
  
    const contentNode = document.querySelector('#content');
    contentNode.innerHTML = '';
    contentNode.appendChild(page);
  }
}
