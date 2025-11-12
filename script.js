const board = document.querySelector(".board"); // Getting the board class
const startBtn = document.querySelector(".start-btn"); // Getting the start button
const modal = document.querySelector(".modal"); // Getting the modal class
const startGame = document.querySelector(".start-game"); // getting the startgame class
const gameOver = document.querySelector(".game-over"); // getting the gameover class
const restartBtn = document.querySelector(".restart-btn"); // Getting the restart button
const highScoreElem = document.querySelector("#high-score");
const scoreElem = document.querySelector("#score");
const timeElem = document.querySelector("#time");

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00:00`;

const blockHeight = 40; // Height of block inside the board
const blockWidth = 40; // Width of block inside the board

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = [];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}, ${col}`] = block;
  }
}

let snake = [
  { x: 3, y: 12 },
  { x: 3, y: 13 },
  // { x: 1, y: 5 },
];
let direction = "left";
let intervalId = null;
let timerIntervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
function renderFood() {
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
}

// Changing the direction of the snakeHead on arrow keys
addEventListener("keydown", (event) => {
  // console.log(event.key);
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  }
});

function renderSnake() {
  let head = null;

  // Render food block (make sure it's visible)
  blocks[`${food.x}, ${food.y}`].classList.add("food");

  // Create new head position based on direction
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  // Wall collision check
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    endGame();
    return;
  }

  // Self collision check
  const isColliding = snake.some(
    (segment) => segment.x === head.x && segment.y === head.y
  );
  if (isColliding) {
    endGame();
    return;
  }

  // Food consumption and growth
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}, ${food.y}`].classList.remove("food");
    renderFood();
    blocks[`${food.x}, ${food.y}`].classList.add("food");
    snake.unshift(head);
    score += 3;
    scoreElem.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreElem.innerText = highScore;
    }
  } else {
    // Regular movement
    const tail = snake.pop();
    blocks[`${tail.x}, ${tail.y}`].classList.remove("fill", "head");
    snake.unshift(head);
  }

  // Remove old styling from all segments before re-rendering
  snake.forEach((segment) => {
    blocks[`${segment.x}, ${segment.y}`].classList.remove("head");
  });

  // Render the snake body
  snake.forEach((segment) => {
    blocks[`${segment.x}, ${segment.y}`].classList.add("fill");
  });

  //  Make only the head black
  const headBlock = blocks[`${snake[0].x}, ${snake[0].y}`];
  headBlock.classList.add("head");
}

// Endgame function
function endGame() {
  if (modal.style.display === "flex") return;
  clearInterval(intervalId);
  clearInterval(timerIntervalId);
  modal.style.display = "flex";
  startGame.style.display = "none";
  gameOver.style.display = "flex";
}

startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    renderSnake();
  }, 300);
  timerIntervalId = setInterval(() => {
    let [minutes, seconds] = time.split(":").map(Number);
    if (seconds == 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }
    time = `${minutes}:${seconds}`;
    timeElem.innerText = time;
  }, 1000);
});

restartBtn.addEventListener("click", restartGame); //  Btn to restart the game

// Restarting the game
function restartGame() {
  clearInterval(intervalId);
  clearInterval(timerIntervalId);
  blocks[`${food.x}, ${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}, ${segment.y}`].classList.remove("fill");
  });
  snake.forEach((segment) => {
    blocks[`${segment.x}, ${segment.y}`].classList.remove("head");
  });
  modal.style.display = "none";
  startGame.style.display = "none";
  gameOver.style.display = "none";

  score = 0;
  scoreElem.innerText = score;

  time = `00:00`;
  timeElem.innerText = time;

  direction = "left";

  highScoreElem.innerText = localStorage.getItem("highScore", highScore);

  snake = [
    { x: 3, y: 12 },
    { x: 3, y: 13 },
  ];
  renderFood();
  blocks[`${food.x}, ${food.y}`].classList.add("food");
  intervalId = setInterval(() => {
    renderSnake();
  }, 300);
  timerIntervalId = setInterval(() => {
    let [minutes, seconds] = time.split(":").map(Number);
    if (seconds == 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }
    time = `${minutes}:${seconds}`;
    timeElem.innerText = time;
  }, 1000);
}
