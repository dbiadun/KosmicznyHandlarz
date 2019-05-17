"use strict";
function createPlanetsListElement(planetName) {
    let innerSpan = document.createElement("span");
    innerSpan.innerText = planetName;
    let element = document.createElement("li");
    element.setAttribute("tabindex", "0");
    element.appendChild(innerSpan);
    return element;
}
function addPlanetsListElement(planetsList, planet) {
    let element = createPlanetsListElement(planet.getPlanetName());
    planetsList.appendChild(element);
    element.addEventListener("click", () => { game.setPlanetView(planet); });
}
function hidePlanetsListElement(planetsList, planetNumber) {
    planetsList.children[planetNumber].style.display = "none";
}
function showPlanetsListElement(planetsList, planetNumber) {
    planetsList.children[planetNumber].style.display = "list-item";
}
function updatePlanetsList(list, planets) {
    while (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    }
    for (let planet of planets) {
        addPlanetsListElement(list, planet);
    }
}
