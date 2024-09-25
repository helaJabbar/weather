class WeatherApp {
    /**************************Constructor de la classe weather*********************************************/
    constructor() {
      this.container = document.querySelector(".row");
      this.cityTitle = document.querySelector(".subtitle-line h2");
      this.daysContainer = document.createElement("div"); // Conteneur pour les jours
      this.container.appendChild(this.daysContainer);


      this.currentCity = "Bizerte"; // Ville par défaut
      this.addCityListeners();
    }

    /******************************Changement des villes selon le menu*************************************/
    addCityListeners() {
      const cityLinks = document.querySelectorAll(".links a");
      cityLinks.forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault(); // Empêche le comportement par défaut
            const city = event.target.textContent;
            this.currentCity = city;
            this.cityTitle.textContent = city; // Mise à jour du titre de la ville
            this.renderForecasts(); // Rendu de la météo
        });
      });
    }

    /*************************************Affichage des noms des jours**************************************/
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

    /*******************************Rendre les prévisions météo (jours)*******************************/
    renderForecasts() {
        const days = this.getNextFourDays();
        this.daysContainer.innerHTML = ""; // Réinitialiser l'affichage des jours
        days.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            this.daysContainer.appendChild(dayElement); // Ajouter chaque jour au conteneur
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const app = new WeatherApp();
    app.renderForecasts();
  });
  