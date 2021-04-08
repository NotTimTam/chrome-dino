"use strict";

let canvas = {
    display: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),

    canTick: true,
    paused: false,
    
    init: function () {
        canvas.fix_resolution();
        window.addEventListener("resize", canvas.fix_resolution);

        // The main function that calls every other function inside of it
        window.setInterval(canvas.tick, 16.7); // 16.7 is 60fps
    },

    // canvas dimensions that factor in the screen width.
    fix_resolution: function () {
        // screen_fix_size(); // broken 

        canvas.display.width = screenWidth;
        canvas.display.height = screenHeight;

        // Don't know why i have to do this but it works so whatever
        document.onload = function () {
            player.reset_pos();
        }
        ground.reset_pos();
    },

    // clear the canvas.
    clear: function () {
        canvas.ctx.clearRect(0, 0, screenWidth, screenHeight);
    },

    draw_image: function (image, x, y) {
        canvas.ctx.drawImage(image, x, y);
    },

    tick: function () {
        if (!canvas.paused) {
            player.xDistance += 0.18; // POINT EIGHTEEN POINT EIGHTEEN
            document.getElementById("distance").innerText = Math.round(player.xDistance);

            // lots of really simple but complicated-looking math that handles progress bar movement
            document.getElementById("progress-head").style.marginLeft = Math.round((player.xDistance / levelControler.nextDist) * document.getElementById("progress").offsetWidth - document.getElementById("progress-head").offsetWidth) + 'px'

            if (canvas.canTick) {
                canvas.canTick = false;
                if (player.xDistance >= challenges.nextDist) {
                    let rng = challenges.get_rand();
                    
                    // Makes sure the player doesn't have the same challenge in a row
                    while (rng === challenges.last)
                        rng = challenges.get_rand();
                    
                    challenges.activate(rng);

                    // Updates when the next challenge should happen
                    challenges.nextDist += Math.round(Math.random() * (challenges.types[rng].duration.max - challenges.types[rng].duration.min)) + challenges.types[rng].duration.min;
                }

                let donedid = false;
                if (player.xDistance >= levelControler.nextDist && !donedid) {
                    levelControler.levels[levelControler.currLevel].next_level();
                    donedid = true;
                } 

                canvas.clear();
                
                obstacles.render_back();
                ground.render();
                obstacles.render();
                player.render();

                // player_render_hitbox(); // for debugging. 

                if (levelControler.currLevel === levelControler.levels.length) {
                    levelControler.win();
                }

                canvas.canTick = true;
            }
        } else {
            return;
        }
    }
}
canvas.init();