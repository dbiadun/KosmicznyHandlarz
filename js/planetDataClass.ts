class PlanetData {
  private popup: HTMLElement = document.getElementById("planet-popup") as HTMLElement;
  private popupParts: NodeListOf<HTMLElement> = document.querySelectorAll("#planet-popup > header, #planet-popup > .items-list, #planet-popup > .spaceships-list");
  private nameContainer: HTMLElement = document.querySelector("#planet-popup .header-content .name") as HTMLElement;
  private coordsContainer: HTMLElement = document.querySelector("#planet-popup .header-content .coords") as HTMLElement;
  private itemsListContainer: HTMLUListElement = document.querySelector("#planet-popup .items-list ul") as HTMLUListElement;
  private starshipsListContainer: HTMLUListElement = document.querySelector("#planet-popup .spaceships-list ul") as HTMLUListElement;
  private popupOpen: boolean = false;

  private planet: Planet | null = null;
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.initPopupActions();
  }

  public setPlanet(planet: Planet) {
    this.planet = planet;
  }

  public getPopup(): HTMLElement {
    return this.popup;
  }

  public updateName() {
    if (this.planet) {
      this.nameContainer.innerText = this.planet.getPlanetName();
    }
  }

  public updateCoords() {
    if (this.planet) {
      this.coordsContainer.innerHTML = "Współrzędne:<br />x: " + this.planet.getX() + ", y: " + this.planet.getY();
    }
  }

  public updateItemsList() {
    if (this.planet) {
      updatePlanetPopupItemsList(this.itemsListContainer, this.planet.getItems())
    }
  }

  public updateStarshipsList() {
    if (this.planet) {
      updatePlanetPopupStarshipsList(this.starshipsListContainer, this.planet.getStarships())
    }
  }

  public update() {
    this.updateName();
    this.updateCoords();
    this.updateItemsList();
    this.updateStarshipsList();
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
