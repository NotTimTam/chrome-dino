"use strict";

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
    },

    tick: () => {
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
    },

    render: () => {
        canvas_draw_image(ground.image, ground.step1.x, ground.step1.y);
    canvas_draw_image(ground.image, ground.step2.x, ground.step2.y);
    }
};
ground.load_image('../images/ground_1.png');

function ground_reset_pos(offset = 28) {
    ground.step1.y = Math.round(screenHeight - 16);
    ground.step2.y = Math.round(screenHeight - 16);
}

// obstacles.
let obstacles = {
    objects: [],

    tick: () => {
        for (let objectID in obstacles.objects) {
            let object = obstacles.objects[objectID];
            object.tick();
        }
    },

    render: () => {
        for (let objectID in obstacles.objects) {
            let object = obstacles.objects[objectID];
            object.render();
        }
    }
};

// cactus.
class Cactus {
    constructor() {
        this.x = screenWidth;
        this.y = 0;
        this.width = 0;
        this.height = 0;
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

        this.width = this.image.width;
        this.height = this.image.height;

        this.y = Math.round((screenHeight - this.height) - 5);

        this.hitbox = [];

        obstacles.objects.push(this);
    }

    tick() {
        this.x -= ground.speed;

        if (this.x + this.width < 0) {
            obstacles.objects.splice(obstacles.objects.indexOf(this), 1);
        }
    }

    render() {
        canvas_draw_image(this.image, this.x, this.y);
        object_render_hitbox(this);
    }

    calculate_hitbox() {        
        let width = this.image.width;
        let height = this.image.height;

        switch (this.sprite) {
            case "/images/cactus_1.png":
                this.hitbox.push({
                    offsetX: 0,
                    offsetY: 0,
                    width: width,
                    height: height
                });
                break;
            case "/images/cactus_2.png":
                this.hitbox.push({
                    offsetX: 0,
                    offsetY: 0,
                    width: width,
                    height: height
                });
                break;
            case "/images/cactus_3.png":
                this.hitbox.push({
                    offsetX: 0,
                    offsetY: 0,
                    width: width,
                    height: height
                });
                break;
            case "/images/cactus_group_1.png":
                this.hitbox.push({
                    offsetX: 0,
                    offsetY: 0,
                    width: width,
                    height: height
                });
                break;
            case "/images/cactus_group_2.png":
                this.hitbox.push({
                    offsetX: 0,
                    offsetY: 0,
                    width: width,
                    height: height
                });
                break;
        }

    }
}
window.setInterval(function () {
    let cacti_s = new Cactus();
}, 2000);

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

function object_render_hitbox(object) {
    for (let key in object.hitbox) {
        let box = object.hitbox[key];
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.rect(object.pos.x + box.offsetX, object.pos.y + box.offsetY, box.width, box.height);
        ctx.stroke();
    }
}



window.setInterval(ground.tick, 16.7);
window.setInterval(obstacles.tick, 16.7);