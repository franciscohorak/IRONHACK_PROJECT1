class Player {
    constructor(game) {
        this.context = game.context;
        this.width = game.width;
        this.height = game.height;
        this.x = 40;
        this.y = 60;
        this.r = 27;
        this.speedX = 0;
        this.speedY = 0;
        this.velocity = 4;
    }

    draw() {
        if (this.r == 16) {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            this.context.lineWidth = 3;
            let playerIcon = new Image();
            playerIcon.src = "images&icons/Sick Emoji.png"
            this.context.fillStyle = "#66ff33";
            this.context.strokeStyle = 'yellow';
            this.context.stroke();
            this.context.drawImage(playerIcon, this.x - this.r, this.y - this.r)
        }
        if (this.r == 27) {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            this.context.lineWidth = 3;
            let playerIcon = new Image();
            playerIcon.src = "images&icons/Sick Emoji (54).png"
            this.context.fillStyle = "#66ff33";
            this.context.strokeStyle = 'yellow';
            this.context.stroke();
            this.context.drawImage(playerIcon, this.x - this.r, this.y - this.r)
        }
        if (this.r == 30) {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            this.context.lineWidth = 3;
            let playerIcon = new Image();
            playerIcon.src = "images&icons/Sick Emoji (60) - cópia.png"
            this.context.fillStyle = "#66ff33";
            this.context.strokeStyle = 'yellow';
            this.context.stroke();
            this.context.drawImage(playerIcon, this.x - this.r, this.y - this.r)
        }
        if (this.r == 33) {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            this.context.lineWidth = 3;
            let playerIcon = new Image();
            playerIcon.src = "images&icons/Sick Emoji (66) -.png"
            this.context.fillStyle = "#66ff33";
            this.context.strokeStyle = 'yellow';
            this.context.stroke();
            this.context.drawImage(playerIcon, this.x - this.r, this.y - this.r)
        }


    }
    setControls() {
        window.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 39:
                    this.speedX = this.velocity;
                    break;
                case 37:
                    this.speedX = -this.velocity;
                    break;
                case 38:
                    this.speedY = -this.velocity;
                    break;
                case 40:
                    this.speedY = this.velocity;
                    break;
            }
        })
        // QUESTION: How can I make the player move more smoothly?
        window.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 39:
                    this.speedX = 0;
                    break;
                case 37:
                    this.speedX = 0;
                    break;
                case 38:
                    this.speedY = 0;
                    break;
                case 40:
                    this.speedY = 0;
                    break;
            }
        })
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        ////**** To make the player stay within the canvas limits. Fix the function- the player will still leave the canvas if we keep the key pressed.
        if (this.x - this.r - this.context.lineWidth + 1 < 0) {
            this.speedX = 0;
        }
        if (this.x + this.r + this.context.lineWidth >= this.width) {
            this.speedX = 0;
        }
        if (this.y - this.r - this.context.lineWidth + 1 < 0) {
            this.speedY = 0;
        }
        if (this.y + this.r + this.context.lineWidth + 1 > this.height) {
            this.speedY = 0;
        }
    }
}