import TitleHeader from '../../components/titleHeader';

export default async function ErrorPage(route, code, text) {
  const divElement = document.createElement('div');
  divElement.id = 'error-page';
  divElement.appendChild(new TitleHeader('Error!').render());
  divElement.appendChild(new TitleHeader(`${code} - ${text}`).render());
  return divElement;
}
