export default async function(pageModule, route) {
  const {default: Page} = await import(`../src/pages/${pageModule}`);
  const page = new Page(route);

  const renderedPage = await page.render();

  const contentNode = document.querySelector('#content');
  contentNode.innerHTML = '';
  contentNode.appendChild(renderedPage);
}
