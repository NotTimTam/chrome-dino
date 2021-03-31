"use strict";
// (╯°□°)╯︵ ┻━┻
// player data.
let player = {

    jump: {
        speed: 1,
        gravity: 200,
        initialGravity: -250,
        downGravity: -275,
        height: -250,
        interval: 0.01,
        active: false
    },

    buttons: {
        up: false,
        down: false
    },

    anim: {
        speed: 12,
        frame: 0,
        currentAnim: "stand",
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
        width: 44,
        height: 47,
        x: 10,
        y: Math.round(screenHeight - 47 - 5),
    },

    hitbox: [
        {
            width: 44 / 1.5,
            height: 47
        }, {
            width: 44,
            height: 47 / 2.5
        }
    ],

    events: function () {
        window.addEventListener( "keydown", ( e ) => {
            if ( !player.jump.active && ( e.key === " " || e.key === "ArrowUp" ) ) {
                let x = 0;
                player.buttons.up = true;
                player.jump.active = true;
                let id = setInterval( () => {
                    if ( player.pos.y > Math.round( screenHeight - player.pos.height - 5) ) {
                        player.pos.y = Math.round( screenHeight - player.pos.height - 5);
                        player.jump.active = false;
                        player.jump.height = player.jump.initialGravity;
                        clearInterval( id );
                    } else {
                        player.pos.y = Math.round( player.jump.gravity * x ** 2 + player.jump.height * x + Math.round( screenHeight - player.pos.height - 5) );
                        x += player.jump.interval;
                    }
                }, player.jump.speed )
            } else if ( player.jump.active && e.key === "ArrowDown" ) {
                let id2 = setInterval( () => {
                    if ( player.pos.y >= Math.round( screenHeight - player.pos.height - 5) ) {
                        clearInterval( id2 )
                    } else {
                        player.jump.height -= player.jump.downGravity / 100;
                    }
                }, player.jump.speed )
            } else if ( e.key === "ArrowDown" ) {
                player.buttons.down = true;
                player.pos.width = 5
                player.pos.height = 17
            }
        } )

        window.addEventListener("keyup", () => {
            player.buttons.down = false;
        })
    },

    health: 1,
    xDistance: 0
};

// now this right here is a jerry-rig if I ever did see one.
window.setTimeout(() => { player.jump.active = true; }, 100);
window.setTimeout(() => { player.jump.active = false; }, 250);

player.events();

// begin animating the player.
let player_animate_loop = setInterval(player_increase_frame, 1000 / player.anim.speed);

// change the player's animation.
function player_set_animation() {
    let tempAnim = "null";

    if (player.jump.active || (ground.speed == 0 && !player.buttons.down)) {
        tempAnim = "stand";
    } else if (!player.jump.active && !player.buttons.down) {
        tempAnim = "run";
    } else if (!player.jump.active && player.buttons.down) {
        tempAnim = "duck";
    } else {
        tempAnim = "stand";
    }

    if (tempAnim != player.anim.currentAnim) {
        player.anim.currentAnim = tempAnim;
        player.anim.frame = 0;
        player_calculate_hitbox();
    }
}

// calculate the player's hitbox.
function player_calculate_hitbox() {
    let width = player.anim.images[player.anim.currentAnim][player.anim.frame].width;
    let height = player.anim.images[player.anim.currentAnim][player.anim.frame].height;

    player.pos.width = width;
    player.pos.height = height;

    player.hitbox = [];

    if (player.anim.currentAnim == "duck") {
        player.hitbox.push({
            width: width,
            height: height
        });
    } else {
        player.hitbox.push({
            width: width / 1.5,
            height: height
        }, {
            width: width,
            height: height / 2.5
        });
    }

}

// render the player's hitbox.
function player_render_hitbox() {
    for (let key in player.hitbox) {
        let box = player.hitbox[key];
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.rect(player.pos.x, player.pos.y, box.width, box.height);
        ctx.stroke();
    }
}

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

    player_calculate_hitbox();
};

// get the current animation frame from the player.
function player_get_frame() {
    return player.anim.images[player.anim.currentAnim][player.anim.frame];
}

// draw frame.
function player_tick() {
    player_set_animation();

    let frame = player_get_frame();

    canvas_draw_image(frame, player.pos.x, player.pos.y);
}