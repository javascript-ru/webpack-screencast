export default function(module, ...args) {
  return async function(route) {
    const {default: Page} = await import(`../pages/${module}`); // NB!
    const page = new Page(route, ...args);
    const renderedPage = await page.render();

    const contentNode = document.querySelector('#content');
    contentNode.innerHTML = '';
    contentNode.appendChild(renderedPage);
  }
}
