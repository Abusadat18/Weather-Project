async function getWeatherData(name) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=211bab2228c442e69df233619240302&q=${name}`, {
        mode: "cors"
    })
    const weatherInfo = await response.json();
    console.log(response);
    console.log(weatherInfo);
}

getWeatherData("kolkata")

