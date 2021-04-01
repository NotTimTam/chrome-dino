"use strict";

// obstacles.
let obstacles = {
    objects: [],

    tick: () => {
        for (let objectID in obstacles.objects) {
            let object = obstacles.objects[objectID];
            object.tick();
        }
    }
};

window.setInterval(function () {
    let cacti = new Cactus(Math.random() * screenWidth, Math.random() * screenHeight);
}, 1000);

// cactus.
class Cactus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = ground.speed;

        this.sources = [
            "/images/cactus_1.png",
            "/images/cactus_2.png",
            "/images/cactus_3.png",
            "/images/cactus_group_1.png",
            "/images/cactus_group_2.png",
        ];

        // create an image for the cactus
        this.sprite = this.sources[Math.floor(Math.random() * this.sources.length)];
        this.image = new Image();
        this.image.src = this.sprite;

        obstacles.objects.push(this);
    }

    tick() {
        canvas_draw_image(this.image, this.x, this.y);
    }
}

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
        this.anim.frame++;
        if (this.anim.frame > 1) {
            this.anim.frame = 0;
        }
    }

    get_frame() {
        return this.anim[currentAnim][this.anim.frame];
    }

    update() {
        for (let i = 0; i < this.speed; i += this.speed / 16) {
            this.x -= this.speed / 16;
        }
    }
}

// Ground
let ground = {
    speed: 2,
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
        ground.step1.x = 1200;
    }

    if (ground.step2.x + 1200 <= 0) {
        ground.step2.x = 1200;
    }

    ground.step1.x = ground.step1.x;
    ground.step2.x = ground.step2.x;
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