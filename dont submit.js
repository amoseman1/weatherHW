
 var searchList = [];
 if (JSON.parse(localStorage.getItem("searchCities") !== null)) {
   searchList = JSON.parse(localStorage.getItem("searchCities"));
 }
 
 $(document).ready(function () {
   displaySearchList(searchList); 
  
  
  function addSearchList(searchBarText) {
    if (searchBarText !== "") {
      searchList.push(searchBarText);
      localStorage.setItem("searchCities", JSON.stringify(searchList));
    }
  }
  
  
  function onecall -----> the entire function including api calls
  
  
  
  function displaySearchList(searchListArray) {
    $(".searchList").empty();
    for (var i = 0; i < searchListArray.length; i++) {
      var newCity = $('<button type="button" class="newCity"></button>').text(
        searchListArray[i]
      );
      $(".searchList").prepend(newCity);
    }
  }
function clearSearchBar() {
    document.getElementById("citySearch").value = "";
  }

$(".searchButton").on("click", function () {
    addSearchList(document.getElementById("citySearch").value);
    oneCall(document.getElementById("citySearch").value);
    displaySearchList(searchList);
    clearSearchBar();
  });