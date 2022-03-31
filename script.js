var apiUrlRequest =
  "https://api.openweathermap.org/data/2.5/weather?q=' +inputVal.value+ '&id=6167865&appid=43261659cb8fa178b54f17f76141e0a4";

var searchBtnEl = $(".submitBtn");
var userInput = $(".city.text");

function getRequest() {
  searchBtnEl.on("click", function (event) {
    var inputVal = userInput.text;
    console.log(inputVal.value + [""]);

    console.log("search button pressed");
    fetch(apiUrlRequest)
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
}
//             .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//           //var cityList = document.createElement("li");
//           //listItem.textContent = data[i].html_url;
//           //cityList.appendChild(listItem);
//           console.log([i]);
//         }
//       });
//   });
getRequest();
