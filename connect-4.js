const friendBtn = document.getElementById("friendBtn");
const robotBtn = document.getElementById("robotBtn");
const tournamentBtn = document.getElementById("tournamentBtn");
const onlineBtn = document.getElementById("onlineBtn");

friendBtn.addEventListener("click", () => {
    // Go to friend mode screen
    window.location.href = "Board/board.html";
});

robotBtn.addEventListener("click", () => {
    // Go to robot mode screen
    window.location.href = "Board/board.html";
});

tournamentBtn.addEventListener("click", () => {
    // Go to tournament create screen
    window.location.href = "Board/board.html";
});

onlineBtn.addEventListener("click", () => {
    // Go to online play setup
    window.location.href = "Board/board.html";
});
