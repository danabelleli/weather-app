var btnSearch = document.querySelector('#btn-search');
var cityName = document.querySelector('#city');
var weatherApiKey = 'd16e7b8f62c28e3ded8c3dff53bf6a56';
var dayTemp = document.querySelector('#day_temp');
var dayHeader = document.querySelector('#day_header');
var dayWind = document.querySelector('#day_wind');
var dayHumidity = document.querySelector('#day_humidity');
var headerIcon = document.querySelector('.weather-icon');
var cityInput = document.querySelector('#city');
var sectionSearch = document.querySelector('.search');

var lon;
var lat;
var searchHistory = [];

function convertCityPosition() {
    // url for getting the city lat and lon
    var locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${weatherApiKey}`;

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
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            displayWeatherData(data);
        })

}


// Set value in local storage
var setSearchHistory = function () {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Render values from local storage 
var renderSearchHistory = function () {
    // Get the local storage values
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    // Add cities to to searchHistory
    for (var i = 0; i < searchHistory.length; i++) {
        var cityBtn = document.createElement('button');
        cityBtn.textContent = searchHistory[i];
        cityBtn.setAttribute('data-index', i);
        cityBtn.classList.add('btn');

        sectionSearch.appendChild(cityBtn);
        console.log(cityBtn);
    }
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
    var Day = new Date(weatherData.list[0].dt_txt);
    var currentDay = Day.getDate();

    var weekDay = 1;

    // Display weather for the next 5 days
    for (var i = 1; i <= weatherData.list.length - 1; i++) {

        if (weekDay <= 5) {
            var d = new Date(weatherData.list[i].dt_txt);
            var intDay = d.getDate();
            var inthour = d.getHours();

            // Set the values for the next day 
            if (intDay = (currentDay + 1) && inthour == 12) {
                currentDay = intDay;

                document.querySelector('#weekDay_H_' + weekDay).innerHTML = d.toDateString();
                document.querySelector('#weekDay_T_' + weekDay).innerHTML = weatherData.list[i].main.temp + ' °F';
                document.querySelector('#weekDay_W_' + weekDay).innerHTML = 'Wind: ' + weatherData.list[i].wind.speed + ' MPH';
                document.querySelector('#weekDay_U_' + weekDay).innerHTML = 'Humidity: ' + weatherData.list[i].main.humidity + ' %';
                icon = weatherData.list[i].weather[0].icon;
                document.querySelector('#weekDay_Icon_' + weekDay).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png">`;

                weekDay += 1;
            }
        }
    }

    var cityBtnText = cityInput.value;
    console.log(cityBtnText);
    if (cityBtnText === '') {
        return;
    } else {
        // check if local storage exist 
        if (localStorage.getItem('searchHistory') !== null) {
            searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        }
        if (searchHistory.includes(cityBtnText)) {
            cityInput.value = '';
            return;
        } else {
            searchHistory.push(cityBtnText);
            cityInput.value = '';
            setSearchHistory();
            renderSearchHistory();
        }
    }

}

btnSearch.addEventListener('click', convertCityPosition);

