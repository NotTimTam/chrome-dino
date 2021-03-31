"use strict";
// (╯°□°)╯︵ ┻━┻
// player data.
let player = {

    jump: {
        speed: 1,
        gravity: 200,
        initialGravity: 200,
        downGravity: 250,
        height: -250,
        interval: 0.01,
        active: false
    },

    buttons: {
        up: false,
        down: false
    },

    anim: {
        speed: 10,
        frame: 0,
        currentAnim: "run",
        sources: {
            stand: [
            "../images/stand_1.png",
            ],
            run: [
                "../images/run_1.png",
                "../images/run_2.png",
            ],
            duck: [
                "../images/duck_1.png",
                "../images/duck_2.png",
            ],
            die: [
                "../images/die_1.png",
            ]
        },
        images: {
            stand: [],
            run: [],
            duck: [],
            die: []
        }
    },

    pos: {
        x: 10,
        y: Math.round(screenHeight - 50),
    },

    events: function () {
        window.addEventListener("keydown", (e) => {

            if (!player.jump.active && (e.key === " " || e.key === "ArrowUp")) {
                let x = 0;
                player.buttons.up = true;
                player.jump.active = true;

                let id = setInterval(() => {
                    if (player.pos.y > Math.round(screenHeight - 50)) {
                        player.pos.y = Math.round(screenHeight - 50);
                        player.jump.active = false;
                        player.jump.gravity = player.jump.initialGravity;
                        clearInterval(id);
                    } else {
                        player.pos.y = player.jump.gravity * x ** 2 + player.jump.height * x + Math.round(screenHeight - 50);
                        x += player.jump.interval;
                    }
                }, player.jump.speed)

            } else if (player.jump.active && e.key === "ArrowDown") {

                let id2 = setInterval(() => {
                    if (this.gravity >= this.downGravity) {
                        console.log('hit')
                        clearInterval(id2)
                    } else {
                        player.jump.gravity += this.downGravity / 100;
                    }
                }, player.jump.speed) 

                player.jump.gravity = player.jump.downGravity;

            } else if (e.key === "ArrowDown") {
                
                player.buttons.down = true;
                
            }

        }) 
    },

    health: 1,
    xDistance: 0
};

player.events();

// begin animating the player.
let player_animate_loop = setInterval(player_increase_frame, 1000 / player.anim.speed);

// animate the player's frame.
function player_increase_frame() {
    player.anim.frame ++;

    if (player.anim.frame >= player.anim.images[player.anim.currentAnim].length) {
        player.anim.frame = 0;
    }
}

// load the player's frames.
function player_load_images() {
    for (let sourceList in player.anim.sources) {
        let currentSourceList = player.anim.sources[sourceList];

        for (let source in currentSourceList) {
            let currentSource = currentSourceList[source];

            let image = new Image();
            image.src = currentSource;

            player.anim.images[sourceList][source] = image;
        }
    }
};

// get the current animation frame from the player.
function player_get_frame() {
    return player.anim.images[player.anim.currentAnim][player.anim.frame];
}

// draw frame.
function player_draw_frame() {
    let frame = player_get_frame();

    canvas_draw_image(frame, player.pos.x, player.pos.y);
}