// "use strict"

let skinCheckpoints = {
    "150": "dark",
    "350": "colored"
}

let defaults = {
    ground: {
        speed: 2,
    },
    player: {
        jump: {
            canDoubleJump: false,
            interval: 0.01,
        }
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
                jumpInterval: 0.0001,
            }
        }
    },
    doubleJump: {
        name: "Double Jump",
        duration: {
            min: 200,
            max: 250,
        },
        properties: {
            player: {
                canDoubleJump: true,
            }
        }
    },
    obstaclesGalore: {
        name: "Obstacles Galore",
        duration: {
            min: 150,
            max: 250,
        },
        properties: {
            obstacles: {

            }
        }
    },
    superSpeed: {
        name: "Super Speed",
        duration: {
            min: 50,
            max: 100,
        },
        properties: {
            ground: {
                speed: 3.5,
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
    console.log(currLevel);
    
    // Displays to the player the current level they are on
    level_display_name(currLevel.name); // ------------------------ NEED TO FINISH

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
}

// recursivily finds the paths to the end leafs
function level_tree (tree, path) {
    if (typeof tree !== "object") {
        paths.push(path);
        return tree
    }

    for (let leaf in tree) {
        level_tree(tree[leaf], [...path, leaf])
    }
}


function level_display_name() {} // ----------------------------- NEED TO FINISH


level_set(level_pick_random());

