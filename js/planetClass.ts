class Planet {
  private number: number;
  private planetName: string;
  private availableItems: ItemOnPlanet[];
  private x: number;
  private y: number;
  private starships: Starship[] = [];
  private initialData: IPlanet;

  constructor(number: number, planetName: string, planet: IPlanet) {
    this.number = number;
    this.planetName = planetName;
    this.initialData = planet;
    this.availableItems = [];
    for (let itemName in planet.available_items) {
      this.availableItems.push(new ItemOnPlanet(itemName, planet.available_items[itemName]));
    }
    this.x = planet.x;
    this.y = planet.y;
  }

  public sellItem(sItem: ItemOnStarship, count: number) {
    if (count === 0) {
      return;
    }
    let item: ItemOnPlanet | null = this.itemFromString(sItem.getItemName());
    if (!item) {
      if (this.initialData.available_items[sItem.getItemName()]) {
        let itemData: IItemOnPlanet = this.initialData.available_items[sItem.getItemName()];
        item = new ItemOnPlanet(sItem.getItemName(), { available: 0, sell_price: itemData.sell_price, buy_price: itemData.buy_price });
      } else {
        item = new ItemOnPlanet(sItem.getItemName(), { available: 0, sell_price: 0, buy_price: 0});
      }
      this.availableItems.push(item);
    }
    item.sell(count);
  }

  public buyItem(item: ItemOnPlanet, count: number) {
    item.buy(count);
    if (item.getCount() <= 0) {
      this.removeItem(item);
    }
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

  public getItemSellPrice(itemName: string): number {
    let item: ItemOnPlanet | null = this.itemFromString(itemName);
    if (item) {
      return item.getSellPrice();
    }
    return 0;
  }

  private removeItem(item: ItemOnPlanet) {
    let items = this.availableItems;
    for (let i = 0; i < items.length; i++) {
      if (item === items[i]) {
        items[i] = items[items.length - 1];
        items[items.length - 1] = item;
        items.pop();
        return;
      }
    }
  }

  private itemFromString(itemName: string): ItemOnPlanet | null {
    for (let item of this.availableItems) {
      if (item.getItemName() === itemName) {
        return item;
      }
    }

    return null;
  }
}
