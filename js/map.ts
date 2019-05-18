class SpaceMap {
  private svgNS: string = "http://www.w3.org/2000/svg";
  private map: HTMLElement = document.getElementById("svg-map") as HTMLElement;
  private namesContainer: HTMLElement = document.querySelector(".map-container .map-names-popup") as HTMLElement;
  private parent: HTMLElement;
  private width: number;
  private namesContainerMoved: boolean = false;

  constructor() {
    this.parent = this.map.parentElement as HTMLElement;
    this.width = this.parent.offsetWidth * 0.94;
    this.map.setAttribute("height", this.width.toString());
    this.initNamesContainerMove();
  }

  public addPlanet(planet: Planet) {
    let el: SVGCircleElement = document.createElementNS(this.svgNS, "circle") as SVGCircleElement;
    el.setAttributeNS("", "cx", this.getCoord(planet.getX()).toString());
    el.setAttributeNS("", "cy", this.getCoord(planet.getY()).toString());
    el.setAttributeNS("", "r", this.getSize(1.4).toString());
    el.setAttributeNS("", "fill", "#c6d5eb");

    el.addEventListener("click", () => { game.setPlanetView(planet); });

    el.addEventListener("mouseover", () => {
      el.classList.add("cursor-pointer");
      this.namesContainer.innerText = planet.getPlanetName();
      this.namesContainer.classList.add("visible");
    });

    el.addEventListener("mouseout", () => {
      el.classList.remove("cursor-pointer");
      this.namesContainer.classList.remove("visible");
    });

    this.map.appendChild(el);
  }

  public addStarship(starship: Starship) {
    let el: SVGCircleElement = document.createElementNS(this.svgNS, "circle") as SVGCircleElement;
    el.setAttributeNS("", "cx", this.getCoord(starship.getX()).toString());
    el.setAttributeNS("", "cy", this.getCoord(starship.getY()).toString());
    el.setAttributeNS("", "r", this.getSize(0.9).toString());
    el.setAttributeNS("", "fill", "orange");
    el.style.zIndex = "10";

    el.addEventListener("click", () => {
      if (starship.getPlanet() === "") {
        game.setStarshipBetweenPlanetsView(starship);
      } else {
        game.setStarshipOnPlanetView(starship);
      }
    });

    el.addEventListener("mouseover", () => {
      el.classList.add("cursor-pointer");
      this.namesContainer.innerText = starship.getStarshipName();
      this.namesContainer.classList.add("visible");
    });

    el.addEventListener("mouseout", () => {
      el.classList.remove("cursor-pointer");
      this.namesContainer.classList.remove("visible");
    });

    this.map.appendChild(el);

    let stepTime = 10;
    let intv = setInterval(nextStep, stepTime);
    let self = this;

    function nextStep() {
      if (starship.getPlanet() !== "") {
        clearInterval(intv);
        self.map.removeChild(el);
      }
      el.setAttributeNS("", "cx", self.getCoord(starship.getX()).toString());
      el.setAttributeNS("", "cy", self.getCoord(starship.getY()).toString());
    }
  }

  private initNamesContainerMove() {
    this.namesContainer.style.bottom = "30px";
    this.namesContainer.style.top = "auto";
    this.namesContainer.addEventListener("mouseover", () => {
      if (this.namesContainerMoved) {
        this.namesContainerMoved = false;
        this.namesContainer.style.bottom = "30px";
        this.namesContainer.style.top = "auto";
      } else {
        this.namesContainerMoved = true;
        this.namesContainer.style.top = "30px";
        this.namesContainer.style.bottom = "auto";
      }
    });
  }

  private getCoord(c: number): number {
    return (this.width / 104) * (2 + c);
  }

  private getSize(s: number): number {
    return s * (this.width / 104);
  }
}
