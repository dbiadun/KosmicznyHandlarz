"use strict";
class ItemOnStarship {
    constructor(item) {
        this.itemName = item.getItemName();
        this.available = 0;
    }
    sell(count) {
        this.available -= count;
    }
    buy(count) {
        this.available += count;
    }
    getItemName() {
        return this.itemName;
    }
    getCount() {
        return this.available;
    }
}
