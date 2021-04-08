"use strict";

window.setInterval(ground.tick, 1);
window.setInterval(obstacles.tick_back, 1);
window.setInterval(obstacles.tick, 1);

// gets rid of first ptero not having a hitbox, temp fix
let endme = new Ptero();
obstacles.objects.splice(obstacles.objects.indexOf(endme), 1);

let lastBaddy = "none";
function spawnBaddy() {
    let random = Math.ceil(Math.random() * 5);

    if (random != 1) {
        let cacti = new Cactus();
        lastBaddy = "cactus";
    } else {
        if (player.xDistance >= 100) {
            let height = Ptero.get_rand_height();
            let ptero = new Ptero(height);
            lastBaddy = "ptero";
        } else {
            let cacti = new Cactus();
            lastBaddy = "cactus";
        }
    }

    if (lastBaddy == "cactus") {
        window.setTimeout(spawnBaddy, (Math.random() * (1.5 - 0.95) + 0.95).toFixed(4) * 1000);
    } else {
        window.setTimeout(spawnBaddy, (Math.random() * (3 - 2) + 2).toFixed(4) * 1000);
    }
}
window.setTimeout(spawnBaddy, 2000);

function spawnBackgroundElem() {
    let cloud = new Cloud();

    window.setTimeout(spawnBackgroundElem, (Math.random() * (1 - 0.5) + 0.5).toFixed(4) * 1000);
}
spawnBackgroundElem();