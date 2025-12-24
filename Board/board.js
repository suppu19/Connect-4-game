var playerRed = "R";
var playerBlue = "B";
var currPlayer = playerRed;

var player1Name = "Player 1";
var player2Name = "Player 2";

var scoreRed = 0;
var scoreBlue = 0;

var gameOver = false;
var gameStarted = true;

var board;
var currColumns;

var rows = 6;
var columns = 7;

/* ===== TIMER ===== */
var p1Time = 300;
var p2Time = 300;
var timerInterval = null;

/* ===== LEADERBOARD (ALWAYS 5) ===== */
var leaderboard = [];

window.onload = function () {
  document.getElementById("name1").addEventListener("input", e => {
    player1Name = e.target.value || "Player 1";
    document.getElementById("label1").innerText = player1Name;
    document.getElementById("p1LabelTimer").innerText = player1Name;
  });

  document.getElementById("name2").addEventListener("input", e => {
    player2Name = e.target.value || "Player 2";
    document.getElementById("label2").innerText = player2Name;
    document.getElementById("p2LabelTimer").innerText = player2Name;
  });

  document.querySelector(".refresh-btn").addEventListener("click", renderLeaderboard);
  document.getElementById("close-popup").addEventListener("click", playAgain);

  setGame();
  startTimer();
  updateTimersUI();
  renderLeaderboard();
};

/* ===== TIMER ===== */
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (gameOver) return;

    if (currPlayer === playerRed) p1Time--;
    else p2Time--;

    updateTimersUI();

    if (p1Time <= 0) setWinner(playerBlue);
    if (p2Time <= 0) setWinner(playerRed);
  }, 1000);
}

function updateTimersUI() {
  document.getElementById("p1Time").innerText = formatTime(p1Time);
  document.getElementById("p2Time").innerText = formatTime(p2Time);
}

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* ===== SCORE ===== */
function updateScoreboard() {
  document.getElementById("score1").innerText = scoreRed;
  document.getElementById("score2").innerText = scoreBlue;
}

/* ===== BOARD ===== */
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

/* ===== PLACE PIECE ===== */
function setPiece() {
  if (gameOver) return;

  let coords = this.id.split("-");
  let c = parseInt(coords[1]);
  let r = currColumns[c];
  if (r < 0) return;

  board[r][c] = currPlayer;

  let tile = document.getElementById(r + "-" + c);
  tile.classList.add(currPlayer === playerRed ? "red-piece" : "blue-piece");

  currColumns[c]--;

  checkWinner();
  currPlayer = currPlayer === playerRed ? playerBlue : playerRed;
}

/* ===== CHECK WINNER ===== */
function checkWinner() {

  // Horizontal
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns - 3; c++)
      if (checkFour(r, c, 0, 1)) return;

  // Vertical
  for (let c = 0; c < columns; c++)
    for (let r = 0; r < rows - 3; r++)
      if (checkFour(r, c, 1, 0)) return;

  // Diagonal Right
  for (let r = 0; r < rows - 3; r++)
    for (let c = 0; c < columns - 3; c++)
      if (checkFour(r, c, 1, 1)) return;

  // Diagonal Left
  for (let r = 3; r < rows; r++)
    for (let c = 0; c < columns - 3; c++)
      if (checkFour(r, c, -1, 1)) return;
}

function checkFour(r, c, dr, dc) {
  let p = board[r][c];
  if (p === " ") return false;

  for (let i = 1; i < 4; i++)
    if (board[r + dr * i][c + dc * i] !== p) return false;

  setWinner(p);
  return true;
}

/* ===== WINNER ===== */
function setWinner(piece) {
  if (gameOver) return;
  gameOver = true;
  clearInterval(timerInterval);

  let winnerName;

  if (piece === playerRed) {
    scoreRed++;
    winnerName = player1Name;
  } else {
    scoreBlue++;
    winnerName = player2Name;
  }

  updateScoreboard();
  updateLeaderboard(winnerName);

  document.getElementById("popup-message").innerText =
    winnerName + " Wins the Game!";
  document.getElementById("winner-popup").style.display = "flex";
}

/* ===== PLAY AGAIN ===== */
function playAgain() {
  document.getElementById("winner-popup").style.display = "none";

  gameOver = false;
  currPlayer = playerRed;

  p1Time = 300;
  p2Time = 300;

  setGame();
  updateTimersUI();
  startTimer();
}

/* ===== LEADERBOARD ===== */
function updateLeaderboard(name) {
  let p = leaderboard.find(x => x.name === name);
  if (p) p.score++;
  else leaderboard.push({ name, score: 1 });
}

function renderLeaderboard() {
  let list = document.getElementById("leaderboard-list");
  list.innerHTML = "";

  leaderboard.sort((a, b) => b.score - a.score);

  for (let i = 0; i < 5; i++) {
    let li = document.createElement("li");
    if (leaderboard[i]) {
      li.textContent = `${i + 1}. ${leaderboard[i].name} - ${leaderboard[i].score} pts`;
    } else {
      li.textContent = `${i + 1}. ---`;
    }
    list.appendChild(li);
  }
}
