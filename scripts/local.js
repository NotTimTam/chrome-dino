"use strict"

// Thanks to Tania for the info on local storage
// https://www.taniarascia.com/how-to-use-local-storage-with-javascript/

let scores = localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : [0, 0, 0, 0, 0];

function highscores_return() {
    return scores; // returns an array of the highscores
}

function highscores_set(testingScore) {
    for (let i = 0; i < scores.length; i++) {
        if (testingScore > scores[i]) {
            // if a score is higher then slide every item down one based on the score's index
            scores.splice(i, 0, testingScore)
            scores.pop();
            
            // Reassigns local storage to account for the new value
            localStorage.setItem('highscores', JSON.stringify(scores))
            break;
        }
    }
}

// the following should be used for debugging only
function highscores_reset() {
    localStorage.setItem("highscores", JSON.stringify([0, 0, 0, 0, 0]))
}
