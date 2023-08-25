function formatTime(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let amOrPm = "AM";

  if (hour >= 12) {
    amOrPm = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last updated: ${day} ${hour}:${minutes} ${amOrPm}`;
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  return `${month} ${date}, ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="day">${formatDay(forecastDay.time * 1000)}</div>
            <img
              class="icon"
              src="${forecastDay.condition.icon_url}"
            />
            <span class="temp-low">
              <span id="temp-low">${Math.round(
                forecastDay.temperature.minimum
              )}</span>°
            </span>
            <span class="temp-high">
              <span id="temp-high">${Math.round(
                forecastDay.temperature.maximum
              )}</span>°
            </span>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let lat = coords.latitude;
  let lon = coords.longitude;
  let apiKey = `9a7ca83bt1f54ebc3o8f9d804f5e2b0e`;

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let searchInput = document.querySelector("#search-input");
  if (response.data.city === undefined) {
    alert(
      `Sorry, we can't find that city! 😢 Try https://www.google.com/search?q=weather+${searchInput.value}`
    );
    searchInput.value = "";
    return;
  }
  searchInput.value = "";

  let cityElement = document.querySelector("#city");
  let weatherIconElement = document.querySelector("#current-weather-icon");
  let tempElement = document.querySelector("#current-temp");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let descriptionDisplay = document.querySelector("#weather-description");
  let windDisplay = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  weatherIconElement.setAttribute("src", response.data.condition.icon_url);
  weatherIconElement.setAttribute("alt", response.data.condition.icon);
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  timeElement.innerHTML = formatTime(response.data.time * 1000);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  descriptionDisplay.innerHTML = response.data.condition.description;
  windDisplay.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = `9a7ca83bt1f54ebc3o8f9d804f5e2b0e`;
  let currentTempUnit = document.querySelector("#current-temp-unit");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9a7ca83bt1f54ebc3o8f9d804f5e2b0e";
  let currentTempUnit = document.querySelector("#current-temp-unit");
  let unit = "imperial";
  if (currentTempUnit.innerHTML === "°C") {
    unit = "metric";
  }
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function askForLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#search-form");
let locationButton = document.querySelector("#location-button");
let altTempButton = document.querySelector("#alt-temp-unit");

searchForm.addEventListener("submit", handleSubmit);
locationButton.addEventListener("click", askForLocation);

search("cleveland");
