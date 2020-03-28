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
        this.seconds = 0;
        // this.currentLevel = 2;
        this.gameOn = true;
        this.sound = new Audio();
        this.sound.src = "audio/GAMEOVER.mp3"
        this.extraLives = 1;
        this.particlesSizes = [8, 12, 16, 16, 16, 32, 32]
    }

    instructions() {
        this.context.save();
        this.context.font = "20px Monoton";
        this.context.fillText(`SURVIVE THE OUTBREAK!`, 190, 40);
        this.context.fillText(`Don't get infected by the virus!`, 150, 80);
        this.context.restore()
        this.context.font = "20px Montserrat";
        this.context.fillText(`Use the ARROW keys to move the player`, 80, 120);
        this.context.fillText(`Watch out for the items:`, 80, 170)
        let keyboardArrows = new Image();
        keyboardArrows.src = "images&icons/hiclipart.com.png"
        keyboardArrows.onload = () => this.context.drawImage(keyboardArrows, 500, 110)
        let speedIcon = new Image();
        speedIcon.src = "images&icons/energia.png"
        speedIcon.onload = () => this.context.drawImage(speedIcon, 40, 200);
        this.context.save()
        this.context.fillStyle = "#FFE527"
        this.context.fillText(`Catch the lightening for extra speed`, 80, 220)
        this.context.restore();
        let vaccineIcon = new Image();
        vaccineIcon.src = "images&icons/vaccine.png"
        vaccineIcon.onload = () => this.context.drawImage(vaccineIcon, 40, 250)
        this.context.save()
        this.context.fillStyle = "#4B6675"
        this.context.fillText(`The vacine will get rid of all particles. Just for a few seconds`, 80, 270)
        this.context.restore();
        let extraParticleIcon = new Image();
        extraParticleIcon.src = "images&icons/attention.png";
        extraParticleIcon.onload = () => this.context.drawImage(extraParticleIcon, 40, 300);
        this.context.save()
        this.context.fillStyle = "#B7305D"
        this.context.fillText(`Carefull! This mutates the virus and will add more particles`, 80, 320)
        this.context.restore();
        let coughIcon = new Image();
        coughIcon.src = "images&icons/cough.png";
        coughIcon.onload = () => this.context.drawImage(coughIcon, 40, 350);
        this.context.save()
        this.context.fillStyle = "#FFC69F"
        this.context.fillText(`Watch-out for people coughing.`, 80, 370)
        this.context.restore();
        let sanitizerIcon = new Image();
        sanitizerIcon.src = "images&icons/antibacterial-gel.png";
        sanitizerIcon.onload = () => this.context.drawImage(sanitizerIcon, 40, 400);
        this.context.save()
        this.context.fillStyle = "#00B1FF"
        this.context.fillText(`The sanitizer will help you kill one particle `, 80, 420)
        this.context.restore()
        this.context.fillText(`Press the SPACEBAR to start`, 190, 480)

    }
    start() {
        this.animation();
        document.getElementById('backgroundMusic').play();
        this.sound.pause();
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

    launchBall() {
        for (let i = 0; this.obstacles.length < this.ballsInPlay; i++) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height)
            let r = this.particlesSizes[Math.floor(Math.random() * this.particlesSizes.length)]
            if (i !== 0) {
                for (let j = 0; j < this.obstacles.length; j++) {
                    if (this.getDistance(this.x, this.y, this.obstacles[j].x, this.obstacles[j].y) - this.r * 2 < 0) { // so that when launching a new ball into the game, it doesn't appear in the same x and y position of a ball already in the canvas
                        x = Math.floor(Math.random() * this.width);
                        y = Math.floor(Math.random() * this.height);
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
        if (this.frame % 500 == 0) {
            this.ballsInPlay++
            this.launchItem()
        }
        if (this.frame % 700 == 0) {
            this.ballsInPlay++;
            this.launchItem();
        }
        if (this.frame % 800 == 0) {
            this.ballsInPlay++
        }
        this.timeCount();
        this.checkForItem();
        this.checkPlayerCrash();
        if (!this.gameOn) document.getElementById('backgroundMusic').pause()
    }
    timeCount() {
        this.seconds += 1
        this.counter = document.getElementsByClassName("time-count")[0];
        this.counter.innerHTML = Math.round(this.seconds / 100)
    }

    getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;
        let yDistance = y2 - y1;
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
                if (this.itemsAvailable[i].type.name == "cough") {
                    console.log('Ups. Carefull!');
                    this.itemsAvailable.splice(i);
                    if (this.player.r == 66) {
                        this.player.r += 1;
                    } else {
                        this.player.r = this.player.r; //this.itemsAvailable[i].type.value;
                    }
                    break;
                }
                if (this.itemsAvailable[i].type.name == "clear") {
                    console.log('Ups. Carefull!');
                    this.itemsAvailable.splice(i);
                    this.ballsInPlay = 0;
                    this.obstacles = []; //this.itemsAvailable[i].type.value;
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


    gameOver() {
        this.context.save()
        this.sound.play();
        this.gameOn = false
        let gameOverIcon = new Image();
        gameOverIcon.src = "images&icons/Face With Thermometer Emoji (80).png"
        gameOverIcon.onload = () => this.context.drawImage(gameOverIcon, 300, this.height / 12)
        this.context.fillStyle = "white" //"#99F5D2"
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.fillRect(0, 0, this.width, this.height)
        this.context.save();
        this.context.fillStyle = "black"
        this.context.font = "30px Monoton"
        this.context.fillText(`You got Infected!`, this.width / 3.5, this.height / 3);
        this.context.save()
        this.context.font = "22px Montserrat"
        this.context.fillText(`You lasted ${Math.round(this.seconds/100)} seconds!`, 240, this.height / 2)
        this.context.fillStyle = "#FF2261"
        this.context.fillText(`Press the SPACEBAR to play again`, 190, this.height / 1.35);
        this.context.save();
        let spaceBarIcon = new Image();
        spaceBarIcon.src = "images&icons/space-bar-png-6.png"
        spaceBarIcon.onload = () => this.context.drawImage(spaceBarIcon, 100, this.height / 1.5);
        console.log('You Lost')
        document.getElementById('backgroundMusic').pause()
    }

    animation() {
        this.draw()
        this.update()
        this.animationId = window.requestAnimationFrame(() => {
            if (this.gameOn) {
                this.animation();
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