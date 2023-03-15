function formatDate(currenttime) {
  let daysoftheweek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysoftheweek[currenttime.getDay()];
  let hour = currenttime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currenttime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#current-daytime");
let currenttime = new Date();
dateElement.innerHTML = formatDate(currenttime);

function updateWeather(response) {
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(response.data.main.temp);
  let min = document.querySelector("#min");
  let max = document.querySelector("#max");
  let general = document.querySelector("#general");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity-percentage");
  min.innerHTML = Math.round(response.data.main.temp_min);
  max.innerHTML = Math.round(response.data.main.temp_max);
  general.innerHTML = response.data.weather[0].main;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
}

function searchNewCity(event) {
  event.preventDefault();
  let city = document.querySelector("#opening-city");
  let searchtextinput = document.querySelector("#enter-city");
  let apiKey = "764ff9ebc4de0bf016bf357d2d303943";
  city.innerHTML = `${searchtextinput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchtextinput.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

let searchcity = document.querySelector("#update-city-form");
searchcity.addEventListener("submit", searchNewCity);

function showCurrentWeather(response) {
  let city = document.querySelector("#opening-city");
  city.innerHTML = response.data.list[0].name;
  let degrees = document.querySelector("#degrees");
  let min = document.querySelector("#min");
  let max = document.querySelector("#max");
  let general = document.querySelector("#general");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity-percentage");
  degrees.innerHTML = Math.round(response.data.list[0].main.temp);
  min.innerHTML = Math.round(response.data.list[0].main.temp_min);
  max.innerHTML = Math.round(response.data.list[0].main.temp_max);
  general.innerHTML = response.data.list[0].weather[0].main;
  windSpeed.innerHTML = Math.round(response.data.list[0].wind.speed);
  humidity.innerHTML = Math.round(response.data.list[0].main.humidity);
}

function retrieveLatLon(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiKey = "764ff9ebc4de0bf016bf357d2d303943";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function retrieveCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveLatLon);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", retrieveCurrentPosition);
