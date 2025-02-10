class Brick {
    constructor({level, coord, hp}) {
        this.level = level; // Current game level
        this.hp = hp;
        this.coord = coord; // Object of brick's coordinates (x: n, y: n)

        // Standard settings for all bricks
        this.fillStyle = "rgba(158, 158, 255, 0.8)";
        this.strokeStyle = "black";
        this.width = 70;
        this.height = 30;
        this.alive = true;
    }

    /**Draw the brick onto the canvas*/
    drawBrick() {
        if (this.hp <= 0) {
            this.alive = false;
            return;
        };
        ctx.save();

        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        ctx.beginPath();
        ctx.rect(this.coord.x, this.coord.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        ctx.restore();
    }

    /**Draw the text showing the brick's health on the brick
     * @returns if brick's hp is <= 0*/
    drawHP() {
        if (this.hp <= 0) return;
        ctx.save();

        ctx.font = "18px serif";
        ctx.fillStyle = "black";
        ctx.fillText(this.hp, this.coord.x + 33, this.coord.y + 20);

        ctx.restore();
    }
}

// ---------- LOGIC ----------

/*  Each Brick class is held in the bricks array of the Level class. The data of each Brick
    should hold its own coordinates represented by an object containing the int values x and y.
    The Brick's draw function draws the current individual brick.
*/