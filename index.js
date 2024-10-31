function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".type-box");
  searchCity(searchInput.value);
}
let searchForElement = document.querySelector("#search-form");
searchForElement.addEventListener("submit", searchSubmit);

function reloadWeather(response) {
  let temperatureElement = document.querySelector(".temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector(".icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "2188ffc414b4604d7f7e53b6abt0o00c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(reloadWeather);
}
searchCity("Paris");

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>${Math.round(
            day.temperature.maximum
          )}°</strong></div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}
function getForecast(city) {
  let apiKey = "2188ffc414b4604d7f7e53b6abt0o00c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}


function searchPlace (city){
let apiKey = "94a4oafdtf0d380ca243ac81b53c4ce3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(bringTemp);
}

function convertDay (timestamp) {
  let date = new Date (timestamp * 1000 ) ;
  let days = ["Sun" , "Mon" , "Tue" , "wed" , "Thu" , "Fri" , "Sat"];
  return days [date.getDay()];
}



function showingName (event){
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  searchPlace(searchBox.value);
}

function getForecast(city){
let apiKey ="94a4oafdtf0d380ca243ac81b53c4ce3";
let apiUrl =` https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
axios(apiUrl).then(showingForecast);
}



function showingForecast (response){
let forecastHtml= "";

response.data.daily.forEach(function (day,index){
  if (index < 5 ){
forecastHtml = 
forecastHtml + 
 ` 
<div class="forecast-day">
<div class="forecast-date">${convertDay(day.time)}</div>
<div class="forecast-emoji">
<img src = "${day.condition.icon_url}"/>
</div>
<div class="forecast-temps">
<div class="forecast-temp12">${Math.round(day.temperature.maximum)} ° </div>
<div class="forecast-temp12">${Math.round(day.temperature.minimum)} °</div>
</div>
</div>
`;
}
});


let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#searching");
searchFormElement.addEventListener("submit", showingName);


searchPlace("Tehran");

showingForecast("Tehran");
