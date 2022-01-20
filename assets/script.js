var now = moment().format(`M${"/"}D${"/"}YYYY`);
var foreCast1 = moment().add(1, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast2 = moment().add(2, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast3 = moment().add(3, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast4 = moment().add(4, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var foreCast5 = moment().add(5, 'days').calendar(`M${"/"}D${"/"}YYYY`);
var searchList = $("#search-list")
var searches = [];
var searchForm = document.querySelector("#search-form");
var searchInputEl = $("#search-bar");
var cityNameEl = $("#city-name-display");
var cityNameElVan = document.querySelector("#city-name-display");

var tempEl = $("#temp-span");
var humidityEl = $("#humidity-span");
var windEl = $("#wind-speed-span");
var uvEl = $("#uv-span");
var searchElVanilla = document.querySelector("#search-bar");
var apiKey = "672c0e16208bfbcdccb5e0e26b7d03b2";
var tempSpan = $("#temp-span");
var humiditySpan = $("#humidity-span");
var windSpeedSpan = $("#wind-speed-span");
var uvSpan = $("#uv-span");
var forecastContainer = $("#five-day-container");

var forecast = [foreCast1, foreCast2, foreCast3, foreCast4, foreCast5];


//Calling function init();
init();

//Function init();
function init(){
    //Get stored cities from localStorage
    //Parsing the JSON string to an object
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    // If cities were retrieved from localStorage, update the cities array to it
    if (storedSearches !== null) {
        searches = storedSearches;
      }
    // Render cities to the DOM
    renderSearches();
    // console.log(cities);
}

//Function StoreCities()
function storeSearches(){
   // Stringify and set "cities" key in localStorage to cities array
  localStorage.setItem("searches", JSON.stringify(searches));
  console.log(localStorage);
}

//Function renderCities()
function renderSearches() {
    // Clear cityList element
    // cityList.text = "";
    // cityList.HTML = "";
    searchList.empty();
    
    // Render a new li for each city
    for (var i = 0; i < 8; i++) {
      var search = searches[i];
      
      var li = $("<li>").text(search);
      li.attr("id","listC");
      li.attr("data-search", search);
      li.attr("class", "list-group-item");
      console.log(li);
      searchList.prepend(li);
    }
    //Get Response weather for the first city only
    // if (!search){
    //     return
    // } 
    // else{
    //     getResponseWeather(search)
    // };
}   

  //When form is submitted...
  $(searchForm).on("submit", function(event){
      event.preventDefault();

    // This line will grab the city from the input box
    var search = searchInputEl.val().trim();
    
    // Return from function early if submitted city is blank
    if (search === "") {
        return;
    }
    //Adding city-input to the city array
    searches.push(search);
    // Store updated cities in localStorage, re-render the list
  storeSearches();
  renderSearches();
  });











// var today = moment().format('l');

var formSubmitHandler = function (event) {
    event.preventDefault();
    // forecastContainer.remove(forecastDisplay);

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
    var requestGeoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityJoin}&limit=&appid=${apiKey}`;
    
   
    fetch (requestGeoUrl) 
        .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        var firstResponse = data;
        var requestOneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${apiKey}`;

        console.log("current weather" + data)

        cityNameEl.text(data[0].name)
        var dateEl = $("<span>");
        dateEl.attr("id", "date-span");
        dateEl.text(now);
        cityNameEl.append(dateEl);
        return fetch(requestOneCallUrl);
    })
    .then (function (response) {
        return response.json();
    })
    .then (function (oneCallData) {
        console.log(oneCallData);

        // display data
        tempSpan.text(oneCallData.current.temp + ` \xB0F`);
        humiditySpan.text(oneCallData.current.humidity + "%");
        windSpeedSpan.text(oneCallData.current.wind_speed + " mph");
        uvSpan.text(oneCallData.current.uvi);

        //dynamically create forecast cards 

        // forecastCard.attr("class", "col-lg-2 five-test");
        // forecastContainer.append(forecastCard); 
        // forecastCard.append(forecastDateEl);
        // forecastDateEl.text(foreCast1);

        // empty five day forecast section of past content
        $("#five-day-container").empty();

        for (i = 0; i < 5; i++) {
            var forecastCard = $("<div>");
            forecastCard.attr("class", "col-lg-2 five-test");
            forecastContainer.append(forecastCard);
            var forecastDateEl = $("<h4>");
            var forecastTempEl = $("<p>");
            var forecastHumidityEl = $("<p>");
            forecastCard.append(forecastDateEl);
            forecastCard.append(forecastTempEl);
            forecastCard.append(forecastHumidityEl);
            forecastDateEl.text(forecast[i]);
            forecastTempEl.text("Temp: " + oneCallData.daily[i].temp.day);
            forecastHumidityEl.text("Humidity: " + oneCallData.daily[i].humidity)
        }
        

    }) 
}


searchForm.addEventListener("submit", formSubmitHandler);



// exclude={part}&