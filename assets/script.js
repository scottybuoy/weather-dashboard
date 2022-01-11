var now = moment().format(`M${"/"}D${"/"}YYYY`);
var foreCast1 = moment().add(1, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast2 = moment().add(2, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast3 = moment().add(3, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast4 = moment().add(4, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast5 = moment().add(5, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var searchForm = document.querySelector("#search-form");
var searchInputEl = $("#search-bar");
var cityNameEl = $("#city-name-display");
var cityNameElVan = document.querySelector("#city-name-display");
var dateEl = $("#date-span");
var tempEl = $("#temp-span");
var humidityEl = $("#humidity-span");
var windEl = $("#wind-speed-span");
var uvEl = $("#uv-span");
var searchElVanilla = document.querySelector("#search-bar");
var apiKey = "672c0e16208bfbcdccb5e0e26b7d03b2";
var tempSpan = $("#temp-span");
var humiditySpan = $("#humidity-span");
var windSpeedSpan = $("#wind-speed-span");
var uvSpan = $("uv-span");
var forecastContainer = $("#five-day-container");
var forecastCard = $("<div>");
var forecastDateEl = $("<h4>");
var forecastTempEl = $("<p>");
var forecastHumidityEl = $("<p>");

// var today = moment().format('l');

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = searchElVanilla.value.trim();
  
    if (cityName) {
      apiQuery();
      searchElVanilla.value = '';
    }
  };


// make api queries and call display function
function apiQuery() {
 
    var cityNameTest = searchElVanilla.value.trim();
    var citySplit = cityNameTest.split(" ");
    var cityJoin = citySplit.join("+");
    var requestGeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityJoin}&limit=&appid=${apiKey}`;
    
   
    fetch (requestGeoUrl) 
        .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        var firstResponse = data;
        var requestOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${apiKey}`;
        cityNameEl.text(data[0].name)
        return fetch(requestOneCallUrl);
    })
    .then (function (response) {
        return response.json();
    })
    .then (function (oneCallData) {
        console.log(oneCallData);

        // display data
        tempSpan.text(oneCallData.current.temp);
        humiditySpan.text(oneCallData.current.humidity);
        windSpeedSpan.text(oneCallData.current.wind_speed);

        //dynamically create forecast cards 

        // forecastCard.attr("class", "col-lg-2 five-test");
        // forecastContainer.append(forecastCard);
        // forecastCard.append(forecastDateEl);
        // forecastDateEl.text(foreCast1);

        for (i = 0; i < 5; i++) {
            forecastCard.attr("class", "col-lg-2 five-test");
            forecastContainer.append(forecastCard);
            forecastCard.append(forecastDateEl);
            forecastCard.append(forecastTempEl);
            forecastCard.append(forecastHumidityEl);
            forecastDateEl.text(foreCast1);
            forecastTempEl.text("Temp: " + oneCallData.daily[i].temp.day);
            
        }
        

    }) 
}


searchForm.addEventListener("submit", formSubmitHandler);

console.log(now);
console.log(foreCast1);

// exclude={part}&