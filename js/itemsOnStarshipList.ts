function createItemsOnStarshipListElement(item: ItemOnStarship): HTMLLIElement {
  let nameSpan = document.createElement("span");
  nameSpan.innerText = item.getItemName();
  let countSpan = document.createElement("span");
  countSpan.innerText = item.getCount().toString();

  let element = document.createElement("li");
  element.appendChild(nameSpan);
  element.appendChild(countSpan);

  return element;
}

function addItemsOnStarshipListElement(itemsList: HTMLUListElement, item: ItemOnStarship) {
  let element: HTMLElement = createItemsOnStarshipListElement(item);
  itemsList.appendChild(element);
}

function updateItemsOnStarshipList(list: HTMLUListElement, items: ItemOnStarship[]) {
  while (list.childElementCount > 1) {
    list.removeChild(list.lastElementChild as HTMLElement);
  }
  for (let item of items) {
    addItemsOnStarshipListElement(list, item);
  }
}
