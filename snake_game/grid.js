import { GRID_DIMENSIONS } from "./config.js";

/**
 * Get the next position if it exists given GRID_DIMENSIONS.
 * @param {number[2]} currentPosition - x and y coordinates
 * @param {string} moveDirection - Any of ["up", "right", "down", "left"]
 * @return {number[2] || false}
 */
export const getNextPosition = (currentPosition, moveDirection) => {
  let [x, y] = currentPosition;

  switch (moveDirection) {
    case "up":
      y--;
      break;
    case "right":
      x++;
      break;
    case "down":
      y++;
      break;
    case "left":
      x--;
      break;
    default:
      console.error(`${moveDirection} is an invalid move direction.`);
      return false;
  }
  return isOffGrid(x, y) ? false : [x, y];
};

/**
 * Check whether the given coordinates are off grid.
 * @param {number} x
 * @param {number} y
 */
export const isOffGrid = (x, y) => {
  let min = 1;
  let max = GRID_DIMENSIONS;
  return x < min || x > max || y < min || y > max;
};

export const getRandomPosition = (positionsAvoided = []) => {
  let x;
  let y;
  let hasPositionAvoided = false;

  do {
    x = getRandomInt(0, GRID_DIMENSIONS) + 1;
    y = getRandomInt(0, GRID_DIMENSIONS) + 1;

    if (
      positionsAvoided.some((position) => {
        position[0] === x && position[1] === y;
      })
    ) {
      hasPositionAvoided = true;
    }
  } while (hasPositionAvoided);

  return [x, y];
};

/**
 *
 * @param {number} start (inclusive)
 * @param {number} end (exclusive)
 */
const getRandomInt = (start = 0, end = 1) => {
  return Math.floor(Math.random() * (end - start)) + start;
};
