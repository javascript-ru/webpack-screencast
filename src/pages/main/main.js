import './main.css';
import {Banner, Title, ItemsList} from '../../components';
import items from '../../assets/items.json';

export default () => {
  const divElement = document.createElement('div');

  divElement.id = 'main';
  divElement.appendChild(Title('Какой-то интернет магазин фреймворков'));
  divElement.appendChild(Banner('Покупайте только у нас, всё бесплатно'));
  divElement.appendChild(ItemsList(items.slice(0, 5)));
  divElement.appendChild(Banner('Посмотреть все фреймворки', '/list'));

  return divElement;
};
