"use strict";

let canvas = {
    display: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),

    canTick: true,
    paused: false,

    skinDist: 250, // might relocate to player object
    nextLevelDist: 150, // might relocate to player object
    nextSkinLevel: playerStorage.pls.unlockedSkins.length * 250, // might relocate to player object
    
    init: function () {
        canvas.fix_resolution();
        window.addEventListener("resize", canvas.fix_resolution);

        canvas.load_frames();

        window.setInterval(canvas.tick, 16.7); // 16.7 is 60fps
    },

    // canvas dimensions that factor in the screen width.
    fix_resolution: function () {
        // I'm guessing this is a reminat, I'm not going to delete it, just in case
        // canvas.screen_fix_size();

        canvas.display.width = screenWidth;
        canvas.display.height = screenHeight;

        ground.reset_pos();
        player.reset_pos();
    },

    // clear the canvas.
    clear: function () {
        canvas.ctx.clearRect(0, 0, screenWidth, screenHeight);
    },

    // load all animation frames.
    load_frames: function () {
        player.load_images();
    },

    draw_image: function (image, x, y) {
        canvas.ctx.drawImage(image, x, y);
    },

    tick: function () {
        if (!canvas.paused) {
            player.xDistance += 0.18; // POINT EIGHTEEN POINT EIGHTEEN
            document.getElementById("distance").innerText = Math.round(player.xDistance);

            // lots of really simple but complicated-looking math that handles progress bar movement
            document.getElementById("progress-head").style.marginLeft = Math.round((player.xDistance / canvas.nextSkinLevel) * document.getElementById("progress").offsetWidth - document.getElementById("progress-head").offsetWidth) + 'px'

            if (canvas.canTick) {
                canvas.canTick = false;
                if (player.xDistance >= canvas.nextLevelDist) {
                    let rng = challenges.get_rand();
                    // Makes sure the player doesn't have the same level in a row
                    console.log(rng, challenges.last)
                    while (rng === challenges.last) {
                        rng = challenges.get_rand();
                    }
                    challenges.activate(rng);

                    // ----------------------------------------- FIGURE OUT WHAT TO DO WITH THIS ----------------------------------------- // 
                    canvas.nextLevelDist += Math.round(Math.random() * (challenges.types[rng].duration.max - challenges.types[rng].duration.min)) + challenges.types[rng].duration.min;
                }

                if (player.xDistance >= canvas.nextSkinLevel) {
                    let available = playerStorage.skins_fn.get_rand_locked();
                    playerStorage.skins_fn.unlock(available);

                    display.announce(`LEVEL ${player.level}\n${available} skin unlocked!`);

                    canvas.nextSkinLevel += canvas.skinDist;
                    player.level ++;
                }

                canvas.clear();

                obstacles.render_back();
                ground.render();
                obstacles.render();
                player.render();

                // player_render_hitbox(); // for debugging. 

                // the NUMBER is how many levels there are.
                if (player.level >= 3) {
                    win_game();
                }

                canvas.canTick = true;
            }
        } else {
            return;
        }
    }
}
canvas.init();