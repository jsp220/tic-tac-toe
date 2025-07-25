const prompt = require("prompt-sync")({ sigint: true });

class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }
}

class Board {
    constructor() {
        this.grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
    }

    print() {
        let boardStr = "";
        for (let i = 0; i < 3; i++) {
            if (i > 0) boardStr += "\n---------\n";
            for (let j = 0; j < 3; j++) {
                if (j > 0) boardStr += " | ";
                boardStr +=
                    this.grid[i][j] === " " ? 3 * i + j + 1 : this.grid[i][j];
            }
        }
        console.log(boardStr);
    }

    placeMark(position, mark) {
        const row = Math.floor((position - 1) / 3);
        const col = (position - 1) % 3;

        if (this.grid[row][col] !== " ") {
            console.log("That square is already taken.");
            return false;
        }

        this.grid[row][col] = mark;
        return true;
    }

    isFull() {
        return this.grid.every((row) => row.every((cell) => cell !== " "));
    }

    checkWin(mark) {
        const g = this.grid;

        // Rows and Columns
        for (let i = 0; i < 3; i++) {
            if (g[i].every((cell) => cell === mark)) return true;
            if (g[0][i] === mark && g[1][i] === mark && g[2][i] === mark)
                return true;
        }

        // Diagonals
        if (g[0][0] === mark && g[1][1] === mark && g[2][2] === mark)
            return true;
        if (g[0][2] === mark && g[1][1] === mark && g[2][0] === mark)
            return true;

        return false;
    }
}

class Game {
    constructor() {
        this.board = new Board();
        this.playerOne = new Player("One", "X");
        this.playerTwo = new Player("Two", "O");
        this.currentPlayer = this.playerOne;
    }

    switchPlayer() {
        this.currentPlayer =
            this.currentPlayer === this.playerOne
                ? this.playerTwo
                : this.playerOne;
    }

    play() {
        let gameOver = false;

        while (!gameOver) {
            this.board.print();

            let move;
            let valid = false;
            while (!valid) {
                move = parseInt(
                    prompt(
                        `Player ${this.currentPlayer.name}'s turn (${this.currentPlayer.mark}). Make your move (enter 1-9): `
                    )
                );
                if (isNaN(move) || move < 1 || move > 9) {
                    console.log("Please enter a number between 1 and 9.");
                    continue;
                }
                valid = this.board.placeMark(move, this.currentPlayer.mark);
            }

            if (this.board.checkWin(this.currentPlayer.mark)) {
                this.board.print();
                console.log(`Player ${this.currentPlayer.name} wins!`);
                gameOver = true;
            } else if (this.board.isFull()) {
                this.board.print();
                console.log("Game over. It's a draw!");
                gameOver = true;
            } else {
                this.switchPlayer();
            }
        }
    }
}

const game = new Game();
game.play();
