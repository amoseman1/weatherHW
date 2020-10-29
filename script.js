//  id="inlineFormInput" --> search input form Element
//  id="searchBtn"  --> seacrh button element
//  id="cityList"  --> empty div for searched city List
//  id ="dayWeather" ---> empty div for API cur weather API call

var formInputEl = document.getElementById("inlineFormInput");
var buttonEl = document.getElementById("searchBtn");
var cityEl = document.getElementById("cityList");
var currentDayEl = document.getElementById("dayWeather");
var dateEL = document.getElementById("#date");

// $("searchBtn").on("click", function () {
//   formInputEl.text = userInput.val();
var userInput = $("#inlineFormInput").val();
// });
//add userInput as parameter to function below and replace the city in the API call?
//THIS FUNCTION WORKS!!! JUST NEED TO ADD UVINDEX API CALL & LOCAL STORAGE
function getDayRepo() {
  //var cityName = formInputEl.val(); ----->this needs to be the parametere that
  //passes through the function that equauls the city input by the user
  //console.log(formInputEl.val);
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=Denver,us&APPID=9215ad3aaa6f9b3960ceccb94240987d";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var tempData = $("<div>")
        .addClass("card-text")
        .text("Temperature:" + data.main.temp + "°C");
      $("#dayWeather").append(tempData);
      var humidityData = $("<div>")
        .addClass("card-text")
        .text("Humidity:" + data.main.humidity + "%"); //-->how do i add white space
      $("#dayWeather").append(humidityData);
      var windData = $("<div>")
        .addClass("card-text")
        .text("Windspeed:" + data.wind.speed + "MPH");
      $("#dayWeather").append(windData);
    });
}
$("#searchBtn").on("click", getDayRepo);//puts event listener on this button and calls getRepo function

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var cities = $("#cityList").val();
  localStorage.setItem(cities, value); //need to establish value
});

// forecastArray = ["card1", "card2", "card3", "card4", "card5"];

function getforecastRepo() {
  var forecastArray = [];
  var requestForecastUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=Denver&appid=9215ad3aaa6f9b3960ceccb94240987d";
  fetch(requestForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      forecastArray.push(data.list);

      for (var i = 0; i < forecastArray.length; i += 8) {
        console.log(forecastArray[i]);
        var fiveDays = $("<div>")
          .addClass("card-body")
          .text("date:" + data.list[0].dt_txt); //is this the right element?
        $("#date").append(fiveDays);

        //console.log(data.list[0].dt_txt);
      }
    });
}

$("#searchBtn").on("click", getforecastRepo);//add event listener to same button?

$("#cityList").val(localStorage.getItem("cityList"));
