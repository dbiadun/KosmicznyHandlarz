"use strict";
class StarshipBetweenPlanetsData {
    constructor(game) {
        this.popup = document.getElementById("spaceship-between-planets-popup");
        this.popupParts = document.querySelectorAll("#spaceship-between-planets-popup > header, #spaceship-between-planets-popup .items-list");
        this.nameContainer = document.querySelector("#spaceship-between-planets-popup .header-content .name");
        this.positionContainer = document.querySelector("#spaceship-between-planets-popup .header-content .coords");
        this.spaceUsageContainer = document.querySelector("#spaceship-between-planets-popup .items-list header");
        this.itemsListContainer = document.querySelector("#spaceship-between-planets-popup .items-list ul");
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
    updateSpaceUsage() {
        if (this.starship) {
            this.spaceUsageContainer.innerHTML = "Ładunek<br />(" + this.starship.getUsedSpace() + "/" + this.starship.getSpace() + ")";
        }
    }
    updateItemsList() {
        if (this.starship) {
            updateItemsOnStarshipList(this.itemsListContainer, this.starship.getItems());
        }
    }
    update() {
        this.updateName();
        this.updatePosition();
        this.updateSpaceUsage();
        this.updateItemsList();
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
