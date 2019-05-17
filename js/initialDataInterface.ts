interface IItemOnPlanet {
  available: number;
  buy_price: number;
  sell_price: number;
}

interface IPlanet {
  available_items: {
    [index: string]: IItemOnPlanet;
  };
  x: number;
  y: number;
}

interface IStarship {
  cargo_hold_size: number;
  position: string;
}

interface IAppData {
  game_duration: number;
  initial_credits: number;
  items: string[];
  planets: {
    [index: string]: IPlanet;
  };
  starships: {
    [index: string]: IStarship;
  };
}
