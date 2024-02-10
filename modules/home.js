async function getWeatherData(name) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=211bab2228c442e69df233619240302&q=${name}`, {
        mode: "cors"
    })
    if (response.ok) {
        const weatherData = await response.json();
        return weatherData;
    } else {
        return Promise.reject("Enter a valid location");
    }

}

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const selectMode = document.querySelector(".mode-select");
const locationName = document.querySelector(".location-name");
const countryName = document.querySelector(".countryName");
const weatherIcon = document.querySelector(".weather-condition-icon");
const temperature = document.querySelector(".temp-value");
const weatherText = document.querySelector(".weather-condition-text");



function setCustomWeather(value) {
    const weatherData = getWeatherData(capitalizeFirstLetter(value));
    weatherData.then((data) => {
        const currentConditons = data.current;
        const locationDetails = data.location;
        console.log(locationDetails);
        console.log(currentConditons);
        setLocation(locationDetails.name,locationDetails.country);
        setWeatherIcon(currentConditons);
        setTemperature(currentConditons);
        setWeatherText(currentConditons);
        setSelectModeListener(currentConditons);
        setBackgroundVideo(currentConditons.condition.text);
    })
        .catch((err) => {
        alert(err);
    })
}

function setLocation(location,country) {
    locationName.textContent = location;
    countryName.textContent = country;
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

function setCurrentDate() {
    const today = new Date();

}

function updateTime() {
    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
      ];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let day = now.getDate();
    let month = now.getMonth() + 1; // January is 0
    let year = now.getFullYear();
    let dayName = now.getDay();

    let ampm = hours <= 12 ? "am" : "pm";
  
    // Add leading zeros if necessary
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    var timeString = `${hours}:${minutes} ${ampm}`;
    var dateString = `${daysOfWeek[dayName]} ${day} ${months[month]} ${year}`;
  
    document.getElementById('time').innerHTML = timeString;
    document.getElementById('date').innerHTML = dateString;
}

function setSelectModeListener(obj) {
    selectMode.addEventListener("change", () => {
        setTemperature(obj);
    });
}

function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
  }

searchBtn.addEventListener("click", () => {
    setCustomWeather(searchInput.value);
})

function setBackgroundVideo(condition) {
    const video = document.querySelector("video");
    const bgSrc = document.querySelector(".bg-src");
    if (condition === "Mist") {
        bgSrc.src = "./Videos/mist.mp4";
    }
    else if (condition === "Overcast") {
        bgSrc.src = "./Videos/overcast.mp4";
    }
    else if (condition === "Partly cloudy") {
        bgSrc.src = "./Videos/partly-cloudy.mp4";
    }
    else if ((condition === "Light rain") || (condition === "Moderate rain")) {
        bgSrc.src = "./Videos/rain.mp4";
    } else {
        bgSrc.src = "./Videos/clear.mp4";
    }
    video.load()
    video.play();
}

document.addEventListener("DOMContentLoaded", () => {
    setCustomWeather("Kolkata");
    updateTime();
    setInterval(updateTime, 1000);
})


  




