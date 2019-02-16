import ItemsList from '../../components/itemsList';
import router from 'lib/router';

export default class {
  async render() {
    let allItems = await fetch('/items.json');
    allItems = await allItems.json();

    const elem = document.createElement('div');

    elem.appendChild(await new ItemsList(allItems).render());

    return elem;
  }
}

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    router.refresh();
  });
}
/* eslint-enable no-undef */
