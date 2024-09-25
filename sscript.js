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
      
      this.weatherData = {
        Bizerte: [
          new Forecast("Today", "Sunny", "22°C", "15°C", "./assets/some_sun.png"),
          new Forecast("Tomorrow", "Cloudy", "20°C", "14°C", "./assets/some_clouds.png"),
          new Forecast("Wednesday", "Rainy", "18°C", "12°C", "./assets/some_rain.png"),
          new Forecast("Thursday", "Sunny", "21°C", "13°C", "./assets/some_sun.png"),
        ],
        Tunis: [
          new Forecast("Today", "Sunny", "30°C", "18°C", "./assets/some_sun.png"),
          new Forecast("Tomorrow", "Cloudy", "28°C", "17°C", "./assets/some_clouds.png"),
          new Forecast("Wednesday", "Rainy", "25°C", "15°C", "./assets/some_rain.png"),
          new Forecast("Thursday", "Cloudy", "27°C", "16°C", "./assets/some_clouds.png"),
        ],
        Lausanne: [
          new Forecast("Today", "Cloudy", "19°C", "10°C", "./assets/some_clouds.png"),
          new Forecast("Tomorrow", "Rainy", "17°C", "8°C", "./assets/some_rain.png"),
          new Forecast("Wednesday", "Rainy", "15°C", "7°C", "./assets/some_rain.png"),
          new Forecast("Thursday", "Sunny", "20°C", "9°C", "./assets/some_sun.png"),
        ],
      };
  
      this.currentCity = "Bizerte";
      this.addCityListeners();
    }
  
    addCityListeners() {
      const cityLinks = document.querySelectorAll(".links a");
      cityLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.currentCity = e.target.textContent;
          this.cityTitle.textContent = this.currentCity;
          this.render();
        });
      });
    }
  
    render() {
      const forecasts = this.weatherData[this.currentCity]; // Récupérer un tableau contenant des prévisions
      this.container.innerHTML = ""; // Réinitialiser l'affichage
      forecasts.forEach((f) => {
        this.container.innerHTML += f.render(); // Afficher chaque prévision
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const app = new WeatherApp();
    app.render();
  });
  