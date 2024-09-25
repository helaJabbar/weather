const getWeather = async () => {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.2744&longitude=9.8739&daily=temperature_2m_max,temperature_2m_min&timezone=auto');
        const data = await response.json();

        // Extract temperatures for the next days
        const dailyMaxTemps = data.daily.temperature_2m_max;
        const dailyMinTemps = data.daily.temperature_2m_min;

        // Function to select weather image based on temperature
        const selectImage = (maxTemp) => {
            if (maxTemp >= 20) {
                return 'assets/some_sun.png'; // Hot weather image
            } else if (maxTemp >= 10 && maxTemp < 20) {
                return 'assets/some_clouds.png'; // Warm weather image
            }  else {
                return 'assets/some_rain.png'; // Cold or rainy weather image
            }
        };

        // Function to get day names starting from today
        const getDayNames = () => {
            const dayNames = [];
            const today = new Date();
            for (let i = 0; i < 4; i++) {
                const nextDay = new Date();
                nextDay.setDate(today.getDate() + i);
                dayNames.push(nextDay.toLocaleDateString('en-US', { weekday: 'long' }));
            }
            return dayNames;
        };

        // Get day names
        const dayNames = getDayNames();

        // Update the temperatures, images, and day names in the HTML
        const forecastElements = document.querySelectorAll('.forecast');
        forecastElements.forEach((element, index) => {
            if (index < dailyMaxTemps.length) {
                const highTemp = dailyMaxTemps[index];
                const lowTemp = dailyMinTemps[index];
                element.querySelector('.high').innerText = `${highTemp}°C`;
                element.querySelector('.low').innerText = `${lowTemp}°C`;
                element.querySelector('img').src = selectImage(highTemp);
                element.querySelector('h1').innerText = dayNames[index];
            }
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};


getWeather();
setInterval(getWeather, 3600000);

