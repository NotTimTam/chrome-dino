"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// canvas dimensions that factor in the screen width.
function canvas_fix_resolution() {
    screen_fix_size();

    canvas.setAttribute("width", screenWidth);
    canvas.setAttribute("height", screenHeight);

    // reset object positioning on the canvas.
    ground_reset_pos();
    player_reset_pos();
}
canvas_fix_resolution();
window.addEventListener("resize", canvas_fix_resolution);

// clear the canvas.
function canvas_clear() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
}

// load all animation frames.
function canvas_load_frames() {
    player.load_images();
}
canvas_load_frames();

// render an image.
function canvas_draw_image(image, x, y) {
    ctx.drawImage(image, x, y);
}

// tick function.
let canTick = true;
let paused = false;
let nextLevelDist = 500;

function tick() {
    if (!paused) {
        player.xDistance += 0.18; // POINT EIGHTEEN POINT EIGHTEEN
        document.getElementById("distance").innerText = Math.round(player.xDistance);

        // lots of really simple but complicated-looking math
        document.getElementById("progress-head").style.marginLeft = Math.round((player.xDistance / nextLevelDist) * document.getElementById("progress").offsetWidth - document.getElementById("progress-head").offsetWidth) + 'px'

        if (canTick) {
            canTick = false;
            if (player.xDistance >= nextLevelDist) {
                end_game();
                paused = true
            }

            canvas_clear();

            obstacles.render_back();
            ground.render();
            obstacles.render();
            player.render();

            // player_render_hitbox(); // for debugging. 

            canTick = true;
        }
    } else {
        return;
    }
}
window.setInterval(tick, 16.7); // 16.7 is 60fps