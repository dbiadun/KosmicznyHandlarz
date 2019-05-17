class StarshipOnPlanetListsCreator {

  public updateSellList(list: HTMLUListElement, items: ItemOnStarship[], planet: Planet, starship: Starship) {
    while (list.childElementCount > 1) {
      list.removeChild(list.lastElementChild as HTMLElement);
    }
    for (let item of items) {
      this.addSellListElement(list, item, planet, starship);
    }
  }

  public updateBuyList(list: HTMLUListElement, items: ItemOnPlanet[], planet: Planet, starship: Starship) {
    while (list.childElementCount > 1) {
      list.removeChild(list.lastElementChild as HTMLElement);
    }
    for (let item of items) {
      this.addBuyListElement(list, item, planet, starship);
    }
  }

  public updatePlanetsList(list: HTMLUListElement, starship: Starship, planets: Planet[]) {
    while (list.lastElementChild) {
      list.removeChild(list.lastElementChild);
    }
    for (let planet of planets) {
      this.addPlanetsListElement(list, starship, planet);
    }
  }

  private createSellListElement(item: ItemOnStarship, form: HTMLFormElement, planet: Planet, starship: Starship): HTMLLIElement {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.getItemName();
    nameSpan.classList.add("aligner");

    let nameSpanContainer = document.createElement("span");
    nameSpanContainer.appendChild(nameSpan);


    let countSpan = document.createElement("span");
    countSpan.innerText = item.getCount().toString();
    countSpan.classList.add("aligner");

    let countSpanContainer = document.createElement("span");
    countSpanContainer.appendChild(countSpan);


    let countInput = document.createElement("input");
    countInput.setAttribute("type", "number");
    countInput.setAttribute("value", "0");
    countInput.setAttribute("min", "0");
    countInput.setAttribute("max", `${item.getCount()}`);

    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", ">");

    let countInputContainer = document.createElement("span");
    countInputContainer.classList.add("trade");
    countInputContainer.appendChild(countInput);
    countInputContainer.appendChild(submitInput);

    submitInput.addEventListener("click", () => {
      for (let el of form.elements) {
        (el as HTMLInputElement).setCustomValidity("");
      }
      countInput.setCustomValidity(game.sellItem(item, countInput.value, planet, starship));
      form.reset();
    });


    let element = document.createElement("li");
    element.appendChild(nameSpanContainer);
    element.appendChild(countSpanContainer);
    element.appendChild(countInputContainer);

    return element;
  }

  private addSellListElement(itemsList: HTMLUListElement, item: ItemOnStarship, planet: Planet, starship: Starship) {
    let form: HTMLFormElement = itemsList.parentNode as HTMLFormElement;
    let element: HTMLElement = this.createSellListElement(item, form, planet, starship);
    itemsList.appendChild(element);
  }

  private createBuyListElement(item: ItemOnPlanet, form: HTMLFormElement, planet: Planet, starship: Starship): HTMLLIElement {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.getItemName();
    nameSpan.classList.add("aligner");

    let nameSpanContainer = document.createElement("span");
    nameSpanContainer.appendChild(nameSpan);


    let countSpan = document.createElement("span");
    countSpan.innerText = item.getCount().toString();
    countSpan.classList.add("aligner");

    let countSpanContainer = document.createElement("span");
    countSpanContainer.appendChild(countSpan);


    let buyPriceSpan = document.createElement("span");
    buyPriceSpan.innerText = item.getBuyPrice().toString();
    buyPriceSpan.classList.add("aligner");

    let buyPriceSpanContainer = document.createElement("span");
    buyPriceSpanContainer.appendChild(buyPriceSpan);


    let sellPriceSpan = document.createElement("span");
    sellPriceSpan.innerText = item.getSellPrice().toString();
    sellPriceSpan.classList.add("aligner");

    let sellPriceSpanContainer = document.createElement("span");
    sellPriceSpanContainer.appendChild(sellPriceSpan);


    let countInput = document.createElement("input");
    countInput.setAttribute("type", "number");
    countInput.setAttribute("value", "0");
    countInput.setAttribute("min", "0");
    countInput.setAttribute("max", `${item.getCount()}`);

    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", ">");

    let countInputContainer = document.createElement("span");
    countInputContainer.classList.add("trade");
    countInputContainer.appendChild(countInput);
    countInputContainer.appendChild(submitInput);

    submitInput.addEventListener("click", () => {
      for (let el of form.elements) {
        (el as HTMLInputElement).setCustomValidity("");
      }
      countInput.setCustomValidity(game.buyItem(item, countInput.value, planet, starship));
      form.reset();
    });


    let element = document.createElement("li");
    element.appendChild(nameSpanContainer);
    element.appendChild(countSpanContainer);
    element.appendChild(buyPriceSpanContainer);
    element.appendChild(sellPriceSpanContainer);
    element.appendChild(countInputContainer);

    return element;
  }

  private addBuyListElement(itemsList: HTMLUListElement, item: ItemOnPlanet, planet: Planet, starship: Starship) {
    let form: HTMLFormElement = itemsList.parentNode as HTMLFormElement;
    let element: HTMLElement = this.createBuyListElement(item, form, planet, starship);
    itemsList.appendChild(element);
  }

  private createPlanetsListElement(starship: Starship, planet: Planet): HTMLLIElement {
    let innerSpan = document.createElement("span");
    innerSpan.innerText = planet.getPlanetName();

    let element = document.createElement("li");
    element.setAttribute("tabindex", "0");
    element.appendChild(innerSpan);

    element.addEventListener("click", () => { game.startJourney(starship, planet); });

    return element;
  }

  private addPlanetsListElement(itemsList: HTMLUListElement, starship: Starship, planet: Planet) {
    let element: HTMLElement = this.createPlanetsListElement(starship, planet);
    itemsList.appendChild(element);
  }
}
