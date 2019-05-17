"use strict";
function createStarshipsListElement(starship) {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = starship.getStarshipName();
    let positionSpan = document.createElement("span");
    positionSpan.innerText = starship.getPosition();
    let element = document.createElement("li");
    element.setAttribute("tabindex", "0");
    element.appendChild(nameSpan);
    element.appendChild(positionSpan);
    if (starship.getPosition().includes("->")) {
        element.classList.add("between-planets");
    }
    else {
        element.classList.add("on-planet");
    }
    return element;
}
function addStarshipsListElement(starshipsList, starship) {
    let element = createStarshipsListElement(starship);
    starshipsList.appendChild(element);
    element.addEventListener("click", () => {
        if (starship.getPlanet() === "") {
            game.setStarshipBetweenPlanetsView(starship);
        }
        else {
            game.setStarshipOnPlanetView(starship);
        }
    });
}
function hideStarshipsListElement(starshipsList, starshipNumber) {
    starshipsList.children[starshipNumber].style.display = "none";
}
function showStarshipsListElement(starshipsList, starshipNumber) {
    starshipsList.children[starshipNumber].style.display = "list-item";
}
function updateStarshipsList(list, starships) {
    while (list.childElementCount > 1) {
        list.removeChild(list.lastElementChild);
    }
    for (let starship of starships) {
        addStarshipsListElement(list, starship);
    }
}
