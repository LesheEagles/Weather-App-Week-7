function updateCurrentCity(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${response.data.city}`;
}

function updateCurrentDay(response) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = days[now.getDay()];
  let dayElement = document.querySelector("#current-day");
  dayElement.innerHTML = currentDay;
}

function updateCurrentTime(response) {
  let currentMinutes = now.getMinutes();
  currentMinutes = ("0" + currentMinutes).slice(-2);
  let currentHours = now.getHours();
  currentHours = ("0" + currentHours).slice(-2);
  let currentTimeElement = document.querySelector("#current-time");
  currentTimeElement.innerHTML = `${currentHours}:${currentMinutes}`;
}

function updateCurrentWeatherDescription(response) {
  let currentWeatherDescriptionElement = document.querySelector("#current-weather-description");
  currentWeatherDescriptionElement
