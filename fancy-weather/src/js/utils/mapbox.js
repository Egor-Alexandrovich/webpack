export function mapBox(latitude, longitude) {
    let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWV0cm9sb2c1MTIiLCJhIjoiY2szaXRpcDdnMGF3MDNtbGNqd2lkemQzdCJ9.kzYdFJ3KNB4lGJCT8yeDxg';
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude], // starting position [longitude, latitude]
        zoom: 9 // starting zoom
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
}
