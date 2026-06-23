const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
const tileCount = canvas.width / grid;

let snake = [{x:10, y:10}];
let food = {x:15, y:15};
let dx = 1, dy = 0;
let score = 0;
let gameInterval;
let gameOverFlag = false;

const username = localStorage.getItem('snakeUsername') || 'Player';
document.getElementById('player-name').textContent = username;

function randomFood() {
    food = { x: Math.floor(Math.random()*tileCount), y: Math.floor(Math.random()*tileCount) };
}

function drawGame() {
    if (gameOverFlag) return;

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return endGame();
    if (snake.some(s => s.x === head.x && s.y === head.y)) return endGame();

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        randomFood();
    } else {
        snake.pop();
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    snake.forEach(s => ctx.fillRect(s.x*grid, s.y*grid, grid-2, grid-2));

    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x*grid, food.y*grid, grid-2, grid-2);
}

function changeDirection(e) {
    if (gameOverFlag) return;
    switch(e.key) {
        case 'ArrowUp': case 'w': case 'W': if(dy!==1){dx=0;dy=-1;} break;
        case 'ArrowDown': case 's': case 'S': if(dy!==-1){dx=0;dy=1;} break;
        case 'ArrowLeft': case 'a': case 'A': if(dx!==1){dx=-1;dy=0;} break;
        case 'ArrowRight': case 'd': case 'D': if(dx!==-1){dx=1;dy=0;} break;
    }
}

function endGame() {
    gameOverFlag = true;
    clearInterval(gameInterval);
    submitScore(username, score);
    alert(`Game Over! Score: ${score}`);
    setTimeout(() => window.location.href = 'leaderboard.html', 1000);
}

document.addEventListener('keydown', changeDirection);
window.onload = () => {
    randomFood();
    gameInterval = setInterval(drawGame, 100);
};