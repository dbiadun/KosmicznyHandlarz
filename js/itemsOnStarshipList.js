"use strict";
function createItemsOnStarshipListElement(item) {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.getItemName();
    let countSpan = document.createElement("span");
    countSpan.innerText = item.getCount().toString();
    let element = document.createElement("li");
    element.appendChild(nameSpan);
    element.appendChild(countSpan);
    return element;
}
function addItemsOnStarshipListElement(itemsList, item) {
    let element = createItemsOnStarshipListElement(item);
    itemsList.appendChild(element);
}
function updateItemsOnStarshipList(list, items) {
    while (list.childElementCount > 1) {
        list.removeChild(list.lastElementChild);
    }
    for (let item of items) {
        addItemsOnStarshipListElement(list, item);
    }
}
