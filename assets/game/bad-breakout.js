
var ballList = {
    // Initialize the first ball
    basic: [
        new BasicBall({speed: 1, velocity: {x: 1, y: 1}})
    ]
};

var ballData = {
    startingCoords: {
        x: STARTING_X,
        y: STARTING_Y,
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
        const PRICE = 15;
        if (checkEnoughMoney("upg", PRICE)) return;
        console.log("Creating new Basic Ball...");
        var randNumX = Math.random() * 2;
        var randNumY = Math.random() * 2;
        
        const standardBall = ballList.basic[0];

        var newVelocityX = standardBall.velocity.x;
        var newVelocityY = standardBall.velocity.y;

        if (randNumX < 1) 
            newVelocityX = -newVelocityX;
        if (randNumY < 1)
            newVelocityY = -newVelocityY;

        ballList.basic.push(
            new BasicBall({speed: data.basic.speed, velocity: {x: newVelocityX, y: newVelocityY}, })
        );

        if (!freeUpg) money -= PRICE;
        console.log("BUTTON-INFO: New ball has been created.");
        // for (i = 0; i < ballList.basic.length; i++) {
        //     console.log(ballList.basic[i]);
        // }
    }
}

var freeUpg = false;
var cheats = {
    increaseMoney: (amt) => {
        money += amt;
        console.log("CHEAT: Added " + amt + "$ to Player's money");
    },
    freeUpgrades: () => {
        if (freeUpg) {
            freeUpg = false;
            document.getElementById("cheatSettings").innerHTML = "False";
            console.log("CHEAT: freeUpg value changed to " + freeUpg + ". Upgrades are no longer free");
        }
        else {
            freeUpg = true;
            document.getElementById("cheatSettings").innerHTML = "True";
            console.log("CHEAT: freeUpg value changed to " + freeUpg + ". Upgrades are now free");
        }
    }
}

/** Update all stats of each ball in ballList */
function updateBallStats() {
    for (var i = 0; i < ballList.length; i++) {
        var ballType = ballList[i];
        for (var j = 0; j < ballType.length; j++) {
            var ball = ballType[j];
            ball.velocity.x = ball.baseVelocity.x * ball.speed;
            ball.velocity.y = ball.baseVelocity.y * ball.speed;
            // console.log("INFO: speed=" + ball.speed + ", new velocity=(" + ball.velocity.x + ", " + ball.velocity.y + ")");
        }
    }
}

function checkEnoughMoney(type, cost) {
    if (type === "upg" && !freeUpg)
        return money > cost;
}

// Upgrade functions for HTML buttons
var upgrade = {
    speed: {
        basicBall: () => {
            const PRICE = 15;
            if (checkEnoughMoney("upg", PRICE)) return;
            ballData.basic.speed += 0.2;
            for (var i = 0; i < ballList.basic.length; i++) {
                ballList.basic[i].speed += 0.2;
                ballList.basic[i].updateStats();
            }
            if (!freeUpg) money -= PRICE;
        }
    }
}

var money = 0;
function updateMoney() {
    var moneyElem = document.getElementById("money");
    moneyElem.innerHTML = money + "$";
}

// Initialize the first level
var numBricksAlive = 0;
var level = new Level({id: 0, level: 1});
level.init();

/**Main update function of the whole program (Must work for program to function)*/
function animate() {
    // Refresh the frame by clearing it
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (level.levelCompleteStatus()) {
        level.id = Math.floor(Math.random() * 2);
        level.level++;
        level.init();
    }
    level.updateBricks();

    // For each basic ball
    for (var i = 0; i < ballList.basic.length; i++) {
        ballList.basic[i].drawBall();
        ballList.basic[i].newPos();
    }
    updateBallStats();
    updateMoney();
}
setInterval(animate, 20);