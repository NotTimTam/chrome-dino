"use strict"

window.onload = function () {
    let scoreList = document.getElementById('highscores-list');
    let highscores = highscores_return();
    for (let i = 0; i < scoreList.children.length; i++) {
        scoreList.children[i].innerHTML = highscores[i];
    }
}

const leftArrow = document.getElementById("arrow-left")
const rightArrow = document.getElementById("arrow-right")
skins_add("dark");
let skinsCarousell = skins_return();
let currentSkinIndex = skinsCarousell.indexOf(currSkin_return());
update_colors(skinsCarousell[currentSkinIndex]); 

leftArrow.addEventListener("click", () => {
    switch_skin("left")
})
rightArrow.addEventListener("click", () => {
    switch_skin("right")
})

function switch_skin(direction) {
    let pastIndex = currentSkinIndex;
    if (direction === "left") {
        currentSkinIndex = currentSkinIndex - 1 < 0 ? skinsCarousell.length - 1 : currentSkinIndex - 1;
    } else if (direction === "right") {
        currentSkinIndex = currentSkinIndex + 1 > skinsCarousell.length - 1 ? 0 : currentSkinIndex + 1;
    }
    currSkin_change(skinsCarousell[currentSkinIndex])
    update_colors(skinsCarousell[currentSkinIndex]);

    let arr = document.getElementsByClassName("mystical");
    let re = new RegExp(`${skinsCarousell[pastIndex]}`, 'g');
    for (let img of arr) {
        img.src = img.src.replace(re, skinsCarousell[currentSkinIndex])
    }   
}