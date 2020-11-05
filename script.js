//grabs elements by id from html and references them by variable name
var formInputEl = document.getElementById("userCityInput");
var buttonEl = document.getElementById("searchBtn");
var cityEl = document.getElementById("cityList");
var currentDayEl = document.getElementById("dayWeather");
var dateEL = document.getElementById("date");
//retrieves value of the key 'cities' and stores empty array in searchList variable
var searchList = JSON.parse(localStorage.getItem('cities')) || []

//created value from the users input text as a global variable, used as a parameter, that will be passed through the API call function below
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = formInputEl.value.trim();
  if (city === "" || city === undefined) { //conditional so you can't search for an empty text and doesn't store empty value in local storage
    alert("must be a valid entry");
  };

  if (searchList.includes(city)) { //conditional so you don't push the same city to the local storage
    console.log("city already exsists")
  } else {
    searchList.push(city)
  };

  $("#userCityInput").val(" ");   // clears out the input box
  getDayRepo(city);        //calls the function
  getForecastRepo(city);
  createCityList();

  $("#dayWeather").empty(); // clears the previous city's data
  $("#forecast .row").empty();
}
//globally calling function
createCityList();
//event handler added to button element that calls functions above
$("#searchBtn").on("click", formSubmitHandler);

function createCityList() {
  $("#cityList").empty();
  // loops through array and dynamically creates element for each array item
  for (var i = 0; i < searchList.length; i++) {
    console.log(searchList[i]);
    //we are storing the stringified value of searchList into the key of cities
    localStorage.setItem("cities", JSON.stringify(searchList));
    var pastCitiesBtn = $("<li>")
      .addClass("list-group-item cityBtn")
      .text(searchList[i]);
    $("#cityList").append(pastCitiesBtn);
  }
}

//onclick event to retrieve citys data from cityList elements
$("#cityList").on("click", "li", function () {
  var searchInput = $(this).text();
  getDayRepo(searchInput);
  getForecastRepo(searchInput);
  console.log("testing");
  $("#dayWeather").empty();
  $("#forecast .row").empty();
})

//function nests two api calls and dynamically creates elements to store specific data
function getDayRepo(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9215ad3aaa6f9b3960ceccb94240987d&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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

      //variables that grab data from user input and inserts them into the api call below for a city's uv index
      var cityLat = data.coord.lat;
      var cityLon = data.coord.lon
      var requestUvUrl =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + "&exclude=minutely,hourly,alerts" + "&appid=9215ad3aaa6f9b3960ceccb94240987d"
      fetch(requestUvUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var uvData = $('<div>').addClass("card-text").text("UV Index: ");
          //conditional statement to change the class of the uvindex (and color) based off index data value
          var uvIndex = data.value
          var uvIndexStatus = $('<span>').text(uvIndex);
          if (uvIndex <= 2) {
            uvIndexStatus.addClass("badge badge-success");
          } else if (uvIndex > 2 && uvIndex <= 5) {
            uvIndexStatus.addClass("badge badge-warning");
          } else {
            uvIndexStatus.addClass("badge badge-danger");
          }
          uvData.append(uvIndexStatus)
          $('#dayWeather').append(uvData)
        });
    });
}

//function uses api call for a specific city and with a loop dynamically creates 5 card elements to append the data to 
function getForecastRepo(city) {
  var requestForecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=9215ad3aaa6f9b3960ceccb94240987d";
  fetch(requestForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("9:00:00") !== -1) {
          var fiveDays = $("<div>")
            .addClass("card-text")
            .text(new Date("date:" + data.list[i].dt_txt).toLocaleDateString());
          var column = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card bg-primary text-white");
          var tempFiveDay = $("<p>")
            .addClass("card-text")
            .text("Temp:" + " " + data.list[i].main.temp_max + "°F");
          var humidityFiveDay = $("<p>")
            .addClass("card-text")
            .text("Humidity:" + " " + data.list[i].main.humidity + "%");
          var imgFiveDay = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
            data.list[i].weather[0].icon +
            "@2x.png");
          column.append(card.append(fiveDays, tempFiveDay, humidityFiveDay, imgFiveDay));
          $("#forecast .row").append(column);
        }
      }
    });
};

