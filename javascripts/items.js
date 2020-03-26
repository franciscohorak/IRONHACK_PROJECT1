class Perks {
    constructor(game, type) {
        this.context = game.context;
        this.CanvasWidth = game.width;
        this.CanvasHeight = game.height;
        this.width = 20;
        this.height = 20;
        this.x = Math.floor(Math.random() * this.CanvasWidth)
        this.y = Math.floor(Math.random() * this.CanvasHeight)
        this.type = this.perks[Math.floor(Math.random() * this.perks.length)];

    }

    draw() {
        if (this.type == this.perks[0]) {
            this.context.save();
            this.context.fillStyle = "Green";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.restore();
        }
        if (this.type == this.perks[1]) {
            this.context.save();
            this.context.fillStyle = "Yellow";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.restore();
        }
        if (this.type == this.perks[2]) {
            this.context.save();
            this.context.fillStyle = "blue";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.restore();
        }
        if (this.type == this.perks[3]) {
            this.context.save();
            this.context.fillStyle = "orange";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.restore();
        }
        if (this.type == this.perks[3]) {
            this.context.save();
            this.context.fillStyle = "pink";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.restore();
        }
        if (this.type == this.perks[4]) {
            this.context.save();
            this.context.fillStyle = "purple";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.restore();
        }
        if (this.type == this.perks[5]) {
            let star = new Image();
            star.src = "images/1200px-Star_icon_stylized.svg.png"
            this.context.fillStyle = "white";
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.drawImage(star, this.x, this.y)
        }


    }
    update() {
        this.x = this.x; // Since the items are static, x and y coordinates stay the same.
        this.y = this.y;
    }


    perks = [{ // Stores all the items that can randomly be placed in the canvas
            name: "Extra Life",
            duration: 2000, // in miliseconds;
            value: 1
        }, {
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
            name: "Food",
            duration: 3000,
            value: 8,
        },
        {
            name: "Star",
            duration: 3000,
            value: 8,
        },
        {
            name: "Star",
            duration: 3000,
            value: 8,
        },
        {
            name: "Star",
            duration: 3000,
            value: 8,
        },
        {
            name: "Star",
            duration: 3000,
            value: 8,
        },
        {
            name: "Star",
            duration: 3000,
            value: 8,
        },
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