    const apiKey = "119d1a368a6cfc193f68d2f73564b55d";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("search-input");

const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-name");

const temp = document.getElementById("temp");
const weather = document.getElementById("weather");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const weatherIcon = document.getElementById("weather-icon");

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (response.status === 401) {
            alert("API key is not activated yet.");
            return;
        }

        if (response.status === 404) {
            alert("City not found.");
            return;
        }

        cityName.textContent = data.name;
        countryName.textContent = data.sys.country;

        temp.textContent = `${Math.round(data.main.temp)}°C`;

        weather.textContent = data.weather[0].main;

        humidity.textContent = `${data.main.humidity}%`;

        wind.textContent = `${Math.round(data.wind.speed)} km/h`;

        pressure.textContent = `${data.main.pressure} hPa`;

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    }

    catch(error){

        console.error(error);
        alert("Something went wrong!");

    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }

});

cityInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){
        getWeather(cityInput.value.trim());
    }

});

getWeather("Karachi");