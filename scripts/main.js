"use strict"

// Updates the fixed images on the home page
function update_fixed_images (name) {
    let images = document.getElementsByClassName("mystical"), // gets all image elements on the home screen
        re = new RegExp(`${name}`, 'g');
    
    for (let img of images)
        img.src = img.src.replace(re, playerStorage.pls.currSkin);
}

// The main function only needs to be run once at the begining of the program
let main = function () {
    // --- Updating highscore variables --- //
    let scoreList = document.getElementById('highscores-list'), 
        highscores = playerStorage.pls.highscores,
        scorelistChildren = scoreList.children;

    for (let i = 0; i < scorelistChildren.length; i++)
        scorelistChildren[i].innerHTML = highscores[i];

    // --- Updating images based on skin values --- //
    update_fixed_images(playerStorage.defaults.currSkin); // uses defualt becuase that is what normally loads on the page

    // --- Adding event listeners to the skins switching arrows --- //
    document
        .getElementById("arrow-left")
        .addEventListener("click", () => {
            playerStorage.skins_fn.slider("left")
        })

    document
        .getElementById("arrow-right")
        .addEventListener("click", () => {
            playerStorage.skins_fn.slider("right")
        })
}
main()
