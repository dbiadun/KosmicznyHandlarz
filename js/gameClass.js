"use strict";
class Game {
    constructor() {
        this.usernameContainer = document.getElementById("username-container");
        this.creditsContainer = document.getElementById("credits-container");
        this.timeContainer = document.getElementById("time-container");
        this.planetsListContainer = document.querySelector(".outside-popups.planets-list ul");
        this.starshipsListContainer = document.querySelector(".outside-popups.spaceships-list ul");
        this.initialData = initialData;
        this.planetsDictionary = {};
        this.currentPlanet = new PlanetData(this);
        this.currentStarshipOnPlanet = new StarshipOnPlanetData(this);
        this.currentStarshipBetweenPlanets = new StarshipBetweenPlanetsData(this);
        this.currentView = View.main;
        this.username = this.initUsername();
        this.credits = this.initCredits();
        this.time = this.initTime();
        this.planets = this.initPlanets();
        this.starships = this.initStarships();
        this.items = this.initItems();
        this.initMainView();
    }
    setMainView() {
        this.currentView = View.main;
        this.currentPlanet.getPopup().click();
        this.currentStarshipOnPlanet.getPopup().click();
        this.currentStarshipBetweenPlanets.getPopup().click();
    }
    setPlanetView(planet) {
        this.setMainView();
        this.currentView = View.planet;
        this.currentPlanet.setPlanet(planet);
        this.currentPlanet.update();
        this.currentPlanet.show();
    }
    setStarshipOnPlanetView(starship) {
        this.setMainView();
        this.currentView = View.starshipOnPlanet;
        this.currentStarshipOnPlanet.setStarship(starship);
        this.currentStarshipOnPlanet.update();
        this.currentStarshipOnPlanet.show();
    }
    setStarshipBetweenPlanetsView(starship) {
        this.setMainView();
        this.currentView = View.starshipBetweenPlanets;
        this.currentStarshipBetweenPlanets.setStarship(starship);
        this.currentStarshipBetweenPlanets.update();
        this.currentStarshipBetweenPlanets.show();
    }
    getPlanets() {
        return this.planets;
    }
    getPlanetsDictionary() {
        return this.planetsDictionary;
    }
    updateUsername() {
        this.usernameContainer.innerText = "Gracz: " + this.username;
    }
    updateCredits() {
        this.creditsContainer.innerText = "Kredyty: " + this.credits;
    }
    updateTime() {
        this.timeContainer.innerText = "Czas: " + this.time;
    }
    updatePlanetsList() {
        updatePlanetsList(this.planetsListContainer, this.planets);
    }
    updateStarshipsList() {
        updateStarshipsList(this.starshipsListContainer, this.starships);
    }
    sellItem(item, countString, planet, starship) {
        let count = parseInt(countString);
        if (count > item.getCount()) {
            return "Zbyt mało towaru na statku";
        }
        else if (count < 0) {
            return "Podaj dodatnią liczbę";
        }
        else if (isNaN(count)) {
            return "Podaj liczbę";
        }
        let price = planet.getItemSellPrice(item.getItemName());
        this.credits += count * price;
        starship.sellItem(item, count);
        planet.sellItem(item, count);
        this.updateCredits();
        this.currentStarshipOnPlanet.updateSpaceUsage();
        this.currentStarshipOnPlanet.updateItemsToSellList();
        this.currentStarshipOnPlanet.updateItemsToBuyList();
        return "";
    }
    buyItem(item, countString, planet, starship) {
        let count = parseInt(countString);
        if (count > item.getCount()) {
            return "Towar niedostępny w tak dużej liczbie";
        }
        else if (count < 0) {
            return "Podaj dodatnią liczbę";
        }
        else if (isNaN(count)) {
            return "Podaj liczbę";
        }
        else if (count * item.getBuyPrice() > this.credits) {
            return "Zbyt mało kredytów";
        }
        else if (count > starship.getSpace() - starship.getUsedSpace()) {
            return "Za mało miejsca na statku";
        }
        this.credits -= count * item.getBuyPrice();
        starship.buyItem(item, count);
        planet.buyItem(item, count);
        this.updateCredits();
        this.currentStarshipOnPlanet.updateSpaceUsage();
        this.currentStarshipOnPlanet.updateItemsToSellList();
        this.currentStarshipOnPlanet.updateItemsToBuyList();
        return "";
    }
    initTimer() {
        this.updateTime();
        setInterval(() => {
            if (this.time > 0) {
                this.time--;
                this.updateTime();
            }
        }, 1000);
    }
    initMainView() {
        this.updateUsername();
        this.updateCredits();
        this.initTimer();
        this.updatePlanetsList();
        this.updateStarshipsList();
    }
    initUsername() {
        let params = new URLSearchParams(window.location.href.replace(/\S*\?/, ""));
        let username = params.get("username") || "";
        return username;
    }
    initCredits() {
        return this.initialData.initial_credits;
    }
    initTime() {
        return this.initialData.game_duration;
    }
    initPlanets() {
        let planets = [];
        let i = 0;
        for (let planetName in this.initialData.planets) {
            let planet = new Planet(i, planetName, this.initialData.planets[planetName]);
            planets.push(planet);
            this.planetsDictionary[planetName] = planet;
            i++;
        }
        return planets;
    }
    initStarships() {
        let starships = [];
        for (let starshipName in this.initialData.starships) {
            let starship = new Starship(starshipName, this.initialData.starships[starshipName]);
            starships.push(starship);
            if (starship.getPlanet() !== "") {
                this.planetsDictionary[starship.getPlanet()].addStarship(starship);
            }
        }
        return starships;
    }
    initItems() {
        let items = [];
        for (let item in this.initialData.items) {
            items.push(item);
        }
        return items;
    }
}
var View;
(function (View) {
    View[View["main"] = 0] = "main";
    View[View["planet"] = 1] = "planet";
    View[View["starshipOnPlanet"] = 2] = "starshipOnPlanet";
    View[View["starshipBetweenPlanets"] = 3] = "starshipBetweenPlanets";
})(View || (View = {}));
