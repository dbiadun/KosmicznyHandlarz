class Starship {
  private starshipName: string;
  private space: number;
  private usedSpace: number = 0;
  private position: string;
  private x: number = -1;
  private y: number = -1;
  private items: ItemOnStarship[] = [];

  constructor(starshipName: string, starship: IStarship) {
    this.starshipName = starshipName;
    this.space = starship.cargo_hold_size;
    this.position = starship.position;
  }

  public sellItem(item: ItemOnStarship, count: number) {
    item.sell(count);
    if (item.getCount() <= 0) {
      this.removeItem(item);
    }

    this.usedSpace -= count;
  }

  public buyItem(pItem: ItemOnPlanet, count: number) {
    if (count === 0) {
      return;
    }
    let item: ItemOnStarship | null = this.itemFromString(pItem.getItemName());
    if (!item) {
      item = new ItemOnStarship(pItem);
      this.items.push(item);
    }
    item.buy(count);

    this.usedSpace += count;
  }

  public startJourney(nextPlanet: Planet, map: SpaceMap) {
    let firstPlanet: Planet = game.getPlanetsDictionary()[this.getPlanet()];
    this.x = firstPlanet.getX();
    this.y = firstPlanet.getY();
    this.position = firstPlanet.getPlanetName() + " -> " + nextPlanet.getPlanetName();
    let xStart = firstPlanet.getX();
    let yStart = firstPlanet.getY();
    let xDif = nextPlanet.getX() - firstPlanet.getX();
    let yDif = nextPlanet.getY() - firstPlanet.getY();
    let wholeDistance = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2));
    let distance = 0;
    let step = 0.1;
    let self = this;
    map.addStarship(this);


    let intv = setInterval(nextStep, step * 1000);

    function nextStep() {
      if (distance >= wholeDistance) {
        clearInterval(intv);
        self.x = xStart + xDif;
        self.y = yStart + yDif;
        self.position = nextPlanet.getPlanetName();
        game.endJourney(self, nextPlanet);
      }
      distance += step;
      self.x = xStart + distance * xDif / wholeDistance;
      self.y = yStart + distance * yDif / wholeDistance;
    }
  }

  public getStarshipName(): string {
    return this.starshipName;
  }

  public getSpace(): number {
    return this.space;
  }

  public getUsedSpace(): number {
    return this.usedSpace;
  }

  public getPosition(): string {
    return this.position;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getItems(): ItemOnStarship[] {
    return this.items;
  }

  public getPlanet(): string {
    if (this.position.includes("->")) {
      return "";
    } else {
      return this.position;
    }
  }

  private removeItem(item: ItemOnStarship) {
    let items = this.items;
    for (let i = 0; i < items.length; i++) {
      if (item === items[i]) {
        items[i] = items[items.length - 1];
        items[items.length - 1] = item;
        items.pop();
        return;
      }
    }
  }

  private itemFromString(itemName: string): ItemOnStarship | null {
    for (let item of this.items) {
      if (item.getItemName() === itemName) {
        return item;
      }
    }

    return null;
  }
}
