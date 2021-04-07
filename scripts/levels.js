// "use strict"

// -------------------------------- Might use later
// let skinCheckpoints = {
//     "150": "dark",
//     "350": "colored"
// }

let defaults = {
    ground: {
        speed: 2,
    },
    player: {
        canDoubleJump: false,
        jumpInterval: 0.01,
    },
    obstacles: {

    }
}

let levels = {
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
}

function level_pick_random() {
    // gets a random level from the levels object
    return Object.keys(levels)[Math.floor(Math.random() * Object.keys(levels).length)]
}

let paths = []; // used to find paths to leaf nodes
function level_set(level) {
    let currLevel = levels[level];
    
    // Displays to the player the current level they are on
    level_display_name(currLevel.name);

    setTimeout( () => {
        // Sets all properties for the level
        for (let prop in defaults) {
            paths = []; // reset paths for each iteration
            level_tree(defaults[prop], []) // updates paths
            
            let dPath, cPath;

            // I spend my entire day trying to come up with a better solution than this, to no avail.
            switch (prop) {
                case "ground":
                    for (let path of paths) {
                        dPath = defaults[prop];
                        cPath = currLevel.properties[prop] || undefined;
                        for (let pa of path) {
                            dPath = dPath[pa];
                            if (cPath) cPath = cPath[pa];
                        }
                        ground[path[path.length - 1]] = cPath ? cPath : dPath
                    }
                    break;
                case "player":
                    for (let path of paths) {
                        dPath = defaults[prop];
                        cPath = currLevel.properties[prop] || undefined;
                        for (let pa of path) {
                            dPath = dPath[pa];
                            if (cPath) cPath = cPath[pa];
                        }
                        player[path[path.length - 1]] = cPath ? cPath : dPath
                    }
                    break;
                case "obstacles":
                    for (let path of paths) {
                        dPath = defaults[prop];
                        cPath = currLevel.properties[prop] || undefined;
                        for (let pa of path) {
                            dPath = dPath[pa];
                            if (cPath) cPath = cPath[pa];
                        }
                        obstacles[path[path.length - 1]] = cPath ? cPath : dPath
                    }
                    break;
                default: break;
            }
        }
    }, 5000)
}

// recursivily finds the paths to the end leafs
function level_tree (tree, path) {
    if (typeof tree !== "object") {
        paths.push(path);
        return tree;
    }

    for (let leaf in tree) {
        level_tree(tree[leaf], [...path, leaf]);
    }
}

let displaying = false;
function level_display_name(name) {
    if (!displaying) {
        displaying = true;
        let li = document.getElementById("level-indicator");
        li.style.fontSize = '0';
        let currFontSize = 0;
        let maxFontSize = 3.5; // in 'vw's
        li.innerText = name;

        let id = setInterval(() => {
            if (currFontSize >= maxFontSize) {
                clearInterval(id);
            } else {
                currFontSize += 0.1;
                li.style.fontSize = currFontSize + 'vw';
            }
        }, 10)

        setTimeout(() => {
            let id2 = setInterval(() => {
                if (currFontSize < 0) {
                    li.style.fontSize = '0';
                    displaying = false;                
                    clearInterval(id2);
                } else {
                    currFontSize -= 0.1;
                    li.style.fontSize = currFontSize + 'vw';
                }
            }, 10)
        }, 2500)
    } else {
        setTimeout(() => {
            level_display_name(name)
        }, 1000)
    }
    
}

