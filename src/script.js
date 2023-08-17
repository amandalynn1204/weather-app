// time and date
function formattedTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();

  let minutes = now.getMinutes();
  let amPm = "AM";

  if (hour >= 12) {
    amPm = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes} ${amPm}`;
}

function formattedDate(now) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  return `${month} ${date}, ${year}`;
}

let timeDisplay = document.querySelector("#time");
let dateDisplay = document.querySelector("#date");
timeDisplay.innerHTML = formattedTime(new Date());
dateDisplay.innerHTML = formattedDate(new Date());

// search engine
function displayWeather(response) {
  let cityDisplay = document.querySelector("#city");
  let tempDisplay = document.querySelector("#current-temp");
  let weatherDisplay = document.querySelector("#weather-description");
  let windDisplay = document.querySelector("#wind-speed");

  let city = response.data.name;
  let temp = response.data.main.temp;
  temp = Math.round(temp);
  let weatherDescription = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  wind = Math.round(wind);

  cityDisplay.innerHTML = city;
  tempDisplay.innerHTML = `${temp}°F`;
  weatherDisplay.innerHTML = weatherDescription;
  windDisplay.innerHTML = `Wind: ${wind} mph`;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "imperial";
  let apiKey = "cbce807e19110667245ab32993ad3b8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeather);
}

function askForLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  city = city.trim();
  let unit = "imperial";
  let apiKey = "cbce807e19110667245ab32993ad3b8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  if (city === "") {
    alert("Please enter a city 😊");
  } else {
    axios.get(apiUrl).then(displayWeather);
    searchInput.value = "";
  }
}

let city = "Cleveland";
let unit = "imperial";
let apiKey = "cbce807e19110667245ab32993ad3b8c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayWeather);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

setTimeout(askForLocation, 2500);

// switching temperature measurements
function switchTempMeasurement() {
  let currentTemp = document.querySelector("#current-temp");
  let temp = currentTemp.innerHTML;
  let tempButton = document.querySelector("#alt-temp");

  if (tempButton.innerHTML === "/°C") {
    currentTemp.innerHTML = `23°C`;
    tempButton.innerHTML = "/°F";
  } else {
    currentTemp.innerHTML = "73°F";
    tempButton.innerHTML = "/°C";
  }
}

let altTempButton = document.querySelector("#alt-temp");
altTempButton.addEventListener("click", switchTempMeasurement);
