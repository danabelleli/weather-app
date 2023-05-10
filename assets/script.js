var btnSearch = document.querySelector('#btn-search');
var cityName = document.querySelector('#city');
var weatherApiKey = 'd16e7b8f62c28e3ded8c3dff53bf6a56';
var lon;
var lat;

function convertCityPosition() {
    // url for getting the city lat and lon
    var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${weatherApiKey}`;

    fetch(locationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // assigning lon and lat
            lon = data[0].lon;
            lat = data[0].lat;
            getWeather();
        })

}

// get weather function
function getWeather() {
    // weather url
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        })

}

btnSearch.addEventListener('click', convertCityPosition);