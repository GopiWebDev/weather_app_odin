const API_KEY = 'b9fed063554c4bbab0b154954241605';
const form = document.querySelector('[data-form]');
const input = document.querySelector('[data-input]');
const button = document.querySelector('[data-submit]');
const cityNameDisplay = document.querySelector('[data-city-name]');
const celsiusDisplay = document.querySelector('[data-celsius]');
const humidityDisplay = document.querySelector('[data-humidity]');
const conditionDisplay = document.querySelector('[data-condition]');

button.addEventListener('click', getInput);

function getInput() {
  if (input.value == null || input.value === '') return;
  cityName = input.value;
  getWeather(cityName);
  input.value = null;
}

async function getWeather(cityName) {
  const api = fetch(
    `https://api.weatherapi.com/v1/current.json?key=b9fed063554c4bbab0b154954241605&q=${cityName}`
  );
  const data = await api.then((d) => d.json());
  const display = {
    city: data.location.name,
    country: data.location.country,
    celsius: data.current.temp_c,
    humidity: data.current.humidity,
    condition: data.current.condition.text,
  };
  render(display);
}

function render(display) {
  cityNameDisplay.innerText = `${display.city}, ${display.country}`;
  celsiusDisplay.innerText = `${display.celsius}° C`;
  humidityDisplay.innerText = `Humidity : ${display.humidity} %`;
  conditionDisplay.innerText = display.condition;
}

window.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return;
  getInput();
});
