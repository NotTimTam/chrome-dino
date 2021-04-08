"use strict"

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

    init: function () {
        ground.load_image(`/images/${skin}/ground_1_${skin}.png`);
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
        canvas.draw_image(ground.image, ground.step1.x, ground.step1.y);
        canvas.draw_image(ground.image, ground.step2.x, ground.step2.y);
    },

    reset_pos: function (offset = 28) {
        ground.step1.y = Math.round(screenHeight - 16);
        ground.step2.y = Math.round(screenHeight - 16);
    },
};
ground.init();

// obstacles.
let obstacles = {
    objects: [],
    background_elems: [],

    tick: () => {
        // tick foreground elements.
        for (let objectID in obstacles.objects) {
            let object = obstacles.objects[objectID];
            object.tick();
        }
    },

    tick_back: () => {
        // tick background elements.
        for (let objectID in obstacles.background_elems) {
            let object = obstacles.background_elems[objectID];
            object.tick();
        }
    },

    render: () => {
        // render obstacles.
        for (let objectID in obstacles.objects) {
            let object = obstacles.objects[objectID];
            object.render();

            // Used for debugging
            // object_render_hitbox(object);
        }
    },

    render_back: () => {
        // render background elements.
        for (let objectID in obstacles.background_elems) {
            let object = obstacles.background_elems[objectID];
            object.render();
        }
    },
};

// background element.
class Cloud {
    constructor() {
        this.width;
        this.height;
        this.speed = 1;

        // create an image for the cactus
        this.sprite = `/images/${skin}/cloud_1_${skin}.png`;
        this.image = new Image();
        this.image.src = this.sprite;

        let self = this;

        this.image.onload = function () {
            self.width = self.image.width;
            self.height = self.image.height;

            self.x = screenWidth + self.width;
            self.y = Math.round(Math.random() * (screenHeight - self.height - 40));

            obstacles.background_elems.push(self);
        }
    }

    tick() {
        this.x -= this.speed;

        this.x = Math.round(this.x);

        if (this.x + this.width < 0) {
            obstacles.background_elems.splice(obstacles.background_elems.indexOf(this), 1);
        }
    }

    render() {
        canvas.draw_image(this.image, this.x, this.y);
    }
    
}

// cactus.
class Cactus {
    constructor() {
        this.width;
        this.height;

        this.sources = [
            `/images/${skin}/cactus_1_${skin}.png`,
            `/images/${skin}/cactus_2_${skin}.png`,
            `/images/${skin}/cactus_3_${skin}.png`,
            `/images/${skin}/cactus_group_1_${skin}.png`,
            `/images/${skin}/cactus_group_2_${skin}.png`,
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
        canvas.draw_image(this.image, this.x, this.y);
    }

    calculate_hitbox() {
        let width = this.image.width;
        let height = this.image.height;

        this.width = width;
        this.height = height;

        switch (this.sprite) {
            case `/images/${skin}/cactus_1_${skin}.png`:
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case `/images/${skin}/cactus_2_${skin}.png`:
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case `/images/${skin}/cactus_3_${skin}.png`:
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 5,
                    width: width - 10,
                    height: height - 5
                });
                break;
            case `/images/${skin}/cactus_group_1_${skin}.png`:
                this.hitbox.push({
                    offsetX: 5,
                    offsetY: 0,
                    width: width - 10,
                    height: height
                });
                break;
            case `/images/${skin}/cactus_group_2_${skin}.png`:
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
    static get_rand_height() {
        return [Math.round(screenHeight - 50),
        Math.round(screenHeight - 60),
        Math.round(screenHeight - 80)][Math.floor(Math.random() * 3)]
    }

    constructor(y) {
        this.width = 0;
        this.height = 0;
        this.x = screenWidth;
        this.y = y;

        

        this.speed = 2;
        this.hitbox = [];

        this.anim = {
            speed: 10,
            frame: 0,
            currentAnim: "fly",
            sources: {
                fly: [
                    `/images/${skin}/pt_1_${skin}.png`,
                    `/images/${skin}/pt_2_${skin}.png`
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
        this.x -= this.speed;
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
        canvas.draw_image(this.anim.images[this.anim.currentAnim][this.anim.frame], this.x, this.y);
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
