const checkBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".weather-input");
const weatherEl = document.querySelector(".weather");
const menuOptionsEl = document.querySelector(".dropdown-content");

const cities = [];

const apiKey = "1a42eb189c06352349faade92b23e721";

checkBtn.addEventListener("click", checkWeather);

function checkWeather() {
  const city = cityInput.value;
  cityInput.value = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => localStorage.setItem(city, JSON.stringify(data)))
    .then(() => updateWeatherUI(JSON.parse(localStorage.getItem(city))));
}

function updateWeatherUI(data) {
  const cityName = data.name;
  const [{ icon }] = data.weather;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  let [{ description }] = data.weather;
  description = description
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");

  const html = `
  <div class="card">
    <h2 class="city">Weather in ${cityName}</h2>
    <div class="temp">${Math.round(temp)}°C</div>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="weather-icon" />
    <div class="description">Description: ${description}</div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="wind">Wind speed: ${speed} km/h</div>
  </?div>`;

  removeAllChildNodes(weatherEl);

  weatherEl.insertAdjacentHTML("afterbegin", html);

  updateMenuUI(cityName);
}

function updateMenuUI(city) {
  if (cities.includes(city)) return;
  if (cities.length >= 11) cities.pop();
  cities.unshift(city);

  removeAllChildNodes(menuOptionsEl);

  for (let city of cities) {
    const html = `
    <a href="#">${city}</a>
    `;
    menuOptionsEl.insertAdjacentHTML("afterbegin", html);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
