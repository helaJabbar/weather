//classe pour les previsions meteologiques
class Forecast {
    constructor(day, weatherType, highTemp, lowTemp, imageUrl) {
      this.day = day;
      this.weatherType = weatherType;
      this.highTemp = highTemp;
      this.lowTemp = lowTemp;
      this.imageUrl = imageUrl;
    }
  
    render() {
      return `
        <div class="forecast">
          <h1>${this.day}</h1>
          <img src="${this.imageUrl}" alt="${this.weatherType}" />
          <p>${this.weatherType}</p>
          <p class="temperatures">
            <span class="high">${this.highTemp}</span>
            <span class="low">${this.lowTemp}</span>
          </p>
        </div>
      `;
    }
  }
  
  class WeatherApp {
    constructor() {
      this.container = document.querySelector(".row");
      this.cityTitle = document.querySelector(".subtitle-line h2");

      this.cities = {
        Bizerte: { latitude: 37.2744, longitude: 9.8739 },
        Tunis:   { latitude: 36.8065, longitude: 10.1815 },
        Lausane: { latitude: 46.5286, longitude: 6.6207 }
      };

      this.currentCity = "Bizerte"; // Default city
      this.addCityListeners();
    }
  
    addCityListeners() {
      const cityLinks = document.querySelectorAll(".links a");
      cityLinks.forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();//empecher le comportement par defaut
            const city = event.target.textContent;
            this.currentCity = city;
            this.cityTitle.textContent = city; // Update city title
            this.renderForecasts();
        });
      });
    }
  
    async fetchWeatherData() {
      const { latitude, longitude } = this.cities[this.currentCity];
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  
    getWeatherIconUrl(maxTemp) {
        if (maxTemp >= 20) return "./assets/some_sun.png";
        if (maxTemp >= 15) return "./assets/some_clouds.png"; 
        return "./assets/some_rain.png";
      
    }
  
    mapWeatherDataToForecasts(data) {
      const days = this.getNextFourDays();
      return data.daily.temperature_2m_max.slice(0, 4).map((maxTemp, index) => {
        const minTemp = data.daily.temperature_2m_min[index];
        const day = days[index] || `Day ${index + 1}`;
        return new Forecast(
          day,
          this.getWeatherType(maxTemp),
          `${Math.round(maxTemp)}°C`,
          `${Math.round(minTemp)}°C`,
          this.getWeatherIconUrl(Math.round(maxTemp))
        );
      });
    }
  
    getNextFourDays() {
      const days = [];
      const today = new Date();
      for (let i = 0; i < 4; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        days.push(futureDate.toLocaleDateString("en-US", { weekday: "long" }));
      }
      return days;
    }
  
    getWeatherType(maxTemp) {
        if (maxTemp >= 20) return "Sunny";
        if (maxTemp >= 15) return "Cloudy";
         return "Rainy";
    }
  
    async renderForecasts() {
      const data = await this.fetchWeatherData();
      if (!data) return;
  
      const forecasts = this.mapWeatherDataToForecasts(data);
      this.container.innerHTML = forecasts
        .map((forecast) => forecast.render())
        .join("");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const app = new WeatherApp();
    app.renderForecasts();
  });
  