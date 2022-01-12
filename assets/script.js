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
// var today = moment().format('l');

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = searchElVanilla.value.trim();
  
    if (cityName) {
      apiQuery(cityName);
  
      searchElVanilla.value = '';
    }
    
  };

function apiQuery() {
 
    var cityNameTest = searchElVanilla.value.trim();
    var citySplit = cityNameTest.split(" ");
    var cityJoin = citySplit.join("+");
    // var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityJoin + '&limit={limit}&appid=672c0e16208bfbcdccb5e0e26b7d03b2';
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityJoin}&limit=&appid=672c0e16208bfbcdccb5e0e26b7d03b2`;
    fetch(requestUrl) 
        .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data[0]);
        cityNameEl.text(data[0].name)
    })
    
}



searchForm.addEventListener("submit", formSubmitHandler);



