"use strict";
function addPlanetPopupItemsListElement(list, item) {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.getItemName();
    let availableSpan = document.createElement("span");
    availableSpan.innerText = item.getCount().toString();
    let buyPriceSpan = document.createElement("span");
    buyPriceSpan.innerText = item.getBuyPrice().toString();
    let sellPriceSpan = document.createElement("span");
    sellPriceSpan.innerText = item.getSellPrice().toString();
    let el = document.createElement("li");
    el.appendChild(nameSpan);
    el.appendChild(availableSpan);
    el.appendChild(buyPriceSpan);
    el.appendChild(sellPriceSpan);
    list.appendChild(el);
}
function updatePlanetPopupItemsList(list, items) {
    while (list.childElementCount > 1) {
        list.removeChild(list.lastElementChild);
    }
    for (let item of items) {
        addPlanetPopupItemsListElement(list, item);
    }
}
function addPlanetPopupStarshipsListElement(list, starship) {
    let innerSpan = document.createElement("span");
    innerSpan.innerText = starship.getStarshipName();
    let element = document.createElement("li");
    element.setAttribute("tabindex", "0");
    if (starship.getPlanet() === "") {
        element.classList.add("between-planets");
    }
    else {
        element.classList.add("on-planet");
    }
    element.appendChild(innerSpan);
    list.appendChild(element);
    element.addEventListener("click", () => {
        if (starship.getPlanet() === "") {
            game.setStarshipBetweenPlanetsView(starship);
        }
        else {
            game.setStarshipOnPlanetView(starship);
        }
    });
}
function updatePlanetPopupStarshipsList(list, starships) {
    while (list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    }
    for (let starship of starships) {
        addPlanetPopupStarshipsListElement(list, starship);
    }
}
