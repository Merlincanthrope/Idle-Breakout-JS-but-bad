var ballList = {
    // Initialize the first ball
    basic: [
        new BasicBall({speed: 1, velocity: {x: 1, y: 1}})
    ]
};

var ballData = {
    startingCoords: {
        x: 400,
        y: 270,
    },
    basic: {
        fillStyle: "yellow",
        strokeStyle: "black",
        radius: 10,
        speed: 1,
    },
};

var create = {
    /**Create a new basic ball object and push it to ballList.basic
     * @param {*} data - the ball's data to be used to create it*/
    basicBall: (data) => {
        console.log("Creating new Basic Ball...");
        var randNumX = Math.random() * 2;
        var randNumY = Math.random() * 2;
        
        var newVelocityX = data.basic.speed;
        var newVelocityY = data.basic.speed;

        if (randNumX < 1) 
            newVelocityX = -newVelocityX;
        if (randNumY < 1)
            newVelocityY = -newVelocityY;

        ballList.basic.push(
            new BasicBall({speed: data.basic.speed, velocity: {x: newVelocityX, y: newVelocityY}, })
        );

        console.log("BUTTON-INFO: New ball has been created.");
        // for (i = 0; i < ballList.basic.length; i++) {
        //     console.log(ballList.basic[i]);
        // }
    }
}

var upgrade = {
    speed: {
        basicBall: () => {
            ballData.basic.speed += 1;
            for (var i = 0; i < ballList.basic.length; i++) {
                ballList.basic[i].speed += 1;
                ballList.basic[i].updateStats();
            }
        }
    }
}

// Initialize the first level
var level = new Level({id: 0, level: 1});
level.init();

/**Main update function of the whole program (Must work for program to function)*/
function animate() {
    // Refresh the frame by clearing it
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    level.updateBricks();

    // For each basic ball
    for (var i = 0; i < ballList.basic.length; i++) {
        ballList.basic[i].drawBall();
        ballList.basic[i].newPos();
    }

}
setInterval(animate, 20);