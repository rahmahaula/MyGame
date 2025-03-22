let score = 0;
let mistakes = 0;
let gameInterval;
let currentMole;
const maxScore = 10;
const maxMistakes = 3;

function startGame() {
    score = 0;
    mistakes = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("game-over").style.display = "none";
    document.getElementById("you-win").style.display = "none";
    document.getElementById("jumpscare").style.display = "none";

    document.querySelectorAll(".hole").forEach(hole => {
        hole.replaceWith(hole.cloneNode(true));
    });

    document.querySelectorAll(".hole").forEach(hole => {
        hole.addEventListener("click", handleMiss);
        hole.addEventListener("touchstart", handleMiss);
    });

    clearInterval(gameInterval);
    gameInterval = setInterval(spawnMole, 1000);
}

function handleMiss(event) {
    if (!event.target.classList.contains("mole")) {
        mistakes++;
        if (mistakes >= maxMistakes) {
            triggerJumpscare();
        }
    }
}

function spawnMole() {
    if (currentMole) {
        currentMole.remove();
    }

    let holes = document.querySelectorAll(".hole");
    let randomHole = holes[Math.floor(Math.random() * holes.length)];

    currentMole = document.createElement("div");
    currentMole.classList.add("mole");
    randomHole.appendChild(currentMole);

    currentMole.addEventListener("click", handleHit);
    currentMole.addEventListener("touchstart", handleHit);
}

function handleHit() {
    score++;
    document.getElementById("score").textContent = score;
    currentMole.remove();
    if (score >= maxScore) {
        youWin();
    }
}

function triggerJumpscare() {
    document.getElementById("jumpscare").style.display = "flex";
    document.querySelector(".game-board").style.display = "none";
    clearInterval(gameInterval);
    
    setTimeout(() => {
        document.getElementById("jumpscare").style.display = "none";
        gameOver();
    }, 3000);
}

function gameOver() {
    document.getElementById("game-over").style.display = "block";
    document.querySelector(".game-board").style.display = "grid";
}

function youWin() {
    clearInterval(gameInterval);
    document.getElementById("you-win").style.display = "block";
}
