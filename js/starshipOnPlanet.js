"use strict";
function createStarshipOnPlanetPopupItemsToSellListElement(item, form, planet, starship) {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.getItemName();
    nameSpan.classList.add("aligner");
    let nameSpanContainer = document.createElement("span");
    nameSpanContainer.appendChild(nameSpan);
    let countSpan = document.createElement("span");
    countSpan.innerText = item.getCount().toString();
    countSpan.classList.add("aligner");
    let countSpanContainer = document.createElement("span");
    countSpanContainer.appendChild(countSpan);
    let countInput = document.createElement("input");
    countInput.setAttribute("type", "number");
    countInput.setAttribute("value", "0");
    countInput.setAttribute("min", "0");
    countInput.setAttribute("max", `${item.getCount()}`);
    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", ">");
    let countInputContainer = document.createElement("span");
    countInputContainer.classList.add("trade");
    countInputContainer.appendChild(countInput);
    countInputContainer.appendChild(submitInput);
    submitInput.addEventListener("click", () => {
        for (let el of form.elements) {
            el.setCustomValidity("");
        }
        countInput.setCustomValidity(game.sellItem(item, countInput.value, planet, starship));
        form.reset();
    });
    let element = document.createElement("li");
    element.appendChild(nameSpanContainer);
    element.appendChild(countSpanContainer);
    element.appendChild(countInputContainer);
    return element;
}
function addStarshipOnPlanetPopupItemsToSellListElement(itemsList, item, planet, starship) {
    let form = itemsList.parentNode;
    let element = createStarshipOnPlanetPopupItemsToSellListElement(item, form, planet, starship);
    itemsList.appendChild(element);
}
function updateStarshipOnPlanetItemsToSellList(list, items, planet, starship) {
    while (list.childElementCount > 1) {
        list.removeChild(list.lastElementChild);
    }
    for (let item of items) {
        addStarshipOnPlanetPopupItemsToSellListElement(list, item, planet, starship);
    }
}
function createStarshipOnPlanetPopupItemsToBuyListElement(item, form, planet, starship) {
    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.getItemName();
    nameSpan.classList.add("aligner");
    let nameSpanContainer = document.createElement("span");
    nameSpanContainer.appendChild(nameSpan);
    let countSpan = document.createElement("span");
    countSpan.innerText = item.getCount().toString();
    countSpan.classList.add("aligner");
    let countSpanContainer = document.createElement("span");
    countSpanContainer.appendChild(countSpan);
    let buyPriceSpan = document.createElement("span");
    buyPriceSpan.innerText = item.getBuyPrice().toString();
    buyPriceSpan.classList.add("aligner");
    let buyPriceSpanContainer = document.createElement("span");
    buyPriceSpanContainer.appendChild(buyPriceSpan);
    let sellPriceSpan = document.createElement("span");
    sellPriceSpan.innerText = item.getSellPrice().toString();
    sellPriceSpan.classList.add("aligner");
    let sellPriceSpanContainer = document.createElement("span");
    sellPriceSpanContainer.appendChild(sellPriceSpan);
    let countInput = document.createElement("input");
    countInput.setAttribute("type", "number");
    countInput.setAttribute("value", "0");
    countInput.setAttribute("min", "0");
    countInput.setAttribute("max", `${item.getCount()}`);
    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", ">");
    let countInputContainer = document.createElement("span");
    countInputContainer.classList.add("trade");
    countInputContainer.appendChild(countInput);
    countInputContainer.appendChild(submitInput);
    submitInput.addEventListener("click", () => {
        for (let el of form.elements) {
            el.setCustomValidity("");
        }
        countInput.setCustomValidity(game.buyItem(item, countInput.value, planet, starship));
        form.reset();
    });
    let element = document.createElement("li");
    element.appendChild(nameSpanContainer);
    element.appendChild(countSpanContainer);
    element.appendChild(buyPriceSpanContainer);
    element.appendChild(sellPriceSpanContainer);
    element.appendChild(countInputContainer);
    return element;
}
function addStarshipOnPlanetPopupItemsToBuyListElement(itemsList, item, planet, starship) {
    let form = itemsList.parentNode;
    let element = createStarshipOnPlanetPopupItemsToBuyListElement(item, form, planet, starship);
    itemsList.appendChild(element);
}
function updateStarshipOnPlanetItemsToBuyList(list, items, planet, starship) {
    while (list.childElementCount > 1) {
        list.removeChild(list.lastElementChild);
    }
    for (let item of items) {
        addStarshipOnPlanetPopupItemsToBuyListElement(list, item, planet, starship);
    }
}
