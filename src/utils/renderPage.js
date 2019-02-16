export default async function(Page) {
  const route = window.document.location.pathname;
  const page = new Page(route);

  const renderedPage = await page.render();

  const contentNode = document.querySelector('#content');
  contentNode.innerHTML = '';
  contentNode.appendChild(renderedPage);
}
