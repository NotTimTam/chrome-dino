"use strict";

// player data.
let player = {
    health: 1,
    xDistance: 0,

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
        images: { stand: [], run: [], duck: [], die: [] }
    },

    pos: {
        width: 44,
        height: 47,
        x: 10,
        y: Math.round(screenHeight - 47 - 5),
    },

    hitbox: [ 
        {
            offsetX: 14,
            offsetY: 0, 
            width: 44 / 2.5, 
            height: 47 
        }, 
        { 
            offsetX: 14,
            offsetY: 0,
            width: 44 / 1.5, 
            height: 47 / 2.5 
        } 
        ],

    // load all the frame images for the player.
    load_images: () => {
            for (let sourceList in player.anim.sources) {
            let currentSourceList = player.anim.sources[sourceList];

            for (let source in currentSourceList) {
                let currentSource = currentSourceList[source];

                let image = new Image();
                image.src = currentSource;

                player.anim.images[sourceList][source] = image;
            }
        }

        player.calculate_hitbox();
    },

    // handles inputs and movement.
    events: () => {
        window.addEventListener( "keydown", ( e ) => {
            // If the plyer is not jumping and the key being pressed is space or the up arrow
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

                player.pos.height = 30;
                player.pos.y = Math.round(screenHeight - player.pos.height - 5);
                player.buttons.down = true;
                
            } else {}
        } )

        window.addEventListener("keyup", () => {
            player.buttons.down = false;
            if (!player.jump.active) {
                player.pos.height = 47;
                player.pos.y = Math.round(screenHeight - player.pos.height - 5);
            }
        })
    },

    // get the current frame.
    get_frame: () => {
        return player.anim.images[player.anim.currentAnim][player.anim.frame];
    },

    // move to the next frame.
    increase_frame: () => {
        player.anim.frame ++;

        if (player.anim.frame >= player.anim.images[player.anim.currentAnim].length) {
            player.anim.frame = 0;
        }
    },

    // runs every frame.
    render: () => {
        player.set_animation();

        let frame = player.get_frame();

        canvas_draw_image(frame, player.pos.x, player.pos.y)
    },

    // set the player's animation based on the current action.
    set_animation: () => {
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
            player.calculate_hitbox();
        }
    },

    // generate a hitbox for the player based on the frame/image of the current animation.
    calculate_hitbox: () => {
        let width = player.anim.images[player.anim.currentAnim][player.anim.frame].width;
        let height = player.anim.images[player.anim.currentAnim][player.anim.frame].height;

        player.pos.width = width;
        player.pos.height = height;

        player.hitbox = [];

        if (player.anim.currentAnim == "duck") {
            player.hitbox.push({
                offsetX: 5,
                offsetY: 5,
                width: width - 10,
                height: height - 10
            });
        } else {
            player.hitbox.push({
                offsetX: 14,
                offsetY: 0,
                width: width / 2.5,
                height: height
            }, {
                offsetX: 14,
                offsetY: 0,
                width: width / 1.5,
                height: height / 2.5
            });
        }
    }
};

// now THIS RIGHT HERE is the jankiest, buggiest, most ridiculously processor-intensive jerry-rig I ever did see.
window.setTimeout(() => { player.jump.active = true; }, 100);
window.setTimeout(() => { player.jump.active = false; }, 250);

player.events();

// begin animating the player.
let player_animate_loop = setInterval(player.increase_frame, 1000 / player.anim.speed);

// render the player's hitbox. (debugging only)
function player_render_hitbox() {
    for (let key in player.hitbox) {
        let box = player.hitbox[key];
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.rect(player.pos.x + box.offsetX, player.pos.y + box.offsetY, box.width, box.height);
        ctx.stroke();
    }
}