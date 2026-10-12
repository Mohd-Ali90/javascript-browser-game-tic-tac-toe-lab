/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]



/*---------------------------- Variables (state) ----------------------------*/
let board = null
let turn = null
let winner = null
let tie = null
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset-button')


console.log(squareEls)
console.log(messageEl)

/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log('function loaded')
    board = ['', '', '',
        '', '', '',
        '', '', '']
    turn = 'X'
    winner = false
    tie = false
    render()
}

function render() {
    updateBoard()
    updateMessage()
}

function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        squareEls[i].textContent = board[i]
    }

}

function updateMessage() {
    if (winner === false && tie === false) {
        message.textContent = `Player turn: ${turn}`
    }
    else if (winner === false && tie === true) {
        message.textContent = "Its a TIE!"
    }
    else if (winner === true && tie === false) {
        message.textContent = `WIN!`
    }
}

function handleClick(event) {
    const squareIndex = event.target.id
    console.log('This is the current square index', squareIndex);

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return;
    }
    if (winner === true) {
        return;
    }

    placePiece(squareIndex)

    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    updateMessage()
}

function placePiece(squareIndex) {
    if (board[squareIndex] === '' && turn === 'X') {
        board[squareIndex] = turn
        turn = 'O'
        console.log('This is the next turn', turn)
    }

    if (board[squareIndex] === '' && turn === 'O') {
        board[squareIndex] = 'O'
        turn = 'X'
        console.log('This is the next turn', turn)
    }

    updateBoard()

}


function checkForWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        let [a, b, c] = winningCombos[i]
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            console.log('we have a winner')
            winner = true
        }
    }
}

function checkForTie() {
    if (winner === true) {
        return
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '' || board[i] === 'X') {
            tie = false
        } else {
            tie = true
        }
    }
}

function switchPlayerTurn() {
    if (winner === true) {
        return
    }
    else if (winner === false && turn === 'X') {
        turn = 'X'
    }
    else if (winner === false && turn === 'O') {
        turn = 'O'
    }
}

/*----------------------------- Event Listeners -----------------------------*/
for (oneSquare of squareEls) {
    oneSquare.addEventListener('click', handleClick)
}

resetBtnEl.addEventListener('click', init)


init()