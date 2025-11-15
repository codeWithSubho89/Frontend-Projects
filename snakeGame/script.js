const board = document.querySelector('.board');
const startBtn = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartBtn = document.querySelector('.btn-restart');

const highScoreElem = document.querySelector('#high_score');
const scoreElem = document.querySelector('#score');
const timeElem = document.querySelector('#time');


const blockHight = 30;
const blockWidth = 30;
let interval = null;
let timerInterval = null;

let highScore = localStorage.getItem('highScore')
let score = 0;
let time = '00-00';

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHight);

const blocks = []
let snake = [{x:1,y:3}]
let food = {x : Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}

let direction = "down"
let speed = 300;

for(let r = 0 ; r < rows; r++){
    for(let c = 0; c < cols; c++){
        const block = document.createElement('div')
        block.classList.add('block')
        board.appendChild(block)
        blocks[`${r}-${c}`] = block
    }
}
function renderSnake(){
        gameRules()

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('snake')
    })
}
function gameRules(){
    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add('food')

    if(direction === 'left'){
        head = {y: snake[0].y -1, x: snake[0].x}
    }else if(direction === 'right'){
        head = {y: snake[0].y + 1, x: snake[0].x}
    }else if(direction === 'up'){
        head = {y: snake[0].y, x: snake[0].x - 1}
    }else if(direction === 'down'){
        head = {y: snake[0].y, x: snake[0].x + 1}
    }

    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        clearInterval(interval)
        modal.style.display = "flex"
        startModal.style.display = "none"
        gameOverModal.style.display="flex"
        return;
    }
    if(head.x === food.x && head.y === food.y){
        blocks[`${food.x}-${food.y}`].classList.remove('food')
        food = {x : Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
        blocks[`${food.x}-${food.y}`].classList.add('food')
        snake.unshift(head)
        score += 1;
        scoreElem.textContent = score;
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore',JSON.stringify(highScore))
        }
        if(speed > 50){
            speed -= 3;
        }else{
            speed = 300;
        }
    }
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('snake')
    })

    snake.unshift(head)
    snake.pop()
}

startBtn.addEventListener('click',()=>{
    modal.style.display = 'none'
    speed = 300;
    interval = setInterval(()=>{renderSnake()},speed)
    timerInterval = setInterval(()=>{
        let [min,sec] = time.split("-").map(Number)

        if(sec == 59){
            min += 1
            sec = 0
        }else{
            sec += 1
        }

        time = `${min}-${sec}`;
        timeElem.textContent = time;

    },1000)
})
restartBtn.addEventListener('click',restartGame)

function restartGame(){
    blocks[`${food.x}-${food.y}`].classList.remove('food')
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('snake')
    })
    direction = 'down';
    speed= 300;
    score =0;
    time ='00-00';

    scoreElem.textContent = score;
    timeElem.textContent = time;
    highScoreElem.textContent = highScore;

    modal.style.display = "none";
    snake = [{x:1,y:3}]
    food = {x : Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
    interval = setInterval(()=>{
        renderSnake()
    },speed)
}

window.addEventListener('keydown',(e)=>{
    if(e.key === 'ArrowUp'){
        direction = 'up';
    }else if(e.key === 'ArrowDown'){
        direction = 'down'
    }else if(e.key === 'ArrowLeft'){
        direction = 'left'
    }else if(e.key === 'ArrowRight'){
        direction = 'right'
    }
})