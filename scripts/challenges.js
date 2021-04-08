// "use strict"

// --- challenges --- //

let challenges = {
    last: null,
    nextDist: 100,

    get_rand: function () {
        // gets a random challenge from the levels object
        // returns the name of the challenge and nothing more
        return Object.keys(challenges.types)[Math.floor(Math.random() * Object.keys(challenges.types).length)]
    },

    defaults : {
        ground: {
            speed: 2,
        },
        player: {
            canDoubleJump: false,
            jumpInterval: 0.01,
        },
        obstacles: {

        }
    },

    types: {
        normal: {
            name: "Back to Basics",
            duration: {
                min: 200,
                max: 250,
            },
            properties: {}
        },
        moon: {
            name: "Moon Shoes",
            duration: {
                min: 200,
                max: 350,
            },
            properties: {
                ground: {
                    speed: 1.75,
                },
                player: {
                    jumpInterval: 0.005,
                }
                // ------------------------------------------ SHOULD ADD REDUCED ENEMY SPAWN
            }
        },
        // doubleJump: {
        //     name: "Double Jump",
        //     duration: {
        //         min: 200,
        //         max: 250,
        //     },
        //     properties: {
        //         player: {
        //             canDoubleJump: true,
        //         }
        //     }
        // },
        // obstaclesGalore: {
        //     name: "Obstacles Galore",
        //     duration: {
        //         min: 150,
        //         max: 250,
        //     },
        //     properties: {
        //         obstacles: {

        //         }
        //     }
        // },
        superSpeed: {
            name: "Super Speed",
            duration: {
                min: 50,
                max: 100,
            },
            properties: {
                ground: {
                    speed: 3.25,
                }
            }
        }
    },

    activate: function (challenge) {
        let currChal = challenges.types[challenge];
        challenges.last = currChal.name;
    
        // Displays to the player the current level they are on
        display.announce(currChal.name);

        // The timeout is to allow for the message to display on screen before activating the challenge
        setTimeout( () => {
            // Sets all properties for the level
            for (let prop in challenges.defaults) {
                let p;
                switch (prop) {
                    case "ground":
                        p = ground;
                        break;
                    case "player":
                        p = player;
                        break;
                    case "obstacles":
                        p = obstacles;
                        break;
                }

                for (let path in challenges.defaults[prop]) {
                    p[path] = currChal.properties[prop] ? currChal.properties[prop][path] : challenges.defaults[prop][path];
                }
            }
        }, 5000)
    }
}

// --- Display --- //

let display = {
    inUse: false,
    announce: function (text) {
        // Only if the display is not in use does it display something, this prevents the canceling of an animation
        if (!display.inUse) {
            display.inUse = true;

            let indicator = document.getElementById("level-indicator");
            indicator.style.fontSize = '0';
            indicator.innerText = text;

            let currFontSize = 0;
            let maxFontSize = 3.5; // in 'vw's
            
            // Increases the text's size until it reaches maxFontSize
            let id = setInterval(() => {
                if (currFontSize >= maxFontSize) {
                    clearInterval(id);
                } else {
                    currFontSize += 0.1;
                    indicator.style.fontSize = currFontSize + 'vw';
                }
            }, 10)

            // the timeout makes it so the two intervals don't run at once
            setTimeout(() => {
                let id2 = setInterval(() => {
                    if (currFontSize < 0) {
                        indicator.style.fontSize = '0';
                        display.inUse = false;                
                        clearInterval(id2);
                    } else {
                        currFontSize -= 0.1;
                        indicator.style.fontSize = currFontSize + 'vw';
                    }
                }, 10)
            }, 2500)
        } else {
            // Recursivily tries to display
            setTimeout(() => {
                display.announce(text)
            }, 1000)
        }
    }
}

