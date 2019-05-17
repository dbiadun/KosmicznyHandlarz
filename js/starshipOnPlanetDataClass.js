"use strict";
class StarshipOnPlanetData {
    constructor(game) {
        this.popup = document.getElementById("spaceship-on-planet-popup");
        this.popupParts = document.querySelectorAll("#spaceship-on-planet-popup > header, #spaceship-on-planet-popup .items-list, #spaceship-on-planet-popup .planets-list");
        this.nameContainer = document.querySelector("#spaceship-on-planet-popup .header-content .name");
        this.positionContainer = document.querySelector("#spaceship-on-planet-popup .header-content .coords");
        this.itemsToSellListContainer = document.querySelector("#spaceship-on-planet-popup .spaceship-cargo ul");
        this.itemsToBuyListContainer = document.querySelector("#spaceship-on-planet-popup .items-on-planet ul");
        this.planetsListContainer = document.querySelector("#spaceship-on-planet-popup .planets-list ul");
        this.popupOpen = false;
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
    // public updateItemsToSellList() {
    //   if (this.starship) {
    //     updateItemsList(this.itemsToSellListContainer, this.starship.getItems());
    //   }
    // }
    //
    // public updateItemsToBuyList() {
    //   if (this.starship) {
    //     updateItemsList(this.itemsListContainer, this.planet.getItems())
    //   }
    // }
    //
    updatePlanetsList() {
        if (this.starship) {
            updatePlanetsList(this.planetsListContainer, this.game.getPlanets());
        }
    }
    update() {
        this.updateName();
        this.updatePosition();
        this.updatePlanetsList();
        if (this.starship) {
            let planetNumber = this.game.getPlanetsDictionary()[this.starship.getPosition()].getNumber();
            hidePlanetsListElement(this.planetsListContainer, planetNumber);
        }
    }
    show() {
        this.popupOpen = true;
        this.popup.classList.add("visible");
        if (this.popup.parentElement) {
            this.popup.parentElement.classList.add("visible");
        }
    }
    hide() {
        if (this.popupOpen) {
            this.popupOpen = false;
            this.popup.classList.remove("visible");
            if (this.popup.parentElement) {
                this.popup.parentElement.classList.remove("visible");
            }
        }
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
