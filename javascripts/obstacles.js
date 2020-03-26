class Obstacles {
    constructor(game, x, y, r) {
        this.context = game.context;
        this.CanvasWidth = game.width;
        this.CanvasHeight = game.height;
        this.canvas = game.canvas;
        this.player = new Player(this)
        this.x = x
        this.y = y
        this.r = r;
        this.mass = 1;
        this.velocity = {
            x: 2,
            y: -2
        }
        if (Math.floor(Math.random() * 2) == 0) {
            this.velocity.x = -this.velocity.x
        }
        if (Math.floor(Math.random() * 2) == 0) {
            this.velocity.y = -this.velocity.y
        }

    }
    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        this.context.lineWidth = 3;
        this.context.fillStyle = "red";
        this.context.fill();
        this.context.strokeStyle = '#FF0000';
        this.context.stroke();

    }

    bouncingWalls() {
        if (this.velocity.x < 0 && this.x - this.r < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.velocity.x > 0 && this.x + this.r > this.CanvasWidth) {
            this.velocity.x = -this.velocity.x
        }
        if (this.velocity.y < 0 && this.y - this.r < 0) {
            this.velocity.y = -this.velocity.y;
        }
        if (this.velocity.y > 0 && this.y + this.r > this.CanvasHeight) {
            this.velocity.y = -this.velocity.y;
        }
    }

    getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;
        let yDistance = y2 - y1

        return Math.sqrt((Math.pow(xDistance, 2) + Math.pow(yDistance, 2)))

    }

    update(objects) {
        for (let i = 0; i < objects.length; i++) {
            if (this === objects[i]) continue;
            if (this.getDistance(this.x, this.y, objects[i].x, objects[i].y) - objects[i].r * 2 < 0) {
                resolveCollision(this, objects[i])
            }
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.bouncingWalls();
    }
}

// To get the balls bouncing when they touch one another:

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = {
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
            y: u2.y
        };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}