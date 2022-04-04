var searchBtnEl = $(".submitBtn");
var userInput = $(".city");
//var cityNameEl = $(".cityName");
//var currentTempEl = $(".currentTemp");
var weatherIconEl = $(".weatherIcon");
var currentWindEl = $(".currentWind");
var currentHumidityEl = $(".currentHumidity");
var uvIndexEl = $(".uvIndex");

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

     document.getElementById("Name").textContent = "Name:" + " " + name
     

      function fetchWeather(lat, lon) {
        var weatherApiUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=43261659cb8fa178b54f17f76141e0a4";

        console.log(weatherApiUrl);

        fetch(weatherApiUrl)
          .then((response) => response.json())
          .then((data) => {
            var tempValue = data.current.temp;
            var weatherIconValue = data.current.weather[0].icon;
            var currentWindValue = data.current.wind_speed;
            var currentHumidityValue = data.current.humidity;
            var currentUvIndexValue = data.current.uvi;
            var descValue = data.current.weather[0].description;


            document.getElementById("Temp").textContent = "Temp:" + " " + tempValue
            document.getElementById("Icon").textContent = weatherIconValue
            document.getElementById("Wind").textContent = "Wind:" + " " + currentWindValue
            document.getElementById("Humidity").textContent = "Humidity:"+ " " + currentHumidityValue
            document.getElementById("Index").textContent = "UV Index" + " " + currentUvIndexValue

            console.log(data);
            console.log(tempValue);
            console.log(weatherIconValue);
            console.log(currentWindValue);
            console.log(currentHumidityValue);
            console.log(currentUvIndexValue);
            console.log(descValue);
          });
      }

      fetchWeather(lat, lon);
      });
});
