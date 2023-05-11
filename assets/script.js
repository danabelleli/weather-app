var btnSearch = document.querySelector('#btn-search');
var cityName = document.querySelector('#city');
var weatherApiKey = 'd16e7b8f62c28e3ded8c3dff53bf6a56';
var dayTemp = document.querySelector('#day_temp');
var dayHeader = document.querySelector('#day_header');
var dayWind = document.querySelector('#day_wind');
var dayHumidity = document.querySelector('#day_humidity');
let headerIcon = document.querySelector('.weather-icon');

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
    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            displayWeatherData(data);
        })

}

// display the weather function
function displayWeatherData(weatherData) {
    // display current day
    dayHeader.textContent = weatherData.city.name + ' (' + (new Date(weatherData.list[0].dt_txt)).toDateString() + ')';
    dayTemp.textContent = 'Temp: ' + weatherData.list[0].main.temp + ' °F';
    dayWind.textContent = 'Wind: ' + weatherData.list[0].wind.speed + ' MPH';
    dayHumidity.textContent = 'Humidity: ' + weatherData.list[0].main.humidity + ' %';
    var icon = weatherData.list[0].weather[0].icon;
    headerIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png">`;

    // finding current day
    var day = new Date(weatherData.list[0].dt - weatherData.city.timezone);

    var day1 = new Date((weatherData.list[0].dt + weatherData.city.timezone) * 1000);
    console.log(day1.toDateString());
    var currentDay = day.getDate();
    var currentHour = day.getHours();
    console.log(currentHour);
    console.log(currentDay);

    // display next 5 day
    for (var i = 1; i <= weatherData.list.length; i++) {
        var timeStamp = weatherData.list[i];

    }
}




btnSearch.addEventListener('click', convertCityPosition);