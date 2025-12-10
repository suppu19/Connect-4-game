var playerRed = "R";
var playerBlue = "B";
var currPlayer = playerBlue;

var player1Name = "";
var player2Name = "";

var scoreRed = 0;
var scoreBlue = 0;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function () {
    document.getElementById("name1").addEventListener("change", function () {
        player1Name = this.value || "Player 1";
        document.getElementById("label1").innerText = player1Name;
        updateScoreboard();
    });

    document.getElementById("name2").addEventListener("change", function () {
        player2Name = this.value || "Player 2";
        document.getElementById("label2").innerText = player2Name;
        updateScoreboard();
    });

    updateScoreboard();  

    setGame();
};

function updateScoreboard() {
    document.getElementById("score1").innerText = scoreRed;
    document.getElementById("score2").innerText = scoreBlue;
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(" ");

            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);

            boardDiv.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let r = currColumns[c];

    if (r < 0) return;

    board[r][c] = currPlayer;

    let tile = document.getElementById(r + "-" + c);
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerBlue;
    } else {
        tile.classList.add("blue-piece");
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;

    checkWinner();
}

function checkWinner() {
    // Horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (
                board[r][c] !== " " &&
                board[r][c] == board[r][c + 1] &&
                board[r][c + 1] == board[r][c + 2] &&
                board[r][c + 2] == board[r][c + 3]
            ) {
                setWinner(board[r][c]);
                return;
            }
        }
    }

    // Vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (
                board[r][c] !== " " &&
                board[r][c] == board[r + 1][c] &&
                board[r + 1][c] == board[r + 2][c] &&
                board[r + 2][c] == board[r + 3][c]
            ) {
                setWinner(board[r][c]);
                return;
            }
        }
    }

    // Diagonal Right
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (
                board[r][c] !== " " &&
                board[r][c] == board[r + 1][c + 1] &&
                board[r + 1][c + 1] == board[r + 2][c + 2] &&
                board[r + 2][c + 2] == board[r + 3][c + 3]
            ) {
                setWinner(board[r][c]);
                return;
            }
        }
    }

    // Diagonal Left
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (
                board[r][c] !== " " &&
                board[r][c] == board[r - 1][c + 1] &&
                board[r - 1][c + 1] == board[r - 2][c + 2] &&
                board[r - 2][c + 2] == board[r - 3][c + 3]
            ) {
                setWinner(board[r][c]);
                return;
            }
        }
    }
}

function setWinner(piece) {
    let winner = document.getElementById("winner");

    if (piece == playerRed) {
        scoreRed++; 
        winner.innerText = (player1Name || "Player 1") + " Wins!";
    } else {
        scoreBlue++;
        winner.innerText = (player2Name || "Player 2") + " Wins!";
    }

    updateScoreboard(); 
    gameOver = true;
}

function playAgain() {
    gameOver = false;
    currPlayer = playerBlue;
    document.getElementById("winner").innerText = "";
    setGame();
}
