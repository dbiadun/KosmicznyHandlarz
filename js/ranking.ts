function createRankingElement(position: number, username: string, score: number): HTMLLIElement {
  let positionSpan = document.createElement("span");
  positionSpan.classList.add("position");
  positionSpan.innerText = position.toString() + ".";

  let usernameSpan = document.createElement("span");
  usernameSpan.classList.add("username");
  usernameSpan.innerText = username;

  let scoreSpan = document.createElement("span");
  scoreSpan.classList.add("score");
  scoreSpan.innerText = score.toString();

  let element = document.createElement("li");
  element.appendChild(positionSpan);
  element.appendChild(usernameSpan);
  element.appendChild(scoreSpan);

  return element;
}

function addRankingElement(ranking: HTMLUListElement, position: number, username: string, score: number) {
  let element: HTMLLIElement = createRankingElement(position, username, score);
  ranking.appendChild(element);
}

function updateRanking() {
  let rankingContainer: HTMLUListElement = document.querySelector(".ranking ul") as HTMLUListElement;
  let rankingString: string | null = localStorage.getItem("ranking");
  if (rankingString) {
    let ranking: { username: string, score: number }[] = JSON.parse(rankingString);
    while (rankingContainer.lastElementChild) {
      rankingContainer.removeChild(rankingContainer.lastElementChild);
    }
    for (let i = 0; i < ranking.length; i++) {
      addRankingElement(rankingContainer, i + 1, ranking[i].username, ranking[i].score);
    }
  }
}

updateRanking();
