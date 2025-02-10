// General constants for accessing the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas details
const CANVAS_WIDTH = 910, CANVAS_HEIGHT = 540;

// Brick details
const BRICK_COLUMNS = 13;
const BRICK_ROWS = 18;
const BRICK_WIDTH = 70;
const BRICK_HEIGHT = 30;

// Ball Details
const MAX_SPEED = 40;
const TRUE_MAX_SPEED = 65;
const STARTING_X = CANVAS_WIDTH/2;
const STARTING_Y = CANVAS_HEIGHT/2;