"use strict";
class StarshipOnPlanetData {
    constructor(game) {
        this.popup = document.getElementById("spaceship-on-planet-popup");
        this.popupParts = document.querySelectorAll("#spaceship-on-planet-popup > header, #spaceship-on-planet-popup .items-list, #spaceship-on-planet-popup .planets-list");
        this.nameContainer = document.querySelector("#spaceship-on-planet-popup .header-content .name");
        this.positionContainer = document.querySelector("#spaceship-on-planet-popup .header-content .coords");
        this.spaceUsageContainer = document.querySelector("#spaceship-on-planet-popup .items-list header");
        this.itemsToSellListContainer = document.querySelector("#spaceship-on-planet-popup .spaceship-cargo ul");
        this.itemsToBuyListContainer = document.querySelector("#spaceship-on-planet-popup .items-on-planet ul");
        this.planetsListContainer = document.querySelector("#spaceship-on-planet-popup .planets-list ul");
        this.popupOpen = false;
        this.listsCreator = new StarshipOnPlanetListsCreator();
        this.starship = null;
        this.game = game;
        this.initPopupActions();
    }
    setStarship(starship) {
        this.starship = starship;
    }
    getPopup() {
        return this.popup;
    }
    getStarship() {
        return this.starship;
    }
    updateName() {
        if (this.starship) {
            this.nameContainer.innerText = this.starship.getStarshipName();
        }
    }
    updatePosition() {
        if (this.starship) {
            this.positionContainer.innerHTML = this.starship.getPosition();
        }
    }
    updateSpaceUsage() {
        if (this.starship) {
            this.spaceUsageContainer.innerHTML = "Ładunek<br />(" + this.starship.getUsedSpace() + "/" + this.starship.getSpace() + ")";
        }
    }
    updateItemsToSellList() {
        if (this.starship) {
            this.listsCreator.updateSellList(this.itemsToSellListContainer, this.starship.getItems(), this.game.getPlanetsDictionary()[this.starship.getPlanet()], this.starship);
        }
    }
    updateItemsToBuyList() {
        let planet = this.getPlanet();
        if (planet && this.starship) {
            this.listsCreator.updateBuyList(this.itemsToBuyListContainer, planet.getItems(), this.game.getPlanetsDictionary()[this.starship.getPlanet()], this.starship);
        }
    }
    updatePlanetsList() {
        if (this.starship) {
            this.listsCreator.updatePlanetsList(this.planetsListContainer, this.starship, this.game.getPlanets());
            let planetNumber = this.game.getPlanetsDictionary()[this.starship.getPosition()].getNumber();
            hidePlanetsListElement(this.planetsListContainer, planetNumber);
        }
    }
    update() {
        this.updateName();
        this.updatePosition();
        this.updateSpaceUsage();
        this.updateItemsToSellList();
        this.updateItemsToBuyList();
        this.updatePlanetsList();
    }
    show() {
        this.popupOpen = true;
        this.popup.classList.add("visible");
        if (this.popup.parentElement) {
            this.popup.parentElement.classList.add("visible");
        }
    }
    getPlanet() {
        if (this.starship) {
            return this.game.getPlanetsDictionary()[this.starship.getPosition()];
        }
        return null;
    }
    hide() {
        if (this.popupOpen) {
            this.popupOpen = false;
            this.popup.classList.remove("visible");
            if (this.popup.parentElement) {
                this.popup.parentElement.classList.remove("visible");
            }
        }
        this.game.setCurrentView(View.main);
    }
    initPopupActions() {
        this.popup.addEventListener("click", () => { this.hide(); });
        for (let i = 0; i < this.popupParts.length; i++) {
            this.popupParts[i].addEventListener("click", (event) => {
                event.stopPropagation();
            });
        }
    }
}
