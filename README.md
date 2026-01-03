🌤️ SkyCast – Weather Forecast Application

SkyCast is a simple and interactive weather forecast web application built using HTML, Tailwind CSS, and JavaScript.
The main goal of this project is to help users quickly check the current weather and 5-day forecast for any city or for their current location.

🚀 Features
* Fearch weather by city name
* Get weather for current location using API
* Displays:Temperature,Feels like temperature,Humidity,Wind speed,Visibility,Sunrise & Sunset time
* 5-day weather forecast with date, temperature, wind, and humidity
* Recently searched cities dropdown (stored using sessionStorage)
* Temperature unit toggle (°C / °F) for today’s temperature
* Dynamic background images based on weather conditions
* Extreme weather alerts for heat, cold, and storms
* Fully responsive for desktop, tablet, and mobile devices

🛠️ Technologies Used
* HTML
* Tailwind CSS
* JavaScript
* OpenWeatherMap API

📍 How the Application Works
* When the page loads, the app automatically tries to fetch weather data using the user’s current location.
* Users can also search for weather information by entering a city name.
* Recently searched cities appear in a dropdown for quick access.
* Weather data is fetched from the OpenWeatherMap API and displayed dynamically on the UI.
* Background images change depending on the weather condition (Clear, Rain, Clouds, etc.).
* If extreme temperatures are detected, a weather alert message is shown.

📁 Project Structure
Weather Project/
│
├── index.html
├── script.js
├── src/
│   └── output.css
├── README.md
└── .gitignore
