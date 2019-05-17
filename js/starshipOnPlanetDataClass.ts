class StarshipOnPlanetData {
  private popup: HTMLElement = document.getElementById("spaceship-on-planet-popup") as HTMLElement;
  private popupParts: NodeListOf<HTMLElement> = document.querySelectorAll("#spaceship-on-planet-popup > header, #spaceship-on-planet-popup .items-list, #spaceship-on-planet-popup .planets-list");
  private nameContainer: HTMLElement = document.querySelector("#spaceship-on-planet-popup .header-content .name") as HTMLElement;
  private positionContainer: HTMLElement = document.querySelector("#spaceship-on-planet-popup .header-content .coords") as HTMLElement;
  private itemsToSellListContainer: HTMLUListElement = document.querySelector("#spaceship-on-planet-popup .spaceship-cargo ul") as HTMLUListElement;
  private itemsToBuyListContainer: HTMLUListElement = document.querySelector("#spaceship-on-planet-popup .items-on-planet ul") as HTMLUListElement;
  private planetsListContainer: HTMLUListElement = document.querySelector("#spaceship-on-planet-popup .planets-list ul") as HTMLUListElement;
  private popupOpen: boolean = false;

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

  // public updateItemsToSellList() {
  //   if (this.starship) {
  //     updateItemsList(this.itemsToSellListContainer, this.starship.getItems());
  //   }
  // }
  //
  // public updateItemsToBuyList() {
  //   if (this.starship) {
  //     updateItemsList(this.itemsListContainer, this.planet.getItems())
  //   }
  // }
  //
  public updatePlanetsList() {
    if (this.starship) {
      updatePlanetsList(this.planetsListContainer, this.game.getPlanets());
    }
  }

  public update() {
    this.updateName();
    this.updatePosition();
    this.updatePlanetsList();
    if (this.starship) {
      let planetNumber: number = this.game.getPlanetsDictionary()[this.starship.getPosition()].getNumber();
      hidePlanetsListElement(this.planetsListContainer, planetNumber);
    }
  }

  public show() {
    this.popupOpen = true;
    this.popup.classList.add("visible");
    if (this.popup.parentElement) {
      this.popup.parentElement.classList.add("visible");
    }
  }

  private hide() {
    if (this.popupOpen) {
      this.popupOpen = false;
      this.popup.classList.remove("visible");
      if (this.popup.parentElement) {
        this.popup.parentElement.classList.remove("visible");
      }
    }
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
