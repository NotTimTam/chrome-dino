"use strict"

// Thanks to Tania for the info on local storage
// https://www.taniarascia.com/how-to-use-local-storage-with-javascript/

let playerStorage = {
    // Will be used for setting starting values and reseting
    defaults: {
        highscores: [0, 0, 0, 0, 0],
        unlockedSkins: ["default"],
        currSkin: "default",
        // Skins to add: "color", "fbla", "rtxon";
        allSkins: ["default", "night"],
    },

    init: function () {
        playerStorage.pls;
        if (localStorage.getItem('playerStorage')) { // if localStorage has the property of playerStorage
            playerStorage.pls = JSON.parse(localStorage.getItem('playerStorage'));
        } else { // else set the local storage to its defaults
            playerStorage.pls = playerStorage.defaults;
            playerStorage.save();
        }

        return playerStorage;
    },

    // Skins functions
    skins_fn: {
        unlock: function (skin) {
            // Checks if the player already has the skin unlocked. Shouldn't be nessisary, but just in case
            if (!playerStorage.pls.unlockedSkins.includes(skin)) playerStorage.pls.unlockedSkins.push(skin);
            playerStorage.save();
            return playerStorage;
        },

        set_skin: function (skin) {
            // Makes sure the player has the skin unlocked
            if (playerStorage.pls.unlockedSkins.includes(skin)) {
                playerStorage.pls.currSkin = skin;
                colors.update_document(skin);
            }

            playerStorage.save();
            return playerStorage;
        },

        slider: function (direction) {
            // Allows for better readability
            let us = playerStorage.pls.unlockedSkins;

            // finds the index of the current skin
            let pastIndex = us.indexOf(playerStorage.pls.currSkin);

            // Updates skin based on direction
            let newIndex;
            if (direction === "left" || direction === "l")
                newIndex = pastIndex - 1 < 0 ? us.length - 1 : pastIndex - 1;
            else if (direction === "right" || direction === "r")
                newIndex = pastIndex + 1 > us.length - 1 ? 0 : pastIndex + 1;

            // Sets the new skin
            playerStorage.skins_fn.unlock(us[newIndex]);
            playerStorage.skins_fn.set_skin(us[newIndex]);

            update_fixed_images(playerStorage.pls.unlockedSkins[pastIndex]) // refers to a function in the main.js file

            playerStorage.save();
            return playerStorage;
        },

        get_rand_locked: function () {
            // Checks if all skins are already unlocked
            let available = [];
            // Have to do a loop becasue you can't directly compare objects in js
            for (let skin of playerStorage.pls.allSkins) {
                if (!playerStorage.pls.unlockedSkins.includes(skin)) {
                    available.push(skin);
                }
            }

            // If all skins are unlocked, return nothing
            if (available.length) {
                // if length > 0, find a random value of the available skins
                return available[Math.floor(Math.random() * available.length)];
            } else {
                // if length is 0, return nothing
                return;
            }
        },
    },

    // highscores functions
    highscores_fn: {
        set_score: function (score) {
            for (let i = 0; i < playerStorage.pls.highscores.length; i++) {
                if (score > playerStorage.pls.highscores[i]) {
                    // if a score is higher then slide every item down one based on the score's index
                    playerStorage.pls.highscores.splice(i, 0, score)
                    playerStorage.pls.highscores.pop();

                    break;
                }
            }

            playerStorage.save();
            return playerStorage;
        },
    },

    reset(val) {
        // Resets a locally stored value to its default
        playerStorage.pls[val] = playerStorage.defaults[val];

        playerStorage.save()
        return playerStorage;
    },

    save() {
        // Saves all values in pls to local storage
        localStorage.setItem('playerStorage', JSON.stringify(playerStorage.pls));

        return playerStorage;
    },

    get_prop(prop) {
        return playerStorage.pls[prop];
    },
}

// Intializes playerStorage
playerStorage.init(); 

// --- Testing --- //

// playerStorage.reset("unlockedSkins")
// playerStorage.skins_fn.unlock('night');



