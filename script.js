var searchBtnEl = $(".submitBtn");
var userInput = $(".city");

var weatherIconEl = $(".weatherIcon");
var currentWindEl = $(".currentWind");
var currentHumidityEl = $(".currentHumidity");
var uvIndexEl = document.querySelector(".uvIndex");

var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY"));


function displayLocalStorage() {
  var recentSearch = JSON.parse(localStorage.getItem("WeatherAPI")) || [];
  var cityBtn = "";
  for (let i = 0; i < recentSearch.length; i++) {
    cityBtn += `<li><a class="waves-effect waves-light btn-large #b0bec5 blue-grey lighten-3 black-text cityBtn">
    ${recentSearch[i]}</a></li>`;
  }
 
  document.querySelector(".recentSearch").innerHTML = cityBtn;
}

displayLocalStorage();

searchBtnEl.on("click", function (event) {
  console.log(userInput[0].value);
  var locationApiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    userInput[0].value +
    "&appId=43261659cb8fa178b54f17f76141e0a4";

  fetch(locationApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      var name = data[0].name;
      console.log(lat, lon, name);

      document.getElementById("Name").textContent = "Name:" + " " + name;

      function fetchWeather(lat, lon) {
        var weatherApiUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=43261659cb8fa178b54f17f76141e0a4&units=imperial&cnt=5&daily";

        console.log(weatherApiUrl);

        fetch(weatherApiUrl)
          .then((response) => response.json())
          .then((data) => {
            var tempValue = data.current.temp;
            var weatherIconValue = data.current.weather[0].icon;
            var currentWindValue = data.current.wind_speed;
            var currentHumidityValue = data.current.humidity;
            var currentUvIndexValue = data.current.uvi;
            //var descValue = data.current.weather[0].description;

            document.getElementById("Temp").textContent =
              "Temp:" + " " + tempValue + "\u00B0 F";
            document.getElementById("weatherImage").textContent =
              data.current.weather[0].icon + weatherIconValue;
            document.getElementById("Wind").textContent =
              "Wind:" + " " + currentWindValue + "MPH";
            document.getElementById("Humidity").textContent =
              "Humidity:" + " " + currentHumidityValue + "%";
            document.getElementById("Index").textContent =
              "UV Index" + " " + currentUvIndexValue;

            console.log(data);

            // function setUVColor (currentUvIndexValue){
            console.log(currentUvIndexValue);

            uvIndexEl.classList.remove("veryHigh");
            uvIndexEl.classList.remove("moderate");
            uvIndexEl.classList.remove("high");
            uvIndexEl.classList.remove("low");
            if (currentUvIndexValue > 8) {
              uvIndexEl.classList.add("veryHigh");
            } else if (currentUvIndexValue > 6) {
              uvIndexEl.classList.add("high");
            } else if (currentUvIndexValue > 3) {
              uvIndexEl.classList.add("moderate");
            } else {
              uvIndexEl.classList.add("low");
            }

            console.log(currentUvIndexValue);

            function getForecast(lat, lon) {
              var forecastAPI =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat +
                "&lon=" +
                lon +
                "&exclude=current,hourly,minutely,alerts&appid=43261659cb8fa178b54f17f76141e0a4&units=imperial";

              console.log(forecastAPI);

              fetch(forecastAPI)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  var forecastEl = document.querySelector(".forecast");
                  var fday = "";
                  data.daily.forEach((value, index) => {
                    if (index > 0)
                      if (index < 6) {
                        var date = moment()
                          .add(index, "days")
                          .format("MM/DD/YY");
                        var imageIcon = value.weather[0].icon;
                        var temp = value.temp.day;
                        var wind = value.wind_gust;
                        var humidity = value.humidity;
                        fday += `<div class ="forecast-day">
                  <div class="col s12 m2">
                  <div class="card #1a237e indigo darken-4 white-text">
                  <p>${date}<p>
                  <div class="forecast-day--conditions"><img src=" http://openweathermap.org/img/wn/${imageIcon}.png"/></div>
                  <div class="forecast-day--temp">Temp: ${temp}<sup>\u00B0F</sup></div>
                  <div class="forecast-day--wind">Wind: ${wind}MPH</div>
                  <div class="forecast-day--humidity">Humidity: ${humidity}%</div>
                  </div>
                  </div>
                  </div>`;
                      }

                    forecastEl.innerHTML = fday;
                  });
                });
            }
            getForecast(lat, lon);
            // setUVColor();
          });
      }

      fetchWeather(lat, lon);
      displayLocalStorage();
    });
});
