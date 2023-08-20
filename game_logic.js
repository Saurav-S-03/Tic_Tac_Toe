let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let endText = document.getElementById('endText')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let red = getComputedStyle(document.body).getPropertyValue('--red')
let blue = getComputedStyle(document.body).getPropertyValue('--blue')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let count = 0
let flag = false
let warn = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    if(flag){
        endText.innerHTML = "Click Restart to Play Again"
        warn ++
        if(warn > 4){
            alert("Click OK to Restart Game..")
            restart()
        }
        return
        // boxes.forEach(box => box.endEventListener('click', boxClicked))
    }
    
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        if(currentPlayer == 'X'){
            e.target.style.color=red  
        }
        else{
            e.target.style.color=blue
        }
        count = count + 1

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            endText.innerHTML = 'Game Over'
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            flag = true
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        endText.innerHTML = `${currentPlayer}'s Turn`
    }
    if(count >= 9){
        playerText.innerHTML = `Game is a Draw..!!`
        // endText.innerHTML = `Click Restart to Continue`
        flag = true
        return 
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'
    endText.innerHTML = "X's Turn"
    count = 0
    warn = 0
    flag = false
    currentPlayer = X_TEXT
    return
}

startGame()