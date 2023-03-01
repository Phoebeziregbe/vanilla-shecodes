function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = `d1da563db17a36b0f688b57d60b0a5d7`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  celsiusElement = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusElement);
  let liveElement = document.querySelector("#live");
  liveElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].icon}`);
  console.log(response.data);
  getForecast(response.data.coord);
}
function theHandle(city) {
  let apiKey = "d1da563db17a36b0f688b57d60b0a5d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let celsiusElement = null;

function search(event) {
  event.preventDefault();
  let filmElement = document.querySelector("#film");
  theHandle(filmElement.value);
}

function farTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  far - link.classList.add("active");
  let fahrenheiTemp = (celsiusElement * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheiTemp);

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    farLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusElement);
  }

  function formatDay(timestamp) {
    let fordate = new Date(timestamp * 1000);
    let day = date.getDay;
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function displayForecast(response) {
    let forecastElement = document.querySelector(`#forecast`);
    forecast = response.data.daily;
    let forecastHTML = `<div class =row>`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2" >
      <div class="weak">${formatDay(forecastDay.dt)}</div>;
      <img src="http://openweathermap.org/img/wn/${forecastDay}.weather[0].icon}@2x.png"
      alt=""
      width="42"/>


    <div class="weather-forecast-temp">
      <span class="weather-forecast-max">${Math.round(
        forecastDay.temp.max
      )} °</span>
      <span class="weather-forecast-min">${Math.round(
        forecastDay.temp.min
      )} °</span>
    </div>`;
      }
    });
  }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  let farLink = document.querySelector("#far-link");
  farLink.addEventListener("click", farTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  let form = document.querySelector("#search-input");
  form.addEventListener("submit", search);
}
