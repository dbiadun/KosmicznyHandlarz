"use strict";
class ItemOnPlanet {
    constructor(itemName, item) {
        this.itemName = itemName;
        this.available = item.available;
        this.buyPrice = item.buy_price;
        this.sellPrice = item.sell_price;
    }
    buy(count) {
        this.available -= count;
    }
    sell(count) {
        this.available += count;
    }
    getItemName() {
        return this.itemName;
    }
    getCount() {
        return this.available;
    }
    getBuyPrice() {
        return this.buyPrice;
    }
    getSellPrice() {
        return this.sellPrice;
    }
}
