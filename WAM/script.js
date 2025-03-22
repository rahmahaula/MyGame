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

    // Hapus semua event listener lama dengan cloneNode
    document.querySelectorAll(".hole").forEach(hole => {
        hole.replaceWith(hole.cloneNode(true));
    });

    // Tambahkan event listeners baru yang lebih jelas
    // PERUBAHAN: Tidak lagi menambahkan event listener untuk miss di sini
    // Kita akan hanya mendeteksi miss ketika waktu habis

    clearInterval(gameInterval);
    gameInterval = setInterval(spawnMole, 1000);
}

function spawnMole() {
    // Jika tidak mengklik mole sebelumnya, itu dihitung sebagai miss
    if (currentMole) {
        currentMole.remove();
        // PERUBAHAN: Tambahkan miss karena mole sebelumnya tidak diklik
        mistakes++;
        if (mistakes >= maxMistakes) {
            triggerJumpscare();
            return;
        }
    }

    let holes = document.querySelectorAll(".hole");
    let randomHole = holes[Math.floor(Math.random() * holes.length)];

    currentMole = document.createElement("div");
    currentMole.classList.add("mole");
    randomHole.appendChild(currentMole);

    // PERUBAHAN: Gunakan preventDefault untuk mencegah event bubble
    currentMole.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        handleHit();
        return false;  // Tambahan untuk mencegah event default
    });
    
    currentMole.addEventListener("touchstart", function(event) {
        event.preventDefault();
        event.stopPropagation();
        handleHit();
        return false;  // Tambahan untuk mencegah event default
    });
}

function handleHit() {
    score++;
    document.getElementById("score").textContent = score;
    
    // Set currentMole ke null daripada menghapusnya,
    // ini menandakan bahwa mole sudah diklik dengan benar
    let tempMole = currentMole;
    currentMole = null;
    tempMole.remove();
    
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
