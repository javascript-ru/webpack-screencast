
export default async function(module, ...args) {

  const Page = await import(`./${module}`);

  const page = new Page(...args);

  const renderedPage = page.render();

  const rootNode = document.querySelector('#content');
  rootNode.innerHTML = '';
  rootNode.appendChild(renderedPage);
}
