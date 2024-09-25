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

    // Données météorologiques statiques
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
      Lausane: [
        new Forecast("Today", "Cloudy", "19°C", "10°C", "./assets/some_clouds.png"),
        new Forecast("Tomorrow", "Rainy", "17°C", "8°C", "./assets/some_rain.png"),
        new Forecast("Wednesday", "Rainy", "15°C", "7°C", "./assets/some_rain.png"),
        new Forecast("Thursday", "Sunny", "20°C", "9°C", "./assets/some_sun.png"),
      ]
    };

    this.currentCity = "Bizerte"; // Ville par défaut
    this.addCityListeners();
  }

  addCityListeners() {
    const cityLinks = document.querySelectorAll(".links a");
    cityLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const city = event.target.textContent;
        this.currentCity = city;
        this.cityTitle.textContent = city; // Met à jour le titre
        this.renderForecasts();
      });
    });
  }

  getNextFourDays() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      days.push(futureDate.toLocaleDateString("en-US", { weekday: "long" })); // Récupérer le nom des jours
    }
    return days;
  }

  renderForecasts() {
    const days = this.getNextFourDays();
    const forecasts = this.weatherData[this.currentCity]; // Récupérer les prévisions de la ville actuelle
    this.container.innerHTML = ""; // Réinitialiser l'affichage des prévisions

    days.forEach((day, index) => {
      const forecast = forecasts[index]; // Récupérer la prévision correspondante
      const forecastWithDay = new Forecast(
        day, // Assigner le jour correspondant
        forecast.weatherType,
        forecast.highTemp,
        forecast.lowTemp,
        forecast.imageUrl
      );
      this.container.innerHTML += forecastWithDay.render(); // Afficher chaque prévision avec le jour
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new WeatherApp();
  app.renderForecasts();
});
