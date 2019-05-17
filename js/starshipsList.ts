function createStarshipsListElement(starship: Starship): HTMLLIElement {
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
  } else {
    element.classList.add("on-planet");
  }
  return element;
}

function addStarshipsListElement(starshipsList: HTMLUListElement, starship: Starship) {
  let element: HTMLElement = createStarshipsListElement(starship);
  starshipsList.appendChild(element);
  element.addEventListener("click", () => {
    if (starship.getPlanet() === "") {
      game.setStarshipBetweenPlanetsView(starship);
    } else {
      game.setStarshipOnPlanetView(starship);
    }
  });
}

function hideStarshipsListElement(starshipsList: HTMLUListElement, starshipNumber: number) {
  (starshipsList.children[starshipNumber] as HTMLElement).style.display = "none";
}

function showStarshipsListElement(starshipsList: HTMLUListElement, starshipNumber: number) {
  (starshipsList.children[starshipNumber] as HTMLElement).style.display = "list-item";
}

function updateStarshipsList(list: HTMLUListElement, starships: Starship[]) {
  while (list.childElementCount > 1) {
    list.removeChild(list.lastElementChild as HTMLElement);
  }
  for (let starship of starships) {
    addStarshipsListElement(list, starship);
  }
}
