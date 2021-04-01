"use strict";

// Ground
let ground = {
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
    },

    tick: () => {
        for (let i = 0; i <= ground.speed; i += ground.speed / 100) {
            ground.step1.x -= ground.speed / 100;
            ground.step2.x -= ground.speed / 100;
        }

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

            object_render_hitbox(object);
        }
    }
};

// cactus.
class Cactus {
    constructor() {
        this.width;
        this.height;

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

        let self = this;

        this.image.onload = function () {
            self.width = self.image.width;
            self.height = self.image.height;

            console.log([self.image.width, self.image.height]);

            self.x = screenWidth;
            self.y = Math.round((screenHeight - self.height) - 5);
            self.speed = ground.speed;

            self.hitbox = [];

            self.calculate_hitbox();

            obstacles.objects.push(self);
        }
    }

    tick() {
        for (let i = 0; i <= ground.speed; i += ground.speed / 16) {
            this.x -= ground.speed / 16;
        }

        if (this.x + this.width < 0) {
            obstacles.objects.splice(obstacles.objects.indexOf(this), 1);
        }
    }

    render() {
        canvas_draw_image(this.image, this.x, this.y);
    }

    calculate_hitbox() {        
        let width = this.image.width;
        let height = this.image.height;

        this.width = width;
        this.height = height;

        switch (this.sprite) {
            case "/images/cactus_1.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case "/images/cactus_2.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case "/images/cactus_3.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case "/images/cactus_group_1.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 0,
                    width: width - 10,
                    height: height
                });
                break;
            case "/images/cactus_group_2.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 0,
                    width: width - 10,
                    height: height
                });
                break;
            default: break;
        }

    }
}
window.setInterval(function () {
    let cacti = new Cactus();
}, 1500);

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
        ctx.rect(object.x + box.offsetX, object.y + box.offsetY, box.width, box.height);
        ctx.stroke();
    }
}



window.setInterval(ground.tick, 16.7);
window.setInterval(obstacles.tick, 16.7);