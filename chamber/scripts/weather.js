const apiKey = "8663c4c8ba2198dab22582ad22f1c7b6";
const city = "San Antonio,CL";
const units = "metric";

const currentTemp = document.getElementById("current-temp");
const weatherDesc = document.getElementById("weather-desc");
const highTemp = document.getElementById("high-temp");
const lowTemp = document.getElementById("low-temp");
const humidity = document.getElementById("humidity");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const weatherIcon = document.getElementById("weather-icon");
const forecastList = document.getElementById("forecast");

function formatTime(unixTime) {
    return new Date(unixTime * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

async function getCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );

        if (!response.ok) throw new Error("Weather fetch failed");

        const data = await response.json();

        currentTemp.textContent = Math.round(data.main.temp);
        weatherDesc.textContent =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);

        highTemp.textContent = Math.round(data.main.temp_max);
        lowTemp.textContent = Math.round(data.main.temp_min);
        humidity.textContent = data.main.humidity;

        sunriseEl.textContent = formatTime(data.sys.sunrise);
        sunsetEl.textContent = formatTime(data.sys.sunset);

        const icon = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

    } catch (error) {
        console.error(error);
        currentTemp.textContent = "--";
        weatherDesc.textContent = "Weather unavailable";
    }
}

async function getForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
        );

        if (!response.ok) throw new Error("Forecast fetch failed");

        const data = await response.json();
        forecastList.innerHTML = "";

        const dailyForecast = data.list
            .filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);

        dailyForecast.forEach(day => {
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(day.main.temp);

            const li = document.createElement("li");
            li.textContent = `${dayName}: ${temp} °C`;
            forecastList.appendChild(li);
        });

    } catch (error) {
        console.error(error);
        forecastList.innerHTML = "<li>Forecast unavailable</li>";
    }
}

getCurrentWeather();
getForecast();