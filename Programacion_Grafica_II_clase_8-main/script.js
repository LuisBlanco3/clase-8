const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.style.backgroundColor = "#8e44ad";

document.body.insertAdjacentHTML("beforeend", `
    <button id="startButton" style="
        position: absolute; 
        bottom: 20px; 
        left: 50%; 
        transform: translateX(-50%); 
        padding: 10px 20px; 
        font-size: 18px; 
        background-color: white; 
        color: black; 
        border: 2px solid black;
        z-index: 1000;
    ">Iniciar Juego</button>
    <p style="
        position: absolute; 
        bottom: 50px; 
        left: 50%; 
        transform: translateX(-50%); 
        font-size: 16px; 
        color: white; 
        background-color: rgba(0, 0, 0, 0.7); 
        padding: 5px 10px;
        border-radius: 5px;
        z-index: 1000;
    ">Usa las flechas del teclado para mover el cuadrado azul</p>
`);

const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    size: 30,
    speed: 5,
    color: "#3498db"
};

const obstacles = [];
const numObstacles = 5;
for (let i = 0; i < numObstacles; i++) {
    obstacles.push({
        x: Math.random() * (canvas.width - 20),
        y: Math.random() * (canvas.height - 20),
        size: 20,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: "#e74c3c"
    });
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

let startTime = 0;
let elapsedTime = 0;
let gameOver = false;
let gameStarted = false;

document.getElementById("startButton").addEventListener("click", () => {
    gameStarted = true;
    gameOver = false;
    startTime = Date.now();
    elapsedTime = 0;
    player.x = canvas.width / 2 - 15;
    player.y = canvas.height / 2 - 15;
    gameLoop();
});

function checkCollision(a, b) {
    return a.x < b.x + b.size &&
           a.x + a.size > b.x &&
           a.y < b.y + b.size &&
           a.y + a.size > b.y;
}

function update() {
    if (!gameStarted || gameOver) return;

    if (keys.ArrowUp) player.y -= player.speed;
    if (keys.ArrowDown) player.y += player.speed;
    if (keys.ArrowLeft) player.x -= player.speed;
    if (keys.ArrowRight) player.x += player.speed;

    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

    obstacles.forEach(obstacle => {
        obstacle.x += obstacle.dx;
        obstacle.y += obstacle.dy;

        if (obstacle.x <= 0 || obstacle.x + obstacle.size >= canvas.width) {
            obstacle.dx = (Math.random() - 0.5) * 4;
        }
        if (obstacle.y <= 0 || obstacle.y + obstacle.size >= canvas.height) {
            obstacle.dy = (Math.random() - 0.5) * 4;
        }

        if (checkCollision(player, obstacle)) {
            gameOver = true;
        }
    });

    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    ctx.fillStyle = "#e74c3c";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);
    });

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Tiempo: ${elapsedTime}s`, 10, 20);

    if (gameOver) {
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText("Perdiste!", canvas.width / 2 - 60, canvas.height / 2 - 20);
        ctx.fillText(`Tiempo: ${elapsedTime}s`, canvas.width / 2 - 70, canvas.height / 2 + 20);
    }
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}
