class ItemOnStarship {
  private itemName: string;
  private available: number;

  constructor(item: ItemOnPlanet) {
    this.itemName = item.getItemName();
    this.available = 0;
  }

  public sell(count: number) {
    this.available -= count;
  }

  public buy(count: number) {
    this.available += count;
  }

  public getItemName(): string {
    return this.itemName;
  }

  public getCount(): number {
    return this.available;
  }
}
