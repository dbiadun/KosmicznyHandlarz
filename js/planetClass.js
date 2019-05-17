"use strict";
class Planet {
    constructor(number, planetName, planet) {
        this.starships = [];
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
    sellItem(sItem, count) {
        if (count === 0) {
            return;
        }
        let item = this.itemFromString(sItem.getItemName());
        if (!item) {
            if (this.initialData.available_items[sItem.getItemName()]) {
                let itemData = this.initialData.available_items[sItem.getItemName()];
                item = new ItemOnPlanet(sItem.getItemName(), { available: 0, sell_price: itemData.sell_price, buy_price: itemData.buy_price });
            }
            else {
                item = new ItemOnPlanet(sItem.getItemName(), { available: 0, sell_price: 0, buy_price: 0 });
            }
            this.availableItems.push(item);
        }
        item.sell(count);
    }
    buyItem(item, count) {
        item.buy(count);
        if (item.getCount() <= 0) {
            this.removeItem(item);
        }
    }
    addStarship(starship) {
        this.starships.push(starship);
    }
    removeStarship(starship) {
        for (let i = 0; i < this.starships.length; i++) {
            if (this.starships[i] === starship) {
                this.starships[i] = this.starships[this.starships.length - 1];
                this.starships[this.starships.length - 1] = starship;
                this.starships.pop();
                return;
            }
        }
    }
    getNumber() {
        return this.number;
    }
    getPlanetName() {
        return this.planetName;
    }
    getItems() {
        return this.availableItems;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getStarships() {
        return this.starships;
    }
    getItemSellPrice(itemName) {
        let item = this.itemFromString(itemName);
        if (item) {
            return item.getSellPrice();
        }
        return 0;
    }
    removeItem(item) {
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
    itemFromString(itemName) {
        for (let item of this.availableItems) {
            if (item.getItemName() === itemName) {
                return item;
            }
        }
        return null;
    }
}
