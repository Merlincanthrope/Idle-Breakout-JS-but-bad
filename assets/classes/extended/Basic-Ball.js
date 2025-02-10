class BasicBall extends Ball {
    constructor({ 
        speed = 0.1, velocity, coord = {x: STARTING_X, y: STARTING_Y}, 
        maxSpd = MAX_SPEED, trueMaxSpd = TRUE_MAX_SPEED
     }) {
        super({velocity, coord});

        // Basic Ball Color Scheme
        this.fillStyle = "yellow";
        this.strokeStyle = "black";

        this.radius = 10;
        this.speedDecrement = 0.05;
        this.speed = 1 + (speed / (10 - this.speedDecrement)); // Set speed
        this.velocity = velocity; // Set total velocity
        this.baseVelocity = velocity; // Set base velocity
        this.velocity.x *= this.speed; // Apply speed multiplier
        this.velocity.y *= this.speed;

        this.MAX_SPEED = maxSpd;
        this.TRUE_MAX_SPEED = trueMaxSpd;
    }
    
    /** Draw an ent object basic ball at its current coordinates */
    drawBall() {
        ctx.save();
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        ctx.arc(this.coord.x, this.coord.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    /** Get the new position of an ent object by adding its velocity to its position */
    newPos() {
        // Check if new coordinates are outside of x bounds
        if (this.coord.x + this.velocity.x + this.radius > CANVAS_WIDTH ||
            this.coord.x + this.velocity.x - this.radius < 0
        ) this.velocity.x = -this.velocity.x;
        // Check if new coordinates are outside of y bounds
        if (this.coord.y + this.velocity.y + this.radius > CANVAS_HEIGHT ||
            this.coord.y + this.velocity.y - this.radius < 0
        ) this.velocity.y = -this.velocity.y;

        this.checkBrickCollision();

        // Add velocity to x and y coordinates
        this.coord.x += this.velocity.x;
        this.coord.y += this.velocity.y;
    }

    /**Runs a check for the ball and determines if it is colliding with a brick. If true, it
     * reverses the velocity on the corresponding axis and lowers the brick's health*/
    checkBrickCollision() {
        for (var i = 0; i < level.bricks.length; i++) {
            for (var j = 0; j < level.bricks[i].length; j++) {
                var brick = level.bricks[i][j];
                if (brick != null && brick.hp > 0) {

                    if (!brick.alive) return;

                    // Check horizontal collision
                    if (
                        this.coord.x + this.radius + this.velocity.x   >=   brick.coord.x && // left of brick
                        this.coord.x - this.radius + this.velocity.x   <=   brick.coord.x + BRICK_WIDTH && // right of brick
                        this.coord.y + this.velocity.y                 >=   brick.coord.y && // top of brick
                        this.coord.y + this.velocity.y                 <=   brick.coord.y + BRICK_HEIGHT // bottom of brick
                    ) {
                        var offset = 0;

                        // Collision between the BasicBall's right side and the left side of brick
                        if (this.velocity.x > 0) {
                            offset -= this.radius;
                            this.coord.x = brick.coord.x + offset - 0.01;
                            // console.log("INFO: Ball hit the left side of a brick");
                            // console.log("INFO: New ball coords=" + this.coord.y + "\n"
                                // + "Brick coords=" + (brick.coord.y + BRICK_HEIGHT));

                        // Collision between the BasicBall's left side and the right side of brick
                        } else {
                            offset += this.radius;
                            this.coord.x = brick.coord.x + BRICK_WIDTH + offset + 0.01;
                            // console.log("INFO: Ball hit the right side of a brick");
                            // console.log("INFO: New ball coords=" + this.coord.y + "\n"
                                // + "Brick coords=" + (brick.coord.y + BRICK_HEIGHT));
                        }

                        this.velocity.x = -this.velocity.x;
                        // console.log("INFO: New velocity is (" + this.velocity.x + ", " + this.velocity.y + ")");
                        brick.hp--;
                        if (brick.hp == 0) 
                            money += 4;
                    }

                    // Check vertical collision
                    else if (
                        this.coord.x + this.velocity.x                 >=    brick.coord.x &&
                        this.coord.x + this.velocity.x                 <=    brick.coord.x + BRICK_WIDTH &&
                        this.coord.y + this.radius + this.velocity.y   >=   brick.coord.y &&
                        this.coord.y - this.radius + this.velocity.y   <=    brick.coord.y + BRICK_HEIGHT
                    ) {
                        var offset = 0;

                        // Collision between the BasicBall's bottom and the top of brick
                        if (this.velocity.y > 0) {
                            offset -= this.radius;
                            this.coord.y = brick.coord.y + offset - 0.01;
                            // console.log("INFO: Ball hit the top of a brick");
                            // console.log("INFO: New ball coords=" + this.coord.y + "\n"
                            //     + "Brick coords=" + (brick.coord.y + BRICK_HEIGHT));

                        // Collision between the BasicBall's top and the bottom of brick
                        } else {
                            offset += this.radius;
                            this.coord.y = brick.coord.y + BRICK_HEIGHT + offset + 0.01;
                            // console.log("INFO: Ball hit the bottom of a brick");
                            // console.log("INFO: New ball coords=" + this.coord.y + "\n"
                            //     + "Brick coords=" + (brick.coord.y + BRICK_HEIGHT));
                        }

                        this.velocity.y = -this.velocity.y;
                        // console.log("INFO: New velocity is (" + this.velocity.x + ", " + this.velocity.y + ")");
                        brick.hp--;
                        if (brick.hp == 0) money += 4;
                    }
                }
            }
        }
    }

    /** Update the stats of the ball (apply speed multi to velocity, among other things) */
    updateStats() {
        this.velocity.x = this.baseVelocity.x * ballList.basic[0].speed;
        this.velocity.y = this.baseVelocity.y * ballList.basic[0].speed;

        if (this.velocity.x >= this.MAX_SPEED)
            { this.velocity.x = this.MAX_SPEED; }
        else if (this.velocity.x <= -this.MAX_SPEED)
            { this.velocity.x = -this.MAX_SPEED; }

        if (this.velocity.y >= this.MAX_SPEED)
            { this.velocity.y = this.MAX_SPEED; }
        else if (this.velocity.y <= -this.MAX_SPEED)
            { this.velocity.y = -this.MAX_SPEED; }

        console.log("INFO: speed=" + this.speed + ", new velocity=(" + this.velocity.x + ", " + this.velocity.y + ")");
    }
}