class ItemOnPlanet {
  private itemName: string;
  private available: number;
  private buyPrice: number;
  private sellPrice: number;

  constructor(itemName: string, item: IItemOnPlanet) {
    this.itemName = itemName;
    this.available = item.available;
    this.buyPrice = item.buy_price;
    this.sellPrice = item.sell_price;
  }

  public buy(count: number) {
    this.available -= count;
  }

  public sell(count: number) {
    this.available += count;
  }

  public getItemName(): string {
    return this.itemName;
  }

  public getCount(): number {
    return this.available;
  }

  public getBuyPrice(): number {
    return this.buyPrice;
  }

  public getSellPrice(): number {
    return this.sellPrice;
  }
}
