const cells = document.querySelectorAll('.cell');
const container = document.querySelector('.container');
const selectSigns = document.querySelector('.select-signs');
const closePopup = document.querySelector('#closePopup');
const popup = document.querySelector('#popup');
const startGame = document.querySelector('#startGame');
const playerXInput = document.querySelector('#playerX');
const playerOInput = document.querySelector('#playerO');
const display = document.querySelector('.display');

function createBoard() {
    let board = Array(9).fill(null);

    function updateCell(index, value) {
        if (index >= 0 && index < board.length) {
            board[index] = value;
        }
    }

    function checkBoard() {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== null) {
            return true;
        } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== null) {
            return true;
        } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== null) {
            return true;
        } else if (board[0] === board[3] && board[3] === board[6] && board[0] !== null) {
            return true;
        } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== null) {
            return true;
        } else if (board[2] === board[5] && board[5] === board[8]  && board[2] !== null) {
            return true;
        } else if (board[0] === board[4] && board[4] === board[8] && board[0] !== null) {
            return true;
        } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== null) {
            return true;
        } else {
            return false;
        }
    }

    function isDraw() {
        return board.every(cell => cell !== null);
    }

    return {
        updateCell,
        checkBoard,
        isDraw
    }
}

function createPlayer(name, sign) {
    return {
        name,
        sign
    }
}

function game(playerX, playerO, board) {
    let currentPlayer = playerX;

    function switchPlayer() {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = `It's ${currentPlayer.name}'s turn (${currentPlayer.sign})`;
    }

    function playGame() {
        updateDisplay();
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (board[index] == null) {
                    board.updateCell(index, currentPlayer.sign);
                    cell.textContent = currentPlayer.sign;

                    if (board.checkBoard()) {
                        display.textContent = `${currentPlayer.name} wins!`;
                        cells.forEach(cell => cell.removeEventListener('click', () => {}));
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else if (board.isDraw()) {
                        display.textContent = `It's a draw!`;
                        cells.forEach(cell => cell.removeEventListener('click', () => {}));
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        switchPlayer();
                    }
                }
            });
        });
    }

    return {
        playGame
    }
}

let playerX;
let playerO;

selectSigns.addEventListener('click', () => {
    popup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

startGame.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    popup.style.display = 'none';
    container.style.display = 'grid';
    selectSigns.style.display = 'none';

    playerX = createPlayer(playerXInput.value, 'X');
    playerO = createPlayer(playerOInput.value, 'O');

    let board = createBoard();
    let gameInstance = game(playerX, playerO, board);

    gameInstance.playGame(); // Start the game
});