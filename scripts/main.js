"use strict"

window.onload = function () {
    let scoreList = document.getElementById('highscores-list');
    let highscores = highscores_return();
    for (let i = 0; i < scoreList.children.length; i++) {
        scoreList.children[i].innerHTML = highscores[i];
    }
}