import { apiKey } from "./keys.js"
import { ICON_MAP } from "./iconmap.js"

async function handleLocationSubmit() {

    const location = document.getElementById('city').innerText

    const geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`

    try {
        const geoResponse = await fetch(geoApi)

        const geoDataArray = await geoResponse.json()
        const geoData = geoDataArray[0]

        await getWeatherApi(geoData)
        document.activeElement.blur()
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getWeatherApi(geoData) {
    if (geoData && geoData.lat && geoData.lon) {
        try {

            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${apiKey}`

            const weatherResponse = await fetch(weatherApi)

            const weatherData = await weatherResponse.json()

            const weatherJson = parseWeatherData(weatherData)
            renderWeather(weatherJson)
            return weatherJson
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
}

function parseWeatherData({ weather, main, wind, name }) {
    const {
        id: iconCode,
        description: description
     } = weather[0]

    const {
        temp: temp,
        feels_like: feelsLike,
        humidity: humidity
    } = main

    const {
        speed: windSpeed
    } = wind

    // Not using destructuring because it is the only element in its object
    const cityName = name

    return {
        temp: Math.round(temp),
        feelsLike: Math.round(feelsLike),
        humidity: Math.round(humidity),
        windSpeed: Math.round(windSpeed),
        iconCode,
        description,
        cityName,
    }
}

// this is a helper function for the renderWeather function below to make our document.querySelector process faster and with less code
function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
    return `/media/weather-icons/${ICON_MAP.get(iconCode)}.svg`
  }

const weatherIcon = document.querySelector('[data-weather-icon]')
const weatherIconBig = document.querySelector('[data-weather-icon-big]')
// Plugging weatherData into the DOM
function renderWeather(weatherJson) {
    weatherIcon.src = getIconUrl(weatherJson.iconCode)
    weatherIconBig.src = getIconUrl(weatherJson.iconCode)
    // setValue('current-weather-icon', weatherJson.iconCode)
    setValue('current-temp', weatherJson.temp)
    setValue('current-temp-big', weatherJson.temp)
    setValue('city', weatherJson.cityName)
    setValue('weather-status', weatherJson.description)
    setValue('feels-like', weatherJson.feelsLike)
    setValue('humidity', weatherJson.humidity)
    setValue('wind', weatherJson.windSpeed)
}


export { handleLocationSubmit }