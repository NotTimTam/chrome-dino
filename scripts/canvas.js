"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// screen dimensions that factor the device pixel ratio.
let screenWidth = window.devicePixelRatio * canvas.clientWidth;
let screenHeight = window.devicePixelRatio * canvas.clientHeight;
function screen_fix_width() {
    screenWidth = window.devicePixelRatio * canvas.clientWidth;
    screenHeight = window.devicePixelRatio * canvas.clientHeight;
}
player_reset_pos();

// canvas dimensions that factor in the screen width.
function canvas_fix_resolution() {
    screen_fix_width();

    canvas.setAttribute("width", screenWidth);
    canvas.setAttribute("height", screenHeight);
}
canvas_fix_resolution();
window.addEventListener("resize", canvas_fix_resolution);

// clear the canvas.
function canvas_clear() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
}

// render an image.
function canvas_draw_image(src, x, y) {
    var image = new Image();

    image.onload = function()
    {
        ctx.drawImage(image, x, y);
    }

    image.src = src;
}

// tick function.
let canTick = true;
let paused = false;
function tick() {
    if (!paused) {
        if (canTick) {
            canTick = false;

            canvas_clear();
            player_draw_frame();


            canTick = true;
        }
    } else {
        return;
    }
}
window.setInterval(tick, 16.7);

