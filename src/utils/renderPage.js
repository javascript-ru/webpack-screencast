export default function(pageModule, ...args) {
  return async function render(route) {
    // show /* webpackMode: "lazy-once" */ here too
    const {default: Page} = await import( `../pages/${pageModule}`); // NB!
    const page = new Page(route, ...args);

    const renderedPage = await page.render();

    const contentNode = document.querySelector('#content');
    contentNode.innerHTML = '';
    contentNode.appendChild(renderedPage);
  };
}
