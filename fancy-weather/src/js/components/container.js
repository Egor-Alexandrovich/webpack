export function container (url) {
    document.body.insertAdjacentHTML('afterbegin', `<div class="container"><div class="wrapper"><div class="control-block"></div><div class="weather-block"></div></div><div class="wrapper"><div class="input-wrapper"></div><div class="wrapper-map"></div></div></div>`);
    document.querySelector('.container').style.backgroundImage = `url(${url})`;
}