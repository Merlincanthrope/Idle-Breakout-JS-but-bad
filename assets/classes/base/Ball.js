class Ball {
    constructor({velocity}) {
        this.coord = {
            x: 415,
            y: 270,
        };
        this.velocity = velocity;
    }
}

// ---------- LOGIC ----------

/*This file only contains data that is used by all balls and not any specific one.
Data that is specific to a type of ball should be placed in its own respective class.
*/