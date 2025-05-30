// api key
const APIkey = "78bbde4ec706260667190e52961b622a"; // api key used to access the weather information

const searchForm = document.querySelector("form"); // connect to the form and acess the submit button
const cityInput = document.getElementById("cityName");// connect to the input field of the html file
const weatherInfo = document.querySelector(".weather") // get the div where we will render the information we get from the api





const getWeather = async (cityName, apiKey) => {// get the city name and api key as parametres 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`; // this is the URL we use to fetch data and it requires a city name and api key

    // we use a try and catch block to protect our code
    try {
        // Summary of this code
        // we nest the code we want to execute inside a try block
        // we create a variable called response and tell the program to fetch the information we want from the url.
        // if the information we give doesn't match the response then it throws an error.  else it returns the data that we requested.
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
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
        weatherInfo.innerHTML = `<p style="color:red;">${error.message === "Failed to fetch" ? "Network error. Please check your connection." : error.message}</p>`;
    }
};



const displayWeather = async (name, key) => {
    weatherInfo.innerHTML = "<p>Loading...</p>"; // Show loading message
    const weather = await getWeather(name, key);
    if (weather) {
        weatherInfo.innerHTML = `
            <h3>City: ${weather.city}</h3>
            <p>Coordinates: Lat ${weather.coordinates[0]} & Lon ${weather.coordinates[1]}</p>
            <p>Temperature: ${weather.temperature}°C</p>
            <p>Clouds: ${weather.clouds}</p>
            <p>Cloud Description: ${weather.cloudDescription}</p>
            <p>Wind Speed: ${weather.windSpeed}</p>
        `;
    }
}


searchForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const CityName = cityInput.value.trim();

    if(CityName === ""){
        alert("please enter a city");
        return;
    }

    displayWeather(CityName, APIkey);
    cityInput.value = "";
    cityInput.focus(); // <-- this helps keep the input in focus 
})