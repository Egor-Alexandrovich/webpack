import 'babel-polyfill';
import _ from 'lodash';

import './scss/fonts.scss';
import './scss/reset.scss';
import './scss/style.scss';

import { getIpinfo } from './js/requests/ipinfo';
import { getLinkToImage } from './js/requests/unsplash';
import { getOpenCageData } from './js/requests/opencagedata';
import { getWeatherDarksky } from './js/requests/darksky';
import { getSeason } from './js/utils/getseason';
import { getDayTime } from './js/utils/getdaytime';
import { container } from './js/components/container';
import { btn } from './js/components/btn';
import { city } from './js/components/city';
import { currentDate } from './js/components/current-date';
import { currentWeather } from './js/components/current-weather';
import { weekWeather } from './js/components/week-weather';
import { inputWrapper } from './js/components/input-wrapper';
import { mapWrapper } from './js/components/wrapper-map';
import { mapBox } from './js/utils/mapbox';
import { iconWeather } from './js//components/iconWeather.js'

const url = 'https://images.unsplash.com/photo-1470883361187-d6eaa64cdf00?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMTQ5Nn0';
const weekday = ['Tuesday', 'Wednesday', 'Thursday'];
const temp = ['', '', '', ''];
let refresh = {};
// const iconWeather = ['<img src="./images/weather1.png" alt="">','<img src="./images/weather1.png" alt="">','<img src="./images/weather1.png" alt="">'];
// container(url);
// btn('<img src="./images/refresh.svg" alt="refresh">');
// btn('EN');
// btn('° F');
// btn('° C');
// city('Minsk, Belarus');
// currentDate('Mon 28 October 17:23');
// currentWeather('overcast', '7', '2', '83', '10', '<img src="./images/weather2.svg" alt="">');
// weekWeather(day, temp, iconWeather);
// inputWrapper();
// mapWrapper();
// mapBox(latitude, longitude);

async function renderPage() {
    console.log('start');
    const data = await getIpinfo();// получаю координаты
    const latitude = data.loc.split(',')[0];
    const longitude = data.loc.split(',')[1];
    const openCageData = await getOpenCageData(data.loc); //передаю координаты в гео
    const weather = await getWeatherDarksky(data.loc);//передаю координаты в даркскай
    const time = new Date(weather.currently.time * 1000);
    const season = getSeason(time.getMonth());
    const day = getDayTime(time.getHours());
    const requestForImg = weather.currently.summary;
    const urlImg = await getLinkToImage(season, day, requestForImg);// передаю данные из даркскай в апслешь
    container(urlImg.urls.regular);
    btn(`id="refresh"`, '<img src="./images/refresh.svg" alt="refresh">');
    btn('', 'EN');
    btn('', '° F');
    btn('', '° C');
    city(`${openCageData.results[0].components.city}, ${openCageData.results[0].components.country}`);
    currentDate(time.toLocaleString('en',{ weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }));
    currentWeather(requestForImg, Math.round(weather.currently.apparentTemperature), weather.currently.windSpeed, weather.currently.humidity * 100, Math.round(weather.currently.temperature), iconWeather[weather.currently.icon]);
    weekday[0] = new Date(weather.currently.time * 1000 + 86400000).toLocaleString('en', { weekday: 'short' });
    weekday[1] = new Date(weather.currently.time * 1000 + 172800000).toLocaleString('en', { weekday: 'short' });
    weekday[2] = new Date(weather.currently.time * 1000 + 259200000).toLocaleString('en', { weekday: 'short' });
    temp[0] = Math.round((weather.daily.data[1].temperatureHigh + weather.daily.data[1].temperatureLow) / 2);
    temp[1] = Math.round((weather.daily.data[2].temperatureHigh + weather.daily.data[2].temperatureLow) / 2);
    temp[2] = Math.round((weather.daily.data[3].temperatureHigh + weather.daily.data[3].temperatureLow) / 2);
    const iconWeatherWeek = [iconWeather[weather.daily.data[1].icon], iconWeather[weather.daily.data[2].icon], iconWeather[weather.daily.data[3].icon]];
    weekWeather(weekday, temp, iconWeatherWeek);
    inputWrapper();
    mapWrapper(latitude, longitude);
    mapBox(latitude, longitude);
    refresh = document.getElementById('refresh');
    refresh.addEventListener('click', () => {
        renderPage();
        console.log('click');
        
    });
    console.log('stop');
}
renderPage();
