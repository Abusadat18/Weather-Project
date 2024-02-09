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
    const weatherData = getWeatherData("Barddhaman");
    weatherData.then((data) => {
        const currentConditons = data.current;
        console.log(currentConditons);
        setLocation("Barddhaman");
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
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    var timeString = `${hours} : ${minutes} ${ampm}`;
    var dateString = `${daysOfWeek[dayName]} ${day} ${months[month]} ${year}`;
  
    document.getElementById('time').innerHTML = timeString;
    document.getElementById('date').innerHTML = dateString;
}


  

setDefaultWeather();
updateTime();
  




