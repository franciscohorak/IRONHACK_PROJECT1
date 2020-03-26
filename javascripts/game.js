class Game {
    constructor(canvas) {
        this.context = canvas.getContext("2d");
        this.width = canvas.width
        this.height = canvas.height
        this.player = new Player(this)
        this.reward = new rewards(this)
        this.player.setControls();
        this.obstacles = [];
        this.ballsInPlay = 1;
        this.itemsAvailable = []
        this.animationId;
        this.frame = 0;
        this.starsLeft = 2;
        this.currentLevel = 2;
        this.gameOn = true;
        this.extraLives = 1;
    }
    start() {
        this.animation();

    }
    draw() {
        this.context.clearRect(0, 0, this.width, this.height)
        this.player.draw();
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
            //setTimeout(this.startMovement, 1000, this.obstacles) ******
            this.obstacles[i].update(this.obstacles);
        }
        for (let i = 0; i < this.itemsAvailable.length; i++) {
            this.itemsAvailable[i].draw();
            this.itemsAvailable[i].update(this.itemsAvailable);
            if (this.itemsAvailable.length > 3)
                this.itemsAvailable.shift();
        }

    }
    //******* */ Try to figure out a way to first draw the ball in the canvas and only 2 seconds after it starts moving.
    // startMovement() {
    //     for (let j = 0; j < this.obstacles.length; j++) {
    //         this.obstacles[i].update(this.obstacles);
    //     }
    // }

    launchBall() {
        for (let i = 0; this.obstacles.length < this.ballsInPlay; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            let r = Math.random() * 40
            if (i !== 0) {
                for (let j = 0; j < this.obstacles.length; j++) {
                    if (this.getDistance(this.x, this.y, this.obstacles[j].x, this.obstacles[j].y) - this.r * 2 < 0) { // so that when launching a new ball into the game, it doesn't appear in the same x and y position of a ball already in the canvas
                        x = Math.random() * this.width;
                        y = Math.random() * this.height;
                        j = -1;
                    }
                }
            }
            this.obstacles.push(new Obstacles(this, x, y, r));
        }
    }

    launchItem() {
        this.itemsAvailable.push(new Perks(this))
    }

    update() {
        this.frame++;
        this.player.update();
        this.reward.update();
        if (this.frame % 100 == 0) {
            this.launchBall();
        }
        if (this.frame % 600 == 0) {
            this.ballsInPlay++
            this.launchItem()
        }
        if (this.frame % 800 == 0) {
            this.ballsInPlay++
        }

        this.checkForItem();
        this.checkPlayerCrash();
    }

    getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;
        let yDistance = y2 - y1
        return Math.sqrt((Math.pow(xDistance, 2) + Math.pow(yDistance, 2)))
    }
    checkForItem() {
        for (let i = 0; i < this.itemsAvailable.length; i++) {
            if (this.getDistance(this.player.x, this.player.y, this.itemsAvailable[i].x, this.itemsAvailable[i].y) - this.player.r * 2 < 0) {
                if (this.itemsAvailable[i].type.name == "Speed") {
                    console.log(this.itemsAvailable[i].type.value)
                    this.itemsAvailable.splice(i);
                    this.player.velocity += 1
                    console.log('You have extra speed')
                    break;
                }
                if (this.itemsAvailable[i].type.name == "Extra Life") {
                    this.itemsAvailable.splice(i);
                    console.log(this.extraLives)
                    this.extraLives += 1 //this.itemsAvailable[i].type.value;
                    console.log(this.extraLives)
                    break;
                }
                if (this.itemsAvailable[i].type.name == "Ballcut") {
                    console.log('Less balls in the game');
                    this.itemsAvailable.splice(i);
                    this.obstacles.shift();
                    break;
                }
                if (this.itemsAvailable[i].type.name == "ExtraBall") {
                    console.log('Ups. Another ball was just added');
                    this.itemsAvailable.splice(i);
                    this.ballsInPlay += 1 //this.itemsAvailable[i].type.value;
                    break;
                }
                if (this.itemsAvailable[i].type.name == "Food") {
                    console.log('Ups. Carefull!');
                    this.itemsAvailable.splice(i);
                    this.player.r += 8; //this.itemsAvailable[i].type.value;
                    break;
                }
                if (this.itemsAvailable[i].type.name == "Star") {
                    console.log(`Congrats! ${this.starsLeft} to move to the next level`);
                    this.itemsAvailable.splice(i);
                    this.starsLeft--;
                    console.log(`Congrats! ${this.starsLeft} to move to the next level`);
                    break;
                }
            }
        }
    }

    checkPlayerCrash() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.getDistance(this.player.x, this.player.y, this.obstacles[i].x, this.obstacles[i].y) - this.player.r * 2 < 0) {
                this.extraLives--
                if (this.extraLives > 0) {
                    console.log(`You have ${this.extraLives} remaining`)
                    break;
                }
                if (this.extraLives == 0) {
                    this.gameOver();
                }
            }
        }
    }

    nextLevel() {
        this.gameOn = true;
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.fillRect(0, 0, this.width, 40)
        this.context.fillStyle = "green";
    }

    gameOver() {
        this.gameOn = false
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.fillRect(0, 0, this.width, this.height)
        this.context.fillStyle = "grey";
        console.log('You Lost')
    }

    animation() {
        console.log(this.currentLevel)
        this.draw()
        this.update()
        this.animationId = window.requestAnimationFrame(() => {
            if (this.gameOn) {
                this.animation();
            }
            if (this.starsLeft == 0) {
                this.nextLevel();
                console.log(this.currentLevel)
                this.currentLevel++;
                console.log(this.currentLevel)
                this.reset()
            }
        })

    }
    reset() {
        this.player.setControls();
        this.frame = 0;
        this.gameOn = true;
        this.starsLeft = 2;
    }
}