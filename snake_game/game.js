import { SNAKE_SPEED } from "./snake.js";
import { getNextPosition, getRandomPosition } from "./grid.js";
import { OPPOSITE_MOVE_DIRECTION } from "./constants.js";
import {
  INITIAL_MOVE_DIRECTION,
  RERENDER_TIME,
  GRID_DIMENSIONS,
} from "./config.js";

const GAME_BOARD = document.getElementById("game-board");
const SCORE_LABEL = document.getElementById("score");
const TIME_LABEL = document.getElementById("time");
const GAME_OVER_MESSAGE = document.getElementById("game-over");
const RESTART_BTN = document.getElementById("restart");

document.addEventListener("DOMContentLoaded", () => {
  {
    let gridTemplateDim = `repeat(${GRID_DIMENSIONS}, 1fr)`;
    GAME_BOARD.style.gridTemplate = `${gridTemplateDim} / ${gridTemplateDim}`;
  }

  initialize();

  RESTART_BTN.addEventListener("click", () => {
    restart();
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let zIndex = GAME_OVER_MESSAGE.style.zIndex;
      console.log(zIndex);
      let isGameOver = zIndex && zIndex >= 0;
      if (isGameOver) restart();
    }
  });
});

document.addEventListener("keydown", (e) => {
  let newMoveDirection;
  switch (e.code) {
    case "ArrowUp":
    case "KeyW":
      newMoveDirection = "up";
      break;
    case "ArrowRight":
    case "KeyD":
      newMoveDirection = "right";
      break;
    case "ArrowDown":
    case "KeyS":
      newMoveDirection = "down";
      break;
    case "ArrowLeft":
    case "KeyA":
      newMoveDirection = "left";
      break;
    default:
      return;
  }
  // capture illegal move
  if (
    snakePositions.length === 1 ||
    newMoveDirection !== OPPOSITE_MOVE_DIRECTION[lastMoveDirection]
  ) {
    moveDirection = newMoveDirection;
  }
});

var snakePositions = [];
var baitPosition = [];
var moveDirection;
var lastMoveDirection;

var lastRenderTime = 0;
var score;
var startTime;

var rerenderTime;

const main = (currentTime) => {
  window.requestAnimationFrame(main);
  const timeSinceLastRender = currentTime - lastRenderTime;
  if (timeSinceLastRender < rerenderTime) return;

  lastRenderTime = currentTime;
  update();
};

window.requestAnimationFrame(main);

const initialize = () => {
  snakePositions = [];
  snakePositions.push([1, 1]);
  moveDirection = INITIAL_MOVE_DIRECTION;
  lastMoveDirection = INITIAL_MOVE_DIRECTION;
  setBait();
  draw();
  score = 0;
  SCORE_LABEL.innerHTML = score;
  rerenderTime = RERENDER_TIME;
  startTime = Date.now();
};

const update = () => {
  moveSnake();
  draw();
  updateTime();
};

const updateTime = () => {
  let timeDiff = Date.now() - startTime;
  timeDiff /= 1000;
  TIME_LABEL.innerHTML = timeDiff.toFixed(1) + "s";
};
const gameOver = () => {
  GAME_OVER_MESSAGE.style.zIndex = "1";
  rerenderTime = Number.MAX_SAFE_INTEGER;
  window.cancelAnimationFrame(main);
};

const restart = () => {
  GAME_OVER_MESSAGE.style.zIndex = "-1";
  initialize();
  window.requestAnimationFrame(main);
};
const draw = () => {
  drawSnake();
  drawBait();
};

/**
 * Whether the head of the snake hits the body of the snake.
 */
const hitSelf = () => {
  let [sx, sy] = snakePositions[0];
  return snakePositions.slice(1).some((el) => {
    let [bx, by] = el;
    return sx === bx && sy === by;
  });
};

/**
 * Whether the head of the snake is located at the bait's position.
 */
const hitBait = () => {
  let [sx, sy] = snakePositions[0];
  let [bx, by] = baitPosition;
  return sx === bx && sy === by;
};

/**
 * Executed after snake eats bait.
 */
const levelUp = () => {
  score++;
  SCORE_LABEL.innerHTML = score;
  setBait();
};

/**
 * Moves the snake given moveDirection.
 */
const moveSnake = () => {
  let newHead = getNextPosition(snakePositions[0], moveDirection);
  if (!newHead) return gameOver();
  snakePositions.unshift(newHead);

  if (hitBait()) {
    levelUp();
  } else if (hitSelf()) {
    gameOver();
  } else {
    snakePositions.pop();
  }

  lastMoveDirection = moveDirection;
};

/**
 * Sets the bait at a random position.
 */
const setBait = () => {
  // get a random position not located on the snake
  baitPosition = getRandomPosition(snakePositions);
};

/**
 * Draws the snake according to snakePositions.
 */
const drawSnake = () => {
  GAME_BOARD.innerHTML = "";
  snakePositions.forEach((pos) => {
    let [x, y] = pos;
    drawEl(x, y, "snake");
  });
};

/**
 * Draws the bait according to baitPosition.
 */
const drawBait = () => {
  let [x, y] = baitPosition;
  drawEl(x, y, "bait");
};

/**
 * Draws an element onto the game grid.
 * @param {number} x - Coordinate along horizontal axis
 * @param {number} y - Coordinate along vertical axis
 * @param {string} [elClass = "snake"] - Optional class string
 */
const drawEl = (x, y, elClass = "snake") => {
  // console.log(`Call with pos [${x}, ${y}], class ${elClass}`);
  let el = document.createElement("div");
  el.classList.add(elClass);
  el.style.gridArea = `${y} / ${x} / span 1 / span 1`;
  GAME_BOARD.appendChild(el);
};
