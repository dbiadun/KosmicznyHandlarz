"use strict";
class SpaceMap {
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.map = document.getElementById("svg-map");
        this.namesContainer = document.querySelector(".map-container .map-names-popup");
        this.namesContainerMoved = false;
        this.parent = this.map.parentElement;
        this.width = this.parent.offsetWidth * 0.94;
        this.map.setAttribute("height", this.width.toString());
        this.initNamesContainerMove();
    }
    addPlanet(planet) {
        let el = document.createElementNS(this.svgNS, "circle");
        el.setAttributeNS("", "cx", this.getCoord(planet.getX()).toString());
        el.setAttributeNS("", "cy", this.getCoord(planet.getY()).toString());
        el.setAttributeNS("", "r", this.getSize(1.4).toString());
        el.setAttributeNS("", "fill", "#c6d5eb");
        el.addEventListener("click", () => { game.setPlanetView(planet); });
        el.addEventListener("mouseover", () => {
            el.classList.add("cursor-pointer");
            this.namesContainer.innerText = planet.getPlanetName();
            this.namesContainer.classList.add("visible");
        });
        el.addEventListener("mouseout", () => {
            el.classList.remove("cursor-pointer");
            this.namesContainer.classList.remove("visible");
        });
        this.map.appendChild(el);
    }
    addStarship(starship) {
        let el = document.createElementNS(this.svgNS, "circle");
        el.setAttributeNS("", "cx", this.getCoord(starship.getX()).toString());
        el.setAttributeNS("", "cy", this.getCoord(starship.getY()).toString());
        el.setAttributeNS("", "r", this.getSize(0.9).toString());
        el.setAttributeNS("", "fill", "orange");
        el.style.zIndex = "10";
        el.addEventListener("click", () => {
            if (starship.getPlanet() === "") {
                game.setStarshipBetweenPlanetsView(starship);
            }
            else {
                game.setStarshipOnPlanetView(starship);
            }
        });
        el.addEventListener("mouseover", () => {
            el.classList.add("cursor-pointer");
            this.namesContainer.innerText = starship.getStarshipName();
            this.namesContainer.classList.add("visible");
        });
        el.addEventListener("mouseout", () => {
            el.classList.remove("cursor-pointer");
            this.namesContainer.classList.remove("visible");
        });
        this.map.appendChild(el);
        let stepTime = 10;
        let intv = setInterval(nextStep, stepTime);
        let self = this;
        function nextStep() {
            if (starship.getPlanet() !== "") {
                clearInterval(intv);
                self.map.removeChild(el);
            }
            el.setAttributeNS("", "cx", self.getCoord(starship.getX()).toString());
            el.setAttributeNS("", "cy", self.getCoord(starship.getY()).toString());
        }
    }
    initNamesContainerMove() {
        this.namesContainer.style.bottom = "30px";
        this.namesContainer.style.top = "auto";
        this.namesContainer.addEventListener("mouseover", () => {
            if (this.namesContainerMoved) {
                this.namesContainerMoved = false;
                this.namesContainer.style.bottom = "30px";
                this.namesContainer.style.top = "auto";
            }
            else {
                this.namesContainerMoved = true;
                this.namesContainer.style.top = "30px";
                this.namesContainer.style.bottom = "auto";
            }
        });
    }
    getCoord(c) {
        return (this.width / 104) * (2 + c);
    }
    getSize(s) {
        return s * (this.width / 104);
    }
}
