function createPlanetsListElement(planetName: string): HTMLLIElement {
  let innerSpan = document.createElement("span");
  innerSpan.innerText = planetName;

  let element = document.createElement("li");
  element.setAttribute("tabindex", "0");
  element.appendChild(innerSpan);

  return element;
}

function addPlanetsListElement(planetsList: HTMLUListElement, planet: Planet) {
  let element: HTMLElement = createPlanetsListElement(planet.getPlanetName());
  planetsList.appendChild(element);
  element.addEventListener("click", () => { game.setPlanetView(planet); });
}

function hidePlanetsListElement(planetsList: HTMLUListElement, planetNumber: number) {
  (planetsList.children[planetNumber] as HTMLElement).style.display = "none";
}

function showPlanetsListElement(planetsList: HTMLUListElement, planetNumber: number) {
  (planetsList.children[planetNumber] as HTMLElement).style.display = "list-item";
}

function updatePlanetsList(list: HTMLUListElement, planets: Planet[]) {
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
  for (let planet of planets) {
    addPlanetsListElement(list, planet);
  }
}
