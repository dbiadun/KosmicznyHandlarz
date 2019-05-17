class Planet {
  private number: number;
  private planetName: string;
  private availableItems: ItemOnPlanet[];
  private x: number;
  private y: number;
  private starships: Starship[] = [];

  constructor(number: number, planetName: string, planet: IPlanet) {
    this.number = number;
    this.planetName = planetName;
    this.availableItems = [];
    for (let itemName in planet.available_items) {
      this.availableItems.push(new ItemOnPlanet(itemName, planet.available_items[itemName]));
    }
    this.x = planet.x;
    this.y = planet.y;
  }

  public addStarship(starship: Starship) {
    this.starships.push(starship);
  }

  public getNumber(): number {
    return this.number;
  }

  public getPlanetName(): string {
    return this.planetName;
  }

  public getItems(): ItemOnPlanet[] {
    return this.availableItems;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getStarships() {
    return this.starships;
  }
}
