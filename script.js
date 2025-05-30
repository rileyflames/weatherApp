// api key
const APIkey = "78bbde4ec706260667190e52961b622a";

const searchForm = document.querySelector("form");
const cityInput = document.getElementById("cityName");
const weatherInfo = document.querySelector(".weather")





const getWeather = async (cityName, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url); // Await the fetch call
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json(); // Await the JSON parsing
        
        return {
            city: data.name,
            coordinates: [data.coord.lat, data.coord.lon],
            temperature: data.main.temp,
            clouds: data.weather[0].main,
            cloudDescription: data.weather[0].description,
            windSpeed: data.wind.speed
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
         weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}


const displayWeather = async (name, key)=>{
    const weather = await getWeather(name, key);
    if(weather){
        weatherInfo.innerHTML = `
        <h3>City: ${weather.city}<h3>
        <p>Coordinates: Lat ${weather.coordinates[0]} & Lon ${weather.coordinates[1]}<p>
        <p>Temperature: ${weather.temperature}°C<p>
        <p>Clouds: ${weather.clouds}<p>
        <p>Cloud Description : ${weather.cloudDescription} <p>
        <p>Wind Speed: ${weather.windSpeed}<p> 
        `
    }
}


searchForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const CityName = cityInput.value.trim();

    if(CityName === ""){
        alert("please enter a city");
        return;
    }
    

    displayWeather(CityName, APIkey)
    cityInput.value = "";

})