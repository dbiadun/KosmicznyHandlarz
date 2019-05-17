"use strict";
function createRankingElement(position, username, score) {
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
function addRankingElement(ranking, position, username, score) {
    let element = createRankingElement(position, username, score);
    ranking.appendChild(element);
}
function updateRanking() {
    let rankingContainer = document.querySelector(".ranking ul");
    let rankingString = localStorage.getItem("ranking");
    if (rankingString) {
        let ranking = JSON.parse(rankingString);
        while (rankingContainer.lastElementChild) {
            rankingContainer.removeChild(rankingContainer.lastElementChild);
        }
        for (let i = 0; i < ranking.length; i++) {
            addRankingElement(rankingContainer, i + 1, ranking[i].username, ranking[i].score);
        }
    }
}
updateRanking();
