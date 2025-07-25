const prompt = require("prompt-sync")({ sigint: true });

/*
 * A Tic-Tac-Toe game played via command line.
 */
function game() {
    // initialize variables
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
    let playerOneTurn = true;
    let gameOver = false;

    while (!gameOver) {
        // display game board
        printBoard(board);

        // take user input for the move
        let isMoveValid = false;
        if (!isMoveValid) {
            let move = prompt(
                `Player ${
                    playerOneTurn ? "One" : "Two"
                }'s turn. Make your move (enter 1-9): `
            );

            // validate move and update board if valid
            isMoveValid = validateMove(move, board, playerOneTurn);
        }

        // check if game is won
        if (isMoveValid) {
            gameOver = validateGameOver(board, playerOneTurn);

            if (gameOver) {
                printBoard(board);
                console.log(`Player ${playerOneTurn ? "One" : "Two"} wins!`);
            } else {
                playerOneTurn = !playerOneTurn;
            }
        }

        //check if board is full and end game as a draw if full
        if (validateBoard(board)) {
            printBoard(board);
            console.log("Game over. It's a draw!");
            gameOver = true;
        }
    }
}

// constructs a 3x3 board given the board state matrix and prints it
function printBoard(board) {
    let boardAsString = "";
    for (let i = 0; i < board.length; i++) {
        if (i > 0) {
            boardAsString += "\n---------\n";
        }
        for (let j = 0; j < board[0].length; j++) {
            if (j > 0) {
                boardAsString += " | ";
            }

            // Display either square number (1-9) or O/X
            boardAsString += board[i][j] === " " ? 3 * i + j + 1 : board[i][j];
        }
    }
    console.log(boardAsString);
}

// validates user input and updates the board with the move
function validateMove(move, board, playerOneTurn) {
    move = parseInt(move);

    if (!move || move < 1 || move > 9) {
        console.log("Please enter a number between 1 and 9.");
        return false;
    }

    let row = Math.floor((move - 1) / 3);
    let col = (move - 1) % 3;

    if (board[row][col] !== " ") {
        console.log("That square is already taken. Please try again.");
        return false;
    }

    board[row][col] = playerOneTurn ? "X" : "O";
    return true;
}

// checks if the game was won by the current player
function validateGameOver(board, playerOneTurn) {
    const mark = playerOneTurn ? "X" : "O";

    // check each row
    for (let i = 0; i < board.length; i++) {
        if (board[i].every((col) => col == mark)) {
            return true;
        }
    }
    // check each column
    for (let j = 0; j < board[0].length; j++) {
        if (
            board[0][j] === mark &&
            board[1][j] === mark &&
            board[2][j] === mark
        ) {
            return true;
        }
    }

    // check diagonals
    if (board[1][1] === mark) {
        if (board[0][0] === mark && board[2][2] === mark) {
            return true;
        } else if (board[2][0] === mark && board[0][2] === mark) {
            return true;
        }
    }

    return false;
}

// checks if the board is full
function validateBoard(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === " ") {
                return false;
            }
        }
    }
    return true;
}

game();
