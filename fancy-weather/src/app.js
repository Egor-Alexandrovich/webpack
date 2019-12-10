import 'babel-polyfill';
import _ from 'lodash';

import './scss/fonts.scss';
import './scss/reset.scss';
import './scss/style.scss';

import { getIpinfo } from './js/requests/ipinfo';

async function renderPage() {
    console.log('start');
    const data = await getIpinfo();// получаю координаты
    console.log(data);
}
renderPage();
