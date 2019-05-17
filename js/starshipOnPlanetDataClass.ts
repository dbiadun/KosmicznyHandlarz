class StarshipOnPlanetData {
  private popup: HTMLElement = document.getElementById("spaceship-on-planet-popup") as HTMLElement;
  private popupParts: NodeListOf<HTMLElement> = document.querySelectorAll("#spaceship-on-planet-popup > header, #spaceship-on-planet-popup .items-list, #spaceship-on-planet-popup .planets-list");
  private nameContainer: HTMLElement = document.querySelector("#spaceship-on-planet-popup .header-content .name") as HTMLElement;
  private positionContainer: HTMLElement = document.querySelector("#spaceship-on-planet-popup .header-content .coords") as HTMLElement;
  private spaceUsageContainer: HTMLElement = document.querySelector("#spaceship-on-planet-popup .items-list header") as HTMLElement;
  private itemsToSellListContainer: HTMLUListElement = document.querySelector("#spaceship-on-planet-popup .spaceship-cargo ul") as HTMLUListElement;
  private itemsToBuyListContainer: HTMLUListElement = document.querySelector("#spaceship-on-planet-popup .items-on-planet ul") as HTMLUListElement;
  private planetsListContainer: HTMLUListElement = document.querySelector("#spaceship-on-planet-popup .planets-list ul") as HTMLUListElement;
  private popupOpen: boolean = false;

  private listsCreator: StarshipOnPlanetListsCreator = new StarshipOnPlanetListsCreator();
  private starship: Starship | null = null;
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.initPopupActions();
  }

  public setStarship(starship: Starship) {
    this.starship = starship;
  }

  public getPopup(): HTMLElement {
    return this.popup;
  }

  public getStarship(): Starship | null {
    return this.starship;
  }

  public updateName() {
    if (this.starship) {
      this.nameContainer.innerText = this.starship.getStarshipName();
    }
  }

  public updatePosition() {
    if (this.starship) {
      this.positionContainer.innerHTML = this.starship.getPosition();
    }
  }

  public updateSpaceUsage() {
    if (this.starship) {
      this.spaceUsageContainer.innerHTML = "Ładunek<br />(" + this.starship.getUsedSpace() + "/" + this.starship.getSpace() + ")"
    }
  }

  public updateItemsToSellList() {
    if (this.starship) {
      this.listsCreator.updateSellList(this.itemsToSellListContainer, this.starship.getItems(), this.game.getPlanetsDictionary()[this.starship.getPlanet()], this.starship);
    }
  }

  public updateItemsToBuyList() {
    let planet: Planet | null = this.getPlanet();
    if (planet && this.starship) {
      this.listsCreator.updateBuyList(this.itemsToBuyListContainer, planet.getItems(), this.game.getPlanetsDictionary()[this.starship.getPlanet()], this.starship);
    }
  }

  public updatePlanetsList() {
    if (this.starship) {
      this.listsCreator.updatePlanetsList(this.planetsListContainer, this.starship, this.game.getPlanets());
      let planetNumber: number = this.game.getPlanetsDictionary()[this.starship.getPosition()].getNumber();
      hidePlanetsListElement(this.planetsListContainer, planetNumber);
    }
  }

  public update() {
    this.updateName();
    this.updatePosition();
    this.updateSpaceUsage();
    this.updateItemsToSellList();
    this.updateItemsToBuyList();
    this.updatePlanetsList();
  }

  public show() {
    this.popupOpen = true;
    this.popup.classList.add("visible");
    if (this.popup.parentElement) {
      this.popup.parentElement.classList.add("visible");
    }
  }

  private getPlanet(): Planet | null {
    if (this.starship) {
      return this.game.getPlanetsDictionary()[this.starship.getPosition()];
    }
    return null;
  }

  private hide() {
    if (this.popupOpen) {
      this.popupOpen = false;
      this.popup.classList.remove("visible");
      if (this.popup.parentElement) {
        this.popup.parentElement.classList.remove("visible");
      }
    }
    this.game.setCurrentView(View.main);
  }

  private initPopupActions() {
    this.popup.addEventListener("click", () => { this.hide(); });

    for (let i = 0; i < this.popupParts.length; i++) {
      this.popupParts[i].addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }
  }
}
