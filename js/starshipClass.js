"use strict";
class Starship {
    constructor(starshipName, starship) {
        this.usedSpace = 0;
        this.items = [];
        this.starshipName = starshipName;
        this.space = starship.cargo_hold_size;
        this.position = starship.position;
    }
    getStarshipName() {
        return this.starshipName;
    }
    getSpace() {
        return this.space;
    }
    getUsedSpace() {
        return this.usedSpace;
    }
    getPosition() {
        return this.position;
    }
    getItems() {
        return this.items;
    }
    getPlanet() {
        if (this.position.includes("->")) {
            return "";
        }
        else {
            return this.position;
        }
    }
}
