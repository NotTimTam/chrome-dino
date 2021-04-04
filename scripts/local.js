"use strict"

// Thanks to Tania for the info on local storage
// https://www.taniarascia.com/how-to-use-local-storage-with-javascript/

let scores = localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : [0, 0, 0, 0, 0];
let skins = localStorage.getItem('skins') ? JSON.parse(localStorage.getItem('skins')) : ['default']
let currSkin = localStorage.getItem('currSkin') ? localStorage.getItem('currSkin') : 'default'


// highscores

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

// Skins

function skins_return() {
    return skins;
}

function skins_add(skin) {
    // If skin isn't already in stored locally
    if (!skins.includes(skin)) {
        skins.push(skin)
        localStorage.setItem("skins", JSON.stringify(skins))
    }
}

// Debugging
function skins_reset() {
    localStorage.setItem('skins', JSON.stringify(["default"]))
}

function currSkin_change(skin) {
    localStorage.setItem('currSkin', skin)
}

function currSkin_return() {
    return currSkin;
}
