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
}
