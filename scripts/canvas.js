"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// screen dimensions that factor the device pixel ratio.
let screenWidth;
let screenHeight;
function screen_fix_width() {
    screenWidth = (window.devicePixelRatio * canvas.clientWidth) / 4;
    screenHeight = (window.devicePixelRatio * canvas.clientHeight) / 4;
}

// canvas dimensions that factor in the screen width.
function canvas_fix_resolution() {
    screen_fix_width();

    canvas.setAttribute("width", screenWidth);
    canvas.setAttribute("height", screenHeight);

    // reset object positioning on the canvas.
    player_reset_pos();
    ground_reset_pos();
}
canvas_fix_resolution();
window.addEventListener("resize", canvas_fix_resolution);

// clear the canvas.
function canvas_clear() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
}

// load all animation frames.
function canvas_load_frames() {
    player_load_frames();
}
canvas_load_frames();

// render an image.
function canvas_draw_image(image, x, y) {
    ctx.drawImage(image, x, y);
}

// tick function.
let canTick = true;
let paused = false;
function tick() {
    if (!paused) {
        if (canTick) {
            canTick = false;

            canvas_clear();
            ground_draw_frame();
            player_draw_frame();


            canTick = true;
        }
    } else {
        return;
    }
}
window.setInterval(tick, 33.3); // 16.7 is 60fps

