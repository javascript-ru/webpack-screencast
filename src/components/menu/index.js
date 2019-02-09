import moment from 'moment';
import './menu.css';
import template from './menu.pug';

const items = [
  {route: '/', label: 'Main'},
  {route: '/list', label: 'List'}
];

export default class {

  render() {
    return template({
      items,
      date: moment().format('MMMM')
    });
  }

}
