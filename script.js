// Getting the board class
const board = document.querySelector(".board");

const blockHeight = 30; // Height of the block inside the board
const blockWidth = 30; // Width of the block inside the board

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

for (let i = 0; i < rows * cols; i++) {
  const block = document.createElement("div");
  block.classList.add("block");
  board.appendChild(block)
}
