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

        ground.step1.x = Math.round(ground.step1.x);
        ground.step2.x = Math.round(ground.step2.x);
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
            "../images/cactus_1.png",
            "../images/cactus_2.png",
            "../images/cactus_3.png",
            "../images/cactus_group_1.png",
            "../images/cactus_group_2.png",
        ];

        // create an image for the cactus
        this.sprite = this.sources[Math.floor(Math.random() * this.sources.length)];
        this.image = new Image();
        this.image.src = this.sprite;

        let self = this;

        this.image.onload = function () {
            self.width = self.image.width;
            self.height = self.image.height;

            self.x = screenWidth;
            self.y = Math.round((screenHeight - self.height) - 5);
            self.speed = ground.speed;

            self.hitbox = [];

            self.calculate_hitbox();

            obstacles.objects.push(self);
        }
    }

    tick() {
        this.x -= ground.speed;

        this.x = Math.round(this.x);

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
            case "../images/cactus_1.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case "../images/cactus_2.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case "../images/cactus_3.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case "../images/cactus_group_1.png":
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 0,
                    width: width - 10,
                    height: height
                });
                break;
            case "../images/cactus_group_2.png":
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

// pterodactyl.
class Ptero {
    constructor(x, y) {
        this.width = 0,
        this.height = 0,
        this.x = screenWidth,
        this.y = Math.round((screenHeight - this.height) - 50),

        this.speed = 2;
        this.hitbox = [];

        this.anim = {
            speed: 10,
            frame: 0,
            currentAnim: "fly",
            sources: {
                fly: [
                    "../images/pt_1.png",
                    "../images/pt_2.png"
                ]
            },
            images: { fly: [] }
        };

        obstacles.objects.push(this);
        this.load_images();

        
        this.animate = setInterval(this.increase_frame.bind(this), 1000 / this.speed);
    }

    increase_frame () {
        this.anim.frame++;
        if (this.anim.frame >= this.anim.images[this.anim.currentAnim].length) {
            this.anim.frame = 0;
        }
    }

    get_frame() {
        return this.anim.images[this.anim.currentAnim][this.anim.frame];
    }

    update() {
        for (let i = 0; i < this.speed; i += this.speed / 16) {
            this.x -= this.speed / 16;
        }
    }

    tick() {
        this.x -= ground.speed / this.speed;

        this.x = Math.round(this.x);

        if (this.x + this.width < 0) {
            obstacles.objects.splice(obstacles.objects.indexOf(this), 1);
        }
    }

    load_images () {
        for (let sourceList in this.anim.sources) {
            let currentSourceList = this.anim.sources[sourceList];

            for (let source in currentSourceList) {
                let currentSource = currentSourceList[source];

                let image = new Image();
                image.src = currentSource;

                this.anim.images[sourceList].push(image)
            }
        }
        this.calculate_hitbox();
    }

    calculate_hitbox() {
        let width = this.anim.images[this.anim.currentAnim][this.anim.frame].width;
        let height = this.anim.images[this.anim.currentAnim][this.anim.frame].height;

        this.width = width;
        this.height = height;

        this.hitbox = [];

        this.hitbox.push({
            offsetX: 10,
            offsetY: 10,
            width: width - 20,
            height: height - 20
        })
    }

    render() {
        let frame = this.get_frame();
        canvas_draw_image(this.anim.images[this.anim.currentAnim][this.anim.frame], this.x, this.y);
        object_render_hitbox(this)
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

// end the game.
function end_game() {
    player.anim.currentAnim = "dead";

    window.setTimeout(function () {
        for (var i = 0; i < 999; i++) {
            window.clearInterval(i);
        }
    }, 50);
}

window.setInterval(ground.tick, 1);
window.setInterval(obstacles.tick, 1);

function spawnBaddy() {
    let random = Math.ceil(Math.random() * 2);

    if (random == 1) {
        let cacti = new Cactus();
    } else {
        if (player.xDistance >= 100) {
            let ptero = new Ptero();
        } else {
            let cacti = new Cactus();
        }
    }

    window.setTimeout(spawnBaddy, (Math.random() * (1.5 - 0.95) + 0.95).toFixed(4) * 1000);
}
window.setTimeout(spawnBaddy, 2000);