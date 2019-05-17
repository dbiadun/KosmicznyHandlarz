"use strict";
class PlanetData {
    constructor(game) {
        this.popup = document.getElementById("planet-popup");
        this.popupParts = document.querySelectorAll("#planet-popup > header, #planet-popup > .items-list, #planet-popup > .spaceships-list");
        this.nameContainer = document.querySelector("#planet-popup .header-content .name");
        this.coordsContainer = document.querySelector("#planet-popup .header-content .coords");
        this.itemsListContainer = document.querySelector("#planet-popup .items-list ul");
        this.starshipsListContainer = document.querySelector("#planet-popup .spaceships-list ul");
        this.popupOpen = false;
        this.planet = null;
        this.game = game;
        this.initPopupActions();
    }
    setPlanet(planet) {
        this.planet = planet;
    }
    getPopup() {
        return this.popup;
    }
    updateName() {
        if (this.planet) {
            this.nameContainer.innerText = this.planet.getPlanetName();
        }
    }
    updateCoords() {
        if (this.planet) {
            this.coordsContainer.innerHTML = "Współrzędne:<br />x: " + this.planet.getX() + ", y: " + this.planet.getY();
        }
    }
    updateItemsList() {
        if (this.planet) {
            updatePlanetPopupItemsList(this.itemsListContainer, this.planet.getItems());
        }
    }
    updateStarshipsList() {
        if (this.planet) {
            updatePlanetPopupStarshipsList(this.starshipsListContainer, this.planet.getStarships());
        }
    }
    update() {
        this.updateName();
        this.updateCoords();
        this.updateItemsList();
        this.updateStarshipsList();
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
