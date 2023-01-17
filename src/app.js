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

function displayTemperature(response) {
  console.log(response.data);
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
  dateElement.innerHTML = formatDate(respne.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].icon`);

  celsiusElement = response.data.main.temp;
}

function theHandle(city) {
  let apiKey = "d1da563db17a36b0f688b57d60b0a5d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
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
  celsiusLink.classlist.remove("active");
  farLink.classlist.add("active");
  let fahrenheiTemp = (celsiusElement * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheiTemp;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classlist.remove("active");
  farLink.classlist.add("active");
  let temperatureElement = document.querySelector("temperature");
  temperatureElement.innerHTML = Math.round(celsiusElement);
}

let form = document.querySelector("#search-input");
form.addEventListener("submit", search);

let farLinkElement = document.querySelector("#far-link");
farLink.addEventListener("click", farTemperature);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
