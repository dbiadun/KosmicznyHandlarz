class Game {
  private usernameContainer: HTMLElement = document.getElementById("username-container") as HTMLElement;
  private creditsContainer: HTMLElement = document.getElementById("credits-container") as HTMLElement;
  private timeContainer: HTMLElement = document.getElementById("time-container") as HTMLElement;
  private planetsListContainer: HTMLUListElement = document.querySelector(".outside-popups.planets-list ul") as HTMLUListElement;
  private starshipsListContainer: HTMLUListElement = document.querySelector(".outside-popups.spaceships-list ul") as HTMLUListElement;

  private initialData: IAppData = initialData;
  private username: string;
  private credits: number;
  private time: number;
  private planets: Planet[];
  private planetsDictionary: { [index: string]: Planet } = {};
  private starships: Starship[];
  private items: string[];
  private currentPlanet: PlanetData = new PlanetData(this);
  private currentStarshipOnPlanet: StarshipOnPlanetData = new StarshipOnPlanetData(this);
  private currentStarshipBetweenPlanets: StarshipBetweenPlanetsData = new StarshipBetweenPlanetsData(this);
  private currentView: View = View.main;

  constructor() {
    this.username = this.initUsername();
    this.credits = this.initCredits();
    this.time = this.initTime();
    this.planets = this.initPlanets();
    this.starships = this.initStarships();
    this.items = this.initItems();
    this.initMainView();
  }

  public setMainView() {
    this.currentView = View.main;

    this.currentPlanet.getPopup().click();
    this.currentStarshipOnPlanet.getPopup().click();
    this.currentStarshipBetweenPlanets.getPopup().click();
  }

  public setPlanetView(planet: Planet) {
    this.setMainView();
    this.currentView = View.planet;
    this.currentPlanet.setPlanet(planet);
    this.currentPlanet.update();
    this.currentPlanet.show();
  }

  public setStarshipOnPlanetView(starship: Starship) {
    this.setMainView();
    this.currentView = View.starshipOnPlanet;
    this.currentStarshipOnPlanet.setStarship(starship);
    this.currentStarshipOnPlanet.update();
    this.currentStarshipOnPlanet.show();
  }

  public setStarshipBetweenPlanetsView(starship: Starship) {
    this.setMainView();
    this.currentView = View.starshipBetweenPlanets;
    this.currentStarshipBetweenPlanets.setStarship(starship);
    this.currentStarshipBetweenPlanets.update();
    this.currentStarshipBetweenPlanets.show();
  }

  public getPlanets(): Planet[] {
    return this.planets;
  }

  public getPlanetsDictionary(): { [index: string]: Planet } {
    return this.planetsDictionary;
  }

  public updateUsername() {
    this.usernameContainer.innerText = "Gracz: " + this.username;
  }

  public updateCredits() {
    this.creditsContainer.innerText = "Kredyty: " + this.credits;
  }

  public updateTime() {
    this.timeContainer.innerText = "Czas: " + this.time;
  }

  public updatePlanetsList() {
    updatePlanetsList(this.planetsListContainer, this.planets);
  }

  public updateStarshipsList() {
    updateStarshipsList(this.starshipsListContainer, this.starships);
  }

  public sellItem(item: ItemOnStarship, countString: string, planet: Planet, starship: Starship): string {
    let count: number = parseInt(countString);
    if (count > item.getCount()) {
      return "Zbyt mało towaru na statku";
    } else if (count < 0) {
      return "Podaj dodatnią liczbę";
    } else if (isNaN(count)) {
      return "Podaj liczbę";
    }

    let price: number = planet.getItemSellPrice(item.getItemName());
    this.credits += count * price;
    starship.sellItem(item, count);
    planet.sellItem(item, count);

    this.updateCredits();
    this.currentStarshipOnPlanet.updateSpaceUsage();
    this.currentStarshipOnPlanet.updateItemsToSellList();
    this.currentStarshipOnPlanet.updateItemsToBuyList();

    return "";
  }

  public buyItem(item: ItemOnPlanet, countString: string, planet: Planet, starship: Starship): string {
    let count: number = parseInt(countString);
    if (count > item.getCount()) {
      return "Towar niedostępny w tak dużej liczbie";
    } else if (count < 0) {
      return "Podaj dodatnią liczbę";
    } else if (isNaN(count)) {
      return "Podaj liczbę";
    } else if (count * item.getBuyPrice() > this.credits) {
      return "Zbyt mało kredytów";
    } else if (count > starship.getSpace() - starship.getUsedSpace()) {
      return "Za mało miejsca na statku";
    }

    this.credits -= count * item.getBuyPrice();
    starship.buyItem(item, count);
    planet.buyItem(item, count);

    this.updateCredits();
    this.currentStarshipOnPlanet.updateSpaceUsage();
    this.currentStarshipOnPlanet.updateItemsToSellList();
    this.currentStarshipOnPlanet.updateItemsToBuyList();

    return "";
  }

  private initTimer() {
    this.updateTime();
    setInterval(() => {
      if (this.time > 0) {
        this.time--;
        this.updateTime();
      }
    }, 1000);
  }

  private initMainView() {
    this.updateUsername();
    this.updateCredits();
    this.initTimer();
    this.updatePlanetsList();
    this.updateStarshipsList();
  }

  private initUsername(): string {
    let params = new URLSearchParams(window.location.href.replace(/\S*\?/, ""));
    let username = params.get("username") || "";
    return username;
  }

  private initCredits(): number {
    return this.initialData.initial_credits;
  }

  private initTime(): number {
    return this.initialData.game_duration;
  }

  private initPlanets(): Planet[] {
    let planets: Planet[] = [];
    let i = 0;
    for (let planetName in this.initialData.planets) {
      let planet: Planet = new Planet(i, planetName, this.initialData.planets[planetName]);
      planets.push(planet);
      this.planetsDictionary[planetName] = planet;
      i++;
    }
    return planets;
  }

  private initStarships(): Starship[] {
    let starships: Starship[] = [];
    for (let starshipName in this.initialData.starships) {
      let starship: Starship = new Starship(starshipName, this.initialData.starships[starshipName]);
      starships.push(starship);
      if (starship.getPlanet() !== "") {
        this.planetsDictionary[starship.getPlanet()].addStarship(starship);
      }
    }
    return starships;
  }

  private initItems(): string[] {
    let items: string[] = [];
    for (let item in this.initialData.items) {
      items.push(item);
    }
    return items;
  }
}

enum View {
  main,
  planet,
  starshipOnPlanet,
  starshipBetweenPlanets
}
