class Perks {
    constructor(game, type) {
        this.context = game.context;
        this.CanvasWidth = game.width;
        this.CanvasHeight = game.height;
        this.width = 32;
        this.height = 32;
        this.x = Math.floor(Math.random() * (this.CanvasWidth-this.width));
        this.y = Math.floor(Math.random() * (this.CanvasHeight-this.height));
        this.type = this.perks[Math.floor(Math.random() * this.perks.length)];

    }

    draw() {

        if (this.type == this.perks[0]) {
            this.context.save();
            let speedImg = new Image();
            speedImg.src = "images&icons/energia.png"
            this.context.fillStyle = "transparent"
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.drawImage(speedImg, this.x, this.y)
            this.context.restore();
        }
        if (this.type == this.perks[1]) {
            this.context.save();
            this.context.fillStyle = "transparent"
            let ballCutIcon = new Image();
            ballCutIcon.src = "images&icons/antibacterial-gel.png"
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.drawImage(ballCutIcon, this.x, this.y)
            this.context.restore();
        }
        if (this.type == this.perks[2]) {
            this.context.save();
            let extraBallIcon = new Image()
            extraBallIcon.src = "images&icons/attention.png"
            this.context.fillStyle = "white"
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.drawImage(extraBallIcon, this.x, this.y)
            this.context.restore();
        }
        if (this.type == this.perks[3]) {
            this.context.save();
            let coughIcon = new Image();
            coughIcon.src = "images&icons/cough.png";
            this.context.fillStyle = "transparent";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.drawImage(coughIcon, this.x, this.y)
            this.context.restore();
        } 
        if (this.type == this.perks[4]) {
            this.context.save();
            let vaccineIcon = new Image()
            vaccineIcon.src = "images&icons/vaccine.png"
            this.context.fillStyle = "transparent"
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.drawImage(vaccineIcon, this.x, this.y)
            this.context.restore();
        }


    }
    update() {
        this.x = this.x; // Since the items are static, x and y coordinates stay the same.
        this.y = this.y;
    }


    perks = [{ // Stores all the items that can randomly be placed in the canvas
            //         name: "Extra Life",
            //         duration: 2000, // in miliseconds;
            //         value: 1
            //     }, {
            name: "Speed",
            duration: 3000,
            value: 1,
        },
        {
            name: "Ballcut",
            duration: 3000,
            value: 2,
        },
        {
            name: "ExtraBall",
            duration: 3000,
            value: 1,
        },
        {
            name: "cough",
            duration: 3000,
            value: 8,
        },
        // {
        //     name: "Star",
        //     duration: 3000,
        //     value: 8,
        // },
        {
            name: "clear",
            duration: 3000,
            value: 8,

        }
    ]
}

class rewards {
    constructor(game) {
        this.context = game.context;
        this.CanvasHeight = game.height;
        this.width = 20;
        this.height = 20;
        this.x = Math.floor(Math.random() * this.CanvasWidth)
        this.y = Math.floor(Math.random() * this.CanvasHeight)
    }
    draw() {

    }

    update() {
        this.x = this.x;
        this.y = this.y;
    }
}