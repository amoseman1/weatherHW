//  id="inlineFormInput" --> search input form Element
//  id="searchBtn"  --> seacrh button element
//  id="cityList"  --> empty div for searched city List
//  id ="dayWeather" ---> empty div for API cur weather API call

var formInputEl = document.getElementById("userCityInput");
var buttonEl = document.getElementById("searchBtn");
var cityEl = document.getElementById("cityList");
var currentDayEl = document.getElementById("dayWeather");
var dateEL = document.getElementById("date");

//var userInput = $("#userCityInput").val();
// function keyup() {
//   var value = $(this).val();
//   $("#cityList").text(value);
//   console.log(value);
// }
// $("#searchBtn").on("click", keyup());
// });




var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = formInputEl.value.trim();
console.log(city);
  getDayRepo(city);

}
//add userInput as parameter to functon below and replace the city in the API call?
//THIS FUNCTION WORKS!!! JUST NEED TO ADD LOCAL STORAGE
function getDayRepo(city) {
  var requestUrl =
    'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=9215ad3aaa6f9b3960ceccb94240987d&units=imperial';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var cityData = $("<h1>")
        .addClass("card-text header")
        .text(data.name + " " + moment().format("L"));
      $("#dayWeather").append(cityData);
      var imgCurrDay = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );
      $("#dayWeather").append(imgCurrDay);
      var tempData = $("<div>")
        .addClass("card-text")
        .text("Temperature:" + " " + data.main.temp + "°F");
      $("#dayWeather").append(tempData);
      var humidityData = $("<div>")
        .addClass("card-text")
        .text("Humidity:" + " " + data.main.humidity + "%"); //-->how do i add white space
      $("#dayWeather").append(humidityData);
      var windData = $("<div>")
        .addClass("card-text")
        .text("Windspeed:" + " " + data.wind.speed + "MPH");
      $("#dayWeather").append(windData);

      var requestUvUrl =
        "http://api.openweathermap.org/data/2.5/uvi?lat=39.742043&lon=-104.991531&appid=9215ad3aaa6f9b3960ceccb94240987d";
      fetch(requestUvUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          var UvData = $("<div>")
            .addClass("card-text")
            .text("UV Index:" + " " + data.value);
          $("#dayWeather").append(UvData);
        });
    });
}
$("#searchBtn").on("click", formSubmitHandler); //puts event listener on this button and calls getRepo function
//$("#userCityInput").submit(formSubmitHandler);
// $("#searchBtn").on("click", function (event) {
//   event.preventDefault();
//   var cities = $("#cityList").val();
//   localStorage.setItem(cities, value); //need to establish value
// });

function getForecastRepo() {
  //var forecastArray = [];
  var requestForecastUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=Denver&appid=9215ad3aaa6f9b3960ceccb94240987d&units=imperial";
  fetch(requestForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //forecastArray.push(data.list);
     for (var i = 0; i < 5; i++) {
        //console.log(forecastArray[0]);
        if (data.list[i].dt_txt.indexOf("9:00:00") !== -1) {
          var fiveDays = $("<div>")
            .addClass("card-text")
            .text(new Date("date:" + data.list[i].dt_txt).toLocaleDateString());
          //$("#forecast, .row").append(fiveDays);
          var column = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-primary text-white");
          var tempFiveDay = $("<p>")
            .addClass("card-text")
            .text("temperature:" + " " + data.list[i].main.temp_max + "°F");
          var humidityFiveDay = $("<p>")
            .addClass("card-text")
            .text("humidity:" + " " + data.list[i].main.humidity + "%");
          var imgFiveDay = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              ".png"
          );
          column.append(
            card.append(fiveDays, tempFiveDay, humidityFiveDay, imgFiveDay)
          );
          $("#forecast, .row").append(column);
        }
      }
    });
}

$("#searchBtn").on("click", getForecastRepo); //add event listener to same button?

// $("#cityList").val(localStorage.getItem("cityList"));
