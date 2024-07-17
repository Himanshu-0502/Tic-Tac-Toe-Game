// Class names for X and O players
const CROSS_CLASS = 'cross';
const CIRCLE_CLASS = 'circle';

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// DOM elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');

let circleTurn; // Track whose turn it is

// Start the game
startGame();

restartButton.addEventListener('click', startGame);

// Initialize the game
function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(CROSS_CLASS, CIRCLE_CLASS);
    cell.innerHTML = ''; // Clear the cell content
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

// Handle a cell click
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// End the game
function endGame(draw) {
  winningMessageTextElement.innerText = draw ? 'Draw!' : `${circleTurn ? "O's" : "X's"} Wins!`;
  winningMessageElement.classList.add('show');
}

// Check for a draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(CROSS_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

// Place a mark on the board
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerHTML = circleTurn ? '<div class="circle-mark"></div>' : '<div class="cross-mark"></div>'; // Add the mark
}

// Swap turns
function swapTurns() {
  circleTurn = !circleTurn;
}

// Set the hover class based on the current turn
function setBoardHoverClass() {
  board.classList.remove(CROSS_CLASS, CIRCLE_CLASS);
  board.classList.add(circleTurn ? CIRCLE_CLASS : CROSS_CLASS);
}

// Check for a win
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}