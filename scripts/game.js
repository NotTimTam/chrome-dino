"use strict";

// pterodactyl.
class Ptero {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;

        this.anim = {
            speed: 10,
            frame: 0,
            currentAnim: "fly",
            fly: [
                "/images/pt_1.png", 
                "/images/pt_2.png"
            ]
        };

        this.animate = setInterval(this.frame, 1000 / this.speed);
    }

    frame() {
        this.anim.frame ++;
        if (this.anim.frame > 1) {
            this.anim.frame = 0;
        }
    }

    get_frame() {
        return this.anim[currentAnim][this.anim.frame];
    }

    update() {
        this.x -= this.speed;
    }
}

// Ground
let ground =  {
    speed: 5,
    image: undefined,

    step1: {
        x: 0,
        y: 0,
    },

    step2: {
        x: 1200,
        y: 0,
    },

    load_image: (src) => {
        let image = new Image();
        image.src = src;

        ground.image = image;
    }
};
ground.load_image('../images/ground_1.png');

function ground_update_frame() {
    ground.step1.x -= ground.speed;
    ground.step2.x -= ground.speed;

    if (ground.step1.x + 1200 <= 0) {
        ground.step1.x = screenWidth;
    }

    if (ground.step2.x + 1200 <= 0) {
        ground.step2.x = screenWidth;
    }

    ground.step1.x = Math.round(ground.step1.x);
    ground.step2.x = Math.round(ground.step2.x);
}

function ground_draw_frame() {
    ground_update_frame();

    canvas_draw_image(ground.image, ground.step1.x, ground.step1.y);
    canvas_draw_image(ground.image, ground.step2.x, ground.step2.y);
}

function ground_reset_pos(offset = 28) {
    ground.step1.y = Math.round(screenHeight - 16);
    ground.step2.y = Math.round(screenHeight - 16);
}