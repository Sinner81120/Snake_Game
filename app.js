const SIZE = 20;
const ROW = 30;
const COL = 50;


var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
let scoreDisplay = document.getElementById("score_display");
let scoreNotify = document.getElementById("score_notify");
let notify = document.getElementsByClassName("notify");
let pauseButton = document.getElementById("pause_button");
let runButton = document.getElementById("run_button");
canvas.height = SIZE * ROW;
canvas.width = SIZE * COL;

function init() {
    this.head = { x: 7, y: 5 };
    this.snake = [{ x: 6, y: 5 }, { x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }];
    this.point = 0;
    this.food = { x: Math.floor(Math.random() * COL), y:  Math.floor(Math.random() * ROW) };
    this.direction = 39;
    this.speed = 50;
    scoreDisplay.innerText = this.point;
}
window.addEventListener("keydown", keyPush);
function keyPush(e) {
    if (Math.abs(e.keyCode - direction) % 2) {
        switch (e.keyCode) {
            case 37: {
                direction = 37;
                break;
            }
            case 38: {
                direction = 38;
                break;
            }
            case 39: {
                direction = 39;
                break;
            }
            case 40: {
                direction = 40;
                break;
            }
        }
    }
}
function game() {
    init();
    drawPart(food);
    drawSnake();
    loop = setInterval(snakeMove, speed);
}
function snakeMove() {
    switch (direction) {
        // Up
        case 38: {
            head.y -= 1;
            break;
        }
        // Down
        case 40: {
            head.y += 1;
            break;
        }
        // Left
        case 37: {
            head.x -= 1;
            break;
        }
        // Right
        case 39: {
            head.x += 1;
            break;
        }
    }
    if (head.x == food.x && head.y == food.y ? eatFood() : snake.pop());
    if (head.x == COL || head.y == ROW || head.x == -1 || head.y == -1 ? gameOver() : "");
    if(snake.includes({x : head.x, y : head.y}) ? gameOver() : "");
    snake.forEach((part) => checkHit(head, part));
    clearBoard();
    drawPart(food, "#FFF");
    drawSnake();
}
function checkHit(head, target){
    if(head.x == target.x && head.y == target.y){
        gameOver();
    }
}
function eatFood() {
    point += 10;
    scoreDisplay.innerText = point;
    createFood();
}
function createFood() {
    let check = false;
    while(!check){
        food.x = Math.floor(Math.random() * COL);
        food.y = Math.floor(Math.random() * ROW);
        if(snake.includes({x : food.x, y : food.y}) ? check = false : check = true);
    }
}
function drawSnake() {
    let newDot = { x: head.x, y: head.y };
    snake.unshift(newDot);
    for(let i = 0; i < snake.length; i++){
        drawPart(snake[i]);
    }
    // snake.forEach(drawPart);
}
function clearBoard() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, COL * SIZE, ROW * SIZE);
}
function drawPart(snakePart, color = "#00FF00") {
    ctx.fillStyle = color;
    ctx.fillRect(snakePart.x * SIZE + 1, snakePart.y * SIZE + 1, SIZE - 1, SIZE - 1);
}
function gameOver() {
    clearInterval(loop);
    scoreNotify.innerText = point;
    notify[0].style.visibility = "visible";
}
function playAgain() {
    notify[0].style.visibility = "hidden";
    game();
}
function stop(e){
    e.disabled = true;
    runButton.disabled = false;
    clearInterval(loop);
}
function run(e){
    e.disabled = true;
    pauseButton.disabled = false;
    loop = setInterval(snakeMove, speed);
}
game();