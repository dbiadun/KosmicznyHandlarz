"use strict";
class Starship {
    constructor(starshipName, starship) {
        this.usedSpace = 0;
        this.x = -1;
        this.y = -1;
        this.items = [];
        this.starshipName = starshipName;
        this.space = starship.cargo_hold_size;
        this.position = starship.position;
    }
    sellItem(item, count) {
        item.sell(count);
        if (item.getCount() <= 0) {
            this.removeItem(item);
        }
        this.usedSpace -= count;
    }
    buyItem(pItem, count) {
        if (count === 0) {
            return;
        }
        let item = this.itemFromString(pItem.getItemName());
        if (!item) {
            item = new ItemOnStarship(pItem);
            this.items.push(item);
        }
        item.buy(count);
        this.usedSpace += count;
    }
    startJourney(nextPlanet) {
        let firstPlanet = game.getPlanetsDictionary()[this.getPlanet()];
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
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
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
    removeItem(item) {
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
    itemFromString(itemName) {
        for (let item of this.items) {
            if (item.getItemName() === itemName) {
                return item;
            }
        }
        return null;
    }
}
