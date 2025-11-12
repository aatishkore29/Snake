// Getting the board class
const board = document.querySelector(".board");

// Getting the start button
const startBtn = document.querySelector(".btn-start");

// Getting the modal class
const modal = document.querySelector(".modal");

const blockHeight = 50; // Height of block inside the board
const blockWidth = 50; // Width of block inside the board

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

const snake = [
  { x: 1, y: 3 },
  // { x: 1, y: 4 },
  // { x: 1, y: 5 },
];
let direction = "down";
let intervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

function renderSnake() {
  let head = null;

  blocks[`${food.x}, ${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    alert("Game Over!!");
    clearInterval(intervalId);
  }
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}, ${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}, ${food.y}`].classList.add("food");
    snake.push(head);
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}, ${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    blocks[`${segment.x}, ${segment.y}`].classList.add("fill");
  });
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

startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    renderSnake();
  }, 300);
});

function restartGame() {}
// intervalId = setInterval(() => {
//   renderSnake();
// }, 400);
