class Ball {
    constructor() {
        this.coord = {
            x: STARTING_X,
            y: STARTING_Y,
        };
        this.velocity = {x: 1, y: 1};
    }
}

// ---------- LOGIC ----------

/*This file only contains data that is used by all balls and not any specific one.
Data that is specific to a type of ball should be placed in its own respective class.
*/