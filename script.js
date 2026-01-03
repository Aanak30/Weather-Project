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


