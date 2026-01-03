const cityInput = document.querySelector("#Scity");
const searchBtn = document.querySelector("#searchBtn");
const apiKey="9b94989e96d43f924b5d393e8fd93063";
let currentTempC = null;
const dropdown = document.getElementById("cityDropdown");

const backgroundMap = {
  Clear: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Clouds: "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Rain: "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Drizzle: "https://images.unsplash.com/photo-1745133235442-8c2be4981028?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Thunderstorm: "https://images.unsplash.com/photo-1585074245728-eedb0cc44a66?q=80&w=1232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Snow: "https://images.unsplash.com/photo-1486944670663-e0a2ea5018eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Mist: "https://images.unsplash.com/photo-1525891618908-24765267dab7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Smoke: "https://images.unsplash.com/photo-1548184187-b0b21e7b5dce?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Haze: "https://plus.unsplash.com/premium_photo-1673081112888-f877c594ad18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};



document.querySelector(".date").textContent =
  new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  
//event listener
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
 

  if (city === "") {
    showError("Please enter a city name");
    return;
  }

  getWeatherByCity(city);
});

window.addEventListener("load", () => {
  getWeatherByCurrentLocation();
});

document.addEventListener("click", (e) => {
  if (!cityInput.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

//weather by city
async function getWeatherByCity(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    updateUI(data);
    saveCity(city);  // save city into my storage

    // 🔥 Extract coords ONCE
    const { lat, lon } = data.coord;
    get5DayForecast(lat, lon);

  } catch (error) {
    showError(error.message);
  }

}

//Set WeatherIcon Function
function setWeatherIcon(iconCode) {
  document.getElementById("weatherIcon").src = 
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

// function to show error 
function showError(message) {
  const errorBox = document.getElementById("errorBox");

  errorBox.textContent = message;

  errorBox.className =
    "mt-3 text-center px-4 py-2 rounded-xl bg-red-500/30 text-red-200 border border-red-400";

  errorBox.classList.remove("hidden");
}  

// Get 5 day Forecast Function
async function get5DayForecast(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("Forecast not available");

    const data = await response.json();

    // CALL CORRECT FUNCTION
    displayFiveDayForecast(data.list);

  } catch (error) {
    showError(error.message);
  }
}

function displayFiveDayForecast(forecastList) {                              //creating list for forcast
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  const dailyForecast = forecastList.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  

  dailyForecast.forEach(day => {
    const date = new Date(day.dt_txt).toDateString();
    const temp = Math.round(day.main.temp);
    const wind = day.wind.speed;
    const humidity = day.main.humidity;
    const icon = day.weather[0].icon;

const card = `
  <div class="bg-white/20 backdrop-blur-xl rounded-2xl 
              text-center text-white shadow-lg
              p-4 h-auto overflow-hidden">

    <p class="text-sm font-semibold mb-2">${date}</p>

    <img 
      src="https://openweathermap.org/img/wn/${icon}@2x.png" 
      class="mx-auto w-12 h-12"
    />

    <p class="text-m font-bold  mt-2">${temp}°C</p>

    <div class="flex justify-center gap-1 text-xs mt-2 text-white/60">
      <span class="whitespace-nowrap">💨 ${wind.toFixed(1)} km/h</span>
      <span class="whitespace-nowrap">💧 ${humidity}%</span>
    </div>

  </div>
`;

    forecastContainer.innerHTML += card;
  });
}

//function get weather by current location
function getWeatherByCurrentLocation() {                     /// to get current location wheather insightes
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeatherByCoords(lat, lon);
    },
    () => {
      showError("Location access denied");
    }
  );
}

//get weather by corrds function
async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("Location weather failed");

    const data = await response.json();

    updateUI(data);

    get5DayForecast(lat, lon);

  } catch (error) {
    showError(error.message);
  }
}
