import route from 'riot-route';
import './styles.css';
import {Menu} from './components';
import {renderPage} from './utils';

document.querySelector('#menu').appendChild(Menu());

route.base('/');
route.start(true);

route('/', renderPage('main'));
route('/list', renderPage('list'));
route('/item/*', renderPage('item'));
