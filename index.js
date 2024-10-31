// Set up event listener for the form submission
const form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#search-input");
  if (!cityInput.value) {
    alert("Please enter a city name.");
    return;
  }
  retrieveWeather(cityInput.value);
}

function retrieveWeather(city) {
  const apiKey = "4b10c2a77454teo9d0ff304c4b0d513b";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayCurrentWeather)
    .catch((error) => {
      console.error("Error retrieving weather:", error);
      alert("Unable to retrieve weather data. Please try again.");
    });
}

function displayCurrentWeather(response) {
  const cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  const dateElement = document.querySelector("#current-date");
  const timestamp = response.data.time * 1000;
  const date = new Date(timestamp);
  dateElement.innerHTML = formatDateTime(date);

  const descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.condition.description;

  const humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  const windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  const iconElement = document.querySelector("#current-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}" class="current-temperature-icon" />`;

  const temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  retrieveForecast(response.data.city);
}

function retrieveForecast(city) {
  const apiKey = "4b10c2a77454teo9d0ff304c4b0d513b";
  const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(forecastUrl)
    .then(showForecast)
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
    });
}

function showForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach((day, index) => {
    if (index < 6) {
      forecastHTML += `
        <div class="weather-forecast-data">
          <div class="weather-forecast-day">
            ${formatDayOfWeek(day.time)}
          </div>
          <div class="wf-icon">
            <img src="${day.condition.icon_url}" alt="${day.condition.icon}" class="weather-forecast-icon" />
          </div>
          <div class="weather-forecast-high-low">
            <span class="wf-high">${Math.round(day.temperature.maximum)}°</span>
            <span class="wf-low">${Math.round(day.temperature.minimum)}°</span>
          </div>
        </div>
      `;
    }
  });

  const forecastContainer = document.querySelector("#weather-forecast");
  forecastContainer.innerHTML = forecastHTML;
}

function formatDayOfWeek(timestamp) {
  const date = new Date(timestamp * 1000);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
}

function formatDateTime(date) {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${dayOfWeek} ${hours}:${minutes}`;
}

// Initial weather fetch for a default city
retrieveWeather("Addis Ababa");

