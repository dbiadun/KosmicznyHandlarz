"use strict";
class Planet {
    constructor(number, planetName, planet) {
        this.starships = [];
        this.number = number;
        this.planetName = planetName;
        this.availableItems = [];
        for (let itemName in planet.available_items) {
            this.availableItems.push(new ItemOnPlanet(itemName, planet.available_items[itemName]));
        }
        this.x = planet.x;
        this.y = planet.y;
    }
    addStarship(starship) {
        this.starships.push(starship);
    }
    getNumber() {
        return this.number;
    }
    getPlanetName() {
        return this.planetName;
    }
    getItems() {
        return this.availableItems;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getStarships() {
        return this.starships;
    }
}
