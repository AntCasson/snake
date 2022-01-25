const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const gameOverText = document.querySelector("#game-over")

let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.8
let timerId = 0

function createGrid() {
    for (let i=0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    gameOverText.textContent =" "
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {

    if (
        (currentSnake[0] + width >= width*width && direction === width) ||//hits bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //hits right
        (currentSnake[0] % width === 0 && direction === -1) || //hits left
        (currentSnake[0] - width < 0 && direction === -width) || //hits top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) return gameOver()
    

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    
    
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add one to score
        score++
        //display score
        scoreDisplay.textContent = score
        //speed up snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    
    squares[currentSnake[0]].classList.add('snake')
}


function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()


function control(e) {
    if (e.code === 'ArrowRight') {
        direction = 1
    } else if (e.code === 'ArrowUp') {
        
        direction = -width
    } else if (e.code === 'ArrowLeft') {
        direction = -1
    } else if (e.code === 'ArrowDown') {
        
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)

function gameOver() {
    clearInterval(timerId)
    gameOverText.textContent = "Game Over, press the spacebar to restart"
    console.log("gameOverfn")
}