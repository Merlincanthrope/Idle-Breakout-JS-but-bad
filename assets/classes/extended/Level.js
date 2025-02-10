class Level extends Brick {
    constructor({id, level}) {
        super(level);
        this.id = id;
        this.lvl = level;
        this.bricks = [];
        for (var i = 0; i < this.bricks.length; i++)
            this.bricks[i] = [];
        this.levelFormats = levels;
        this.bricksAlive = 0;
    }

    /**draw the level according to the id's corresponding level format 
     * @param {*} id - ID of the level to be drawn*/
    init() {
        var format;
        switch (this.id) {
            case 0: format = this.levelFormats.pillar_cut; break;
            case 1: format = this.levelFormats.wall_sides; break;
        }
        for (var i = 0; i < format.length; i++) {
            this.bricks[i] = [];
            for (var j = 0; j < format[i].length; j++) {
                if (format[i][j] == 4) {
                    this.bricks[i][j] = new Brick({ level: this.lvl, coord: {x: i * BRICK_WIDTH, y: j * BRICK_HEIGHT}, hp: 1 });
                    this.bricksAlive++;
                } else if (format[i][j] == 0) {
                    this.bricks[i][j] = null;
                }
            }
        }
    }

    /**Update the brick's data and draw the new data*/
    updateBricks() {
        for (var i = 0; i < this.bricks.length; i++) {
            for (var j = 0; j < this.bricks[i].length; j++) {
                if (this.bricks[i][j] != null && this.bricks[i][j].hp > 0) {
                    this.bricks[i][j].drawBrick();
                    this.bricks[i][j].drawHP();
                }
            }
        }
    }

    levelCompleteStatus() {
        var status = this.bricksAlive <= 0;
        if (status) console.log("ALERT: Level was completed");
        return status;
    }
}

/*  
    ---------- LOGIC ----------

    The Level class should only be created once per level. It should hold its
    own ID int (param), level int (param), bricks array, and an array
    of level formats from level-data.js.

    > ID <
    The ID value should represent which level is to be loaded. 0 being pillar_cut,
    1 being wall_sides, etc. The number of level formats will increase as time
    passes.

    > LEVEL <
    The level value should represent the number level the player is currently on.
    Once all the bricks are defeated, the level value should increment by 1 and
    the Level object should be refreshed.

    > BRICKS <
    The bricks array should contain a new object of type Brick for each brick in
    the level. If a brick does not exist in a space in the format, the spot in 
    bricks should contain null.

    > LEVEL FORMATS <
    For info on level formats, go to level-data.js
*/