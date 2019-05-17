"use strict";
class Starship {
    constructor(starshipName, starship) {
        this.usedSpace = 0;
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
