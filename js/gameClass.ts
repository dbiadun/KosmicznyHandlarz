class Game {
  private usernameContainer: HTMLElement = document.getElementById("username-container") as HTMLElement;
  private creditsContainer: HTMLElement = document.getElementById("credits-container") as HTMLElement;
  private timeContainer: HTMLElement = document.getElementById("time-container") as HTMLElement;
  private planetsListContainer: HTMLUListElement = document.querySelector(".outside-popups.planets-list ul") as HTMLUListElement;
  private starshipsListContainer: HTMLUListElement = document.querySelector(".outside-popups.spaceships-list ul") as HTMLUListElement;
  private returnButton: HTMLElement = document.getElementById("return-button") as HTMLElement;

  private initialData: IAppData = initialData;
  private spaceMap: SpaceMap;
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
    this.spaceMap = new SpaceMap();
    this.username = this.initUsername();
    this.credits = this.initCredits();
    this.time = this.initTime();
    this.planets = this.initPlanets();
    this.starships = this.initStarships();
    this.items = this.initItems();
    this.initMainView();
  }

  public setCurrentView(view: View) {
    this.currentView = view;
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

  public startJourney(starship: Starship, planet: Planet) {
    let startPlanet = this.planetsDictionary[starship.getPlanet()];
    startPlanet.removeStarship(starship);
    starship.startJourney(planet, this.spaceMap);
    this.updateStarshipsList();
    this.setStarshipBetweenPlanetsView(starship);
  }

  public endJourney(starship: Starship, planet: Planet) {
    planet.addStarship(starship);
    if (this.currentView === View.planet && this.currentPlanet.getPlanet() === planet) {
      this.currentPlanet.updateStarshipsList();
    }
    this.updateStarshipsList();
    if (this.currentView === View.starshipBetweenPlanets && this.currentStarshipBetweenPlanets.getStarship() === starship) {
      this.setStarshipOnPlanetView(starship);
    }
  }

  private initTimer() {
    let self = this;
    this.updateTime();
    let intv = setInterval(nextSecond, 1000);

    function nextSecond() {
      if (self.time > 0) {
        self.time--;
        self.updateTime();
      }
      if (self.time <= 0) {
        clearInterval(intv);
        let rankingString: string | null = localStorage.getItem("ranking");
        let ranking: { username: string, score: number }[];
        if (rankingString) {
          ranking = JSON.parse(rankingString);
        } else {
          ranking = [];
        }
        ranking.push({ username: self.username, score: self.credits });
        for (let i = ranking.length - 1; i > 0; i--) {
          if (ranking[i].score > ranking[i - 1].score) {
            let helper = ranking[i];
            ranking[i] = ranking[i - 1];
            ranking[i - 1] = helper;
          }
        }
        while (ranking.length > 10) {
          ranking.pop();
        }
        localStorage.setItem("ranking", JSON.stringify(ranking));

        if (confirm(`Koniec gry!\nTwój wynik: ${self.credits}`)) {
          self.returnButton.click();
        } else {
          self.returnButton.click();
        }
      }
    }
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
      this.spaceMap.addPlanet(planet);
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
