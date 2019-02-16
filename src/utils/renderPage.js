import dynamicPage from './loadDynamicPage';

export default function(pageModule, ...args) {
  return async function render(route) {
    const Page = await dynamicPage(pageModule);
    const page = new Page(route, ...args);

    const renderedPage = await page.render();

    const contentNode = document.querySelector('#content');
    contentNode.innerHTML = '';
    contentNode.appendChild(renderedPage);
  };
}
