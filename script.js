//grabs elements by id from html and references them by variable name
var formInputEl = document.getElementById("userCityInput");
var buttonEl = document.getElementById("searchBtn");
var cityEl = document.getElementById("cityList");
var currentDayEl = document.getElementById("dayWeather");
var dateEL = document.getElementById("date");

//created value from the users input text as a global variable, used as a parameter, that will be passed through the API call function below
var formSubmitHandler = function (event) {
  event.preventDefault();
var city = formInputEl.value.trim(); 
if (city === "") { return };    // makes it so you can't search for an empty text
$("#userCityInput").val(" ");   // clears out the input box
var headerEl = $("<h2>").text("5-Day Forecast");
$("#forecast").append(headerEl);

  getDayRepo(city);        //calls the function
  getForecastRepo(city);   //calls the function 
}

$("#searchBtn").on("click", formSubmitHandler);
// function #2
// 1 save searchList array in local stoarge
  // 1. clear out whats in the whats in it
  // 2. setItem with key of "cities"
  // 3. getItem of key "cities" you'll JSON.parse
// 2. Create the dom elements for the searchList arry
    //1. loop through the array
    //2. create button for each search term
    //3. attach an event listener for on click to run getDayRepo(name of the city)



//THIS FUNCTION WORKS!!! JUST NEED TO ADD LOCAL STORAGE
//function nests two api calls and dynamically creates elements to store specific data
function getDayRepo(city) {
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9215ad3aaa6f9b3960ceccb94240987d&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // STEP ONE: put city into the serch history array 
      var cityData = $("<h1>")
        .addClass("card-text")
        .text(data.name + " " + moment().format("L"));
      $("#dayWeather").append(cityData);
      var imgCurrDay = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );
      $("#dayWeather").append(imgCurrDay);
      var tempData = $("<div>")
        .addClass("card-text")
        .text("Temperature:" + " " + data.main.temp + " °F");
      $("#dayWeather").append(tempData);
      var humidityData = $("<div>")
        .addClass("card-text")
        .text("Humidity:" + " " + data.main.humidity + " %"); 
      $("#dayWeather").append(humidityData);
      var windData = $("<div>")
        .addClass("card-text")
        .text("Windspeed:" + " " + data.wind.speed + " MPH");
      $("#dayWeather").append(windData);

      //created variables that grab data from user input and inserts them into the api call below for a city's uv index
      var cityLat = data.coord.lat;
      var cityLon = data.coord.lon
      var requestUvUrl =    
        "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + "&exclude=minutely,hourly,alerts" + "&appid=9215ad3aaa6f9b3960ceccb94240987d"
        fetch(requestUvUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var uvData = $('<div>').addClass("card-text").text("UV Index: ");
          //this element allows only the data of the uv index to be shown with a red background
          var value = $('<span>').addClass('red').text(data.value);
          uvData.append(value)
          $('#dayWeather').append(uvData)
        });
    });


}
// $("#searchBtn").on("click", function (event) {
//   event.preventDefault();
//   var cities = $("#cityList").val();
//   localStorage.setItem(cities, value); //need to establish value
// });

//function uses api call for a specific city and with a loop dynamically creates 5 card elements to append the data to 
function getForecastRepo(city) {
  //var forecastArray = [];
  var requestForecastUrl =                        
    "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=9215ad3aaa6f9b3960ceccb94240987d";
  fetch(requestForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //forecastArray.push(data.list);
     for (var i = 0; i < data.list.length; i++) {
       if (data.list[i].dt_txt.indexOf("9:00:00") !== -1) {
          var column = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-primary text-white");
          var fiveDays = $("<div>")
            .addClass("card-text")
            .text(new Date("date:" + data.list[i].dt_txt).toLocaleDateString());
          var imgFiveDay = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              "@2x.png");
          var tempFiveDay = $("<p>")
            .addClass("card-text")
            .text("Temp:" + " " + data.list[i].main.temp_max + "°F");
          var humidityFiveDay = $("<p>")
            .addClass("card-text")
            .text("Humidity:" + " " + data.list[i].main.humidity + "%");
          column.append(card.append(fiveDays, tempFiveDay, humidityFiveDay, imgFiveDay));
          $("#forecast .row").append(column);
        }
      }
    });
}

// $("#cityList").val(localStorage.getItem("cityList"));
