class LevelCreator {
    constructor(name, dist, reward) {
        this.name = name;

        this.dist = dist;

        this.reward = reward;
    }

    next_level() {
        display.announce(`${this.name} Complete!`)

        // If there is a reward, then announce it
        if (this.reward) {
            display.announce(`You Unlocked: ${
                this.reward[0].toUpperCase() + this.reward.slice(1, this.reward.length - 1) 
            } Theme`)
        }

        // Give the reward to the player
        playerStorage.skins_fn.unlock(this.reward);

        // Move onto the next level
        levelControler.currLevel++;
        
        levelControler.nextDist = levelControler.levels[levelControler.currLevel].dist;

        playerStorage.highscores_fn.set_score(Math.round(player.xDistance)); 
    }
} 

let levelControler = {
    nextDist: 100,
    currLevel: 0, // starts at zero for indexing
    levels: [
        new LevelCreator("Level 1", 100, null),
        new LevelCreator("Level 2", 275, null),
        new LevelCreator("Level 3", 350, "night"),
        new LevelCreator("Level 4", 500, null),
        new LevelCreator("Level 5", 750, null),
    ],

    win: function () {
        canvas.paused = true;
        playerStorage.highscores_fn.set_score(Math.round(player.xDistance)); 
        document.body.innerHTML = `
            <div class="death">
                <h1>YOU WON</h1>
                <p>Score: ${Math.round(player.xDistance)}</p>
                <a href="index.html"><button>RESTART</button></a>
            </div>
        `
    },

    lose: function () {
        canvas.paused = true;
        playerStorage.highscores_fn.set_score(Math.round(player.xDistance)); 
        document.body.innerHTML = `
            <div class="death">
                <h1>YOU LOST</h1>
                <p>Score: ${Math.round(player.xDistance)}</p>
                <a href="index.html"><button>RESTART</button></a>
            </div>
        `
    }
}