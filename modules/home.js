async function getWeatherData(name) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=211bab2228c442e69df233619240302&q=${name}`, {
        mode: "cors"
    })
    if (response.ok) {
        const weatherData = await response.json();
        return weatherData;
    } else {
        console.log("Error");
    }

}

getWeatherData("kolkata")

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const selectMode = document.querySelector(".mode-select");
const locationName = document.querySelector(".location-name");
const weatherIcon = document.querySelector(".weather-condition-icon");
const temperature = document.querySelector(".temp-value");
const weatherText = document.querySelector(".weather-condition-text");

function setDefaultWeather() {
    const weatherData = getWeatherData("Kolkata");
    weatherData.then((data) => {
        const currentConditons = data.current;
        console.log(currentConditons);
        setLocation("Kolkata");
        setWeatherIcon(currentConditons);
        setTemperature(currentConditons);
        setWeatherText(currentConditons);
    })
}

function setLocation(location) {
    locationName.textContent = location;
}

function setWeatherIcon(obj) {
    weatherIcon.src = obj.condition.icon;
}

function setTemperature(obj) {
    if (selectMode.value === "fahrenheit") {
        temperature.textContent = `${obj.temp_f}°f`;
    } else {
        temperature.textContent = `${obj.temp_c}°c`;
    }
}

function setWeatherText(obj) {
    weatherText.textContent = obj.condition.text;
}

setDefaultWeather();


