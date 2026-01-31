const apiKey = "8663c4c8ba2198dab22582ad22f1c7b6";
const city = "San Antonio,CL";
const units = "metric";

const currentTemp = document.getElementById("current-temp");
const weatherDesc = document.getElementById("weather-desc");
const forecastList = document.getElementById("forecast");

async function getCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );

        if (!response.ok) throw new Error("Weather fetch failed");

        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;

        currentTemp.textContent = `Temperature: ${temp} °C`;
        weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    } catch (error) {
        console.error(error);
        currentTemp.textContent = "Weather unavailable";
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

        const dailyForecast = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0, 3);

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