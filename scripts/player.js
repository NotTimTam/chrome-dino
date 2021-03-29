"use strict";

// player data.
let player = {
    anim: {
        speed: 10,
        frame: 0,
        currentAnim: "stand",
        stand: [],
        run: [],
        duck: [],
        die: []
    },

    pos: {
        x: 25,
        y: 0
    },

    speed: 0,
    health: 1
};

// initialize the player's position.
function player_reset_pos() {
    player.pos.x = 25;
    player.pos.y = Math.round(screenHeight / 2);
}

// animate the player's frame.
function player_animate_frame() {
    player.anim.frame ++;

    if (player.anim.frame > player.anim[player.anim.currentAnim].length) {
        player.anim.frame = 0;
    }
}

// get the current animation frame from the player.
function player_get_frame() {
    return player.anim[player.anim.currentAnim][player.anim.frame];
}

// draw frame.
function player_draw_frame() {
    let frame = player_get_frame();

    canvas_draw_image(frame, player.pos.x, player.pos.y);
}