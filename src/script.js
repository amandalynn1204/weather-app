function formatTime() {
  let now = new Date();
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

function formatDate() {
  let now = new Date();
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

function displayWeather(response) {
  if (response.data.city === undefined) {
    alert("Sorry, we can't find that city! 😢");
    return;
  }

  console.log(response);

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
  timeElement.innerHTML = formatTime();
  dateElement.innerHTML = formatDate();
  descriptionDisplay.innerHTML = response.data.condition.description;
  windDisplay.innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let apiKey = `9a7ca83bt1f54ebc3o8f9d804f5e2b0e`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
  searchInput.value = "";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("cleveland");
