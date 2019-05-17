class StarshipBetweenPlanetsData {
  private popup: HTMLElement = document.getElementById("spaceship-between-planets-popup") as HTMLElement;
  private popupParts: NodeListOf<HTMLElement> = document.querySelectorAll("#spaceship-between-planets-popup > header, #spaceship-between-planets-popup .items-list");
  private nameContainer: HTMLElement = document.querySelector("#spaceship-between-planets-popup .header-content .name") as HTMLElement;
  private positionContainer: HTMLElement = document.querySelector("#spaceship-between-planets-popup .header-content .coords") as HTMLElement;
  private spaceUsageContainer: HTMLElement = document.querySelector("#spaceship-between-planets-popup .items-list header") as HTMLElement;
  private itemsListContainer: HTMLUListElement = document.querySelector("#spaceship-between-planets-popup .items-list ul") as HTMLUListElement;
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

  public updateSpaceUsage() {
    if (this.starship) {
      this.spaceUsageContainer.innerHTML = "Ładunek<br />(" + this.starship.getUsedSpace() + "/" + this.starship.getSpace() + ")"
    }
  }

  public updateItemsList() {
    if (this.starship) {
      updateItemsOnStarshipList(this.itemsListContainer, this.starship.getItems());
    }
  }

  public update() {
    this.updateName();
    this.updatePosition();
    this.updateSpaceUsage();
    this.updateItemsList();
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
