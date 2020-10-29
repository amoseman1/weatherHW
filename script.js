//  id="inlineFormInput" --> search input form Element
//  id="searchBtn"  --> seacrh button element
//  id="cityList"  --> empty div for searched city List
//  id ="dayWeather" ---> empty div for API cur weather API call

var formInputEl = document.getElementById("inlineFormInput");
var buttonEl = document.getElementById("searchBtn");
var cityEl = document.getElementById("cityList");
var currentDayEl = document.getElementById("dayWeather");
var dateEL = document.getElementById("date");

// $("searchBtn").on("click", function () {
//   formInputEl.text = userInput.val();
var userInput = $("#inlineFormInput").val();
// });
//add userInput as parameter to function below and replace the city in the API call?
//THIS FUNCTION WORKS!!! JUST NEED TO ADD UVINDEX API CALL & LOCAL STORAGE
// function getDayRepo() {
//var cityName = formInputEl.val(); ----->this needs to be the parametere that
//passes through the function that equauls the city input by the user
//console.log(formInputEl.val);
//   var requestUrl =
//     "http://api.openweathermap.org/data/2.5/weather?q=Denver,us&APPID=9215ad3aaa6f9b3960ceccb94240987d";
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       var tempData = $("<div>")
//         .addClass("card-text")
//         .text("Temperature:" + data.main.temp + "°C");
//       $("#dayWeather").append(tempData);
//       var humidityData = $("<div>")
//         .addClass("card-text")
//         .text("Humidity:" + data.main.humidity + "%"); //-->how do i add white space
//       $("#dayWeather").append(humidityData);
//       var windData = $("<div>")
//         .addClass("card-text")
//         .text("Windspeed:" + data.wind.speed + "MPH");
//       $("#dayWeather").append(windData);
//     });
// }
// $("#searchBtn").on("click", getDayRepo);//puts event listener on this button and calls getRepo function

// $("#searchBtn").on("click", function (event) {
//   event.preventDefault();
//   var cities = $("#cityList").val();
//   localStorage.setItem(cities, value); //need to establish value
// });

// forecastArray = ["card1", "card2", "card3", "card4", "card5"];

function getforecastRepo() {
  var forecastArray = [];
  var requestForecastUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=Denver&appid=9215ad3aaa6f9b3960ceccb94240987d&units=imperial";
  fetch(requestForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      forecastArray.push(data.list);

      for (var i = 0; i < data.list.length; i++) {
        console.log(forecastArray[i]);
        if (data.list[i].dt_txt.indexOf("09:00:00") !== -1) {
          var fiveDays = $("<div>")
            .addClass("card-text")
            .text(new Date("date:" + data.list[i].dt_txt).toLocaleDateString()); //is this the right element?
          $("#forecast .row").append(fiveDays);
          var column = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-primary text-white");
          var tempFiveDay = $("<p>")
            .addClass("card-text")
            .text("temperature:" + data.list[i].main.temp_max + "°F");
          var humidityFiveDay = $("<p>")
            .addClass("card-text")
            .text("humidity:" + data.list[i].main.humidity + "%");
          var imgFiveDay = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/w/" +
              data.list[i].weather[0].icon +
              ".png"
          );
          column.append(
            card.append(fiveDays, tempFiveDay, humidityFiveDay, imgFiveDay)
          );
          $("#forecast .row").append(column);
        }
        //console.log(data.list[0].dt_txt);
      }
    });
}

$("#searchBtn").on("click", getforecastRepo); //add event listener to same button?

// $("#cityList").val(localStorage.getItem("cityList"));
