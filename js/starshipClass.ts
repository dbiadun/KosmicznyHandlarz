class Starship {
  private starshipName: string;
  private space: number;
  private usedSpace: number = 0;
  private position: string;
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

  public getStarshipName(): string {
    return this.starshipName;
  }

  public getSpace() {
    return this.space;
  }

  public getUsedSpace(): number {
    return this.usedSpace;
  }

  public getPosition(): string {
    return this.position;
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
