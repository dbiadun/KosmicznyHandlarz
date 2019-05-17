function addPlanetPopupItemsListElement(list: HTMLUListElement, item: ItemOnPlanet) {
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

function updatePlanetPopupItemsList(list: HTMLUListElement, items: ItemOnPlanet[]) {
  while (list.childElementCount > 1) {
    list.removeChild(list.lastElementChild as HTMLElement);
  }
  for (let item of items) {
    addPlanetPopupItemsListElement(list, item);
  }
}

function addPlanetPopupStarshipsListElement(list: HTMLUListElement, starship: Starship) {
  let innerSpan = document.createElement("span");
  innerSpan.innerText = starship.getStarshipName();

  let element: HTMLElement = document.createElement("li");
  element.setAttribute("tabindex", "0");
  if (starship.getPlanet() === "") {
    element.classList.add("between-planets");
  } else {
    element.classList.add("on-planet");
  }
  element.appendChild(innerSpan);

  list.appendChild(element);
  element.addEventListener("click", () => {
    if (starship.getPlanet() === "") {
      game.setStarshipBetweenPlanetsView(starship);
    } else {
      game.setStarshipOnPlanetView(starship);
    }
  });
}

function updatePlanetPopupStarshipsList(list: HTMLUListElement, starships: Starship[]) {
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
  for (let starship of starships) {
    addPlanetPopupStarshipsListElement(list, starship);
  }
}
