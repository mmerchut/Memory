const cardValue = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let gameBoard = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

function initGame() {
    gameBoard = [...cardValue, ...cardValue]
    .sort(() => 0.5 - Math.random())
    .map(value => createCard(value));

    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = "";
    gameBoard.forEach(card => gameBoardElement.appendChild(card));
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch()
    }
    
}

function checkForMatch() {
    lockBoard = true;

    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards += 2;

    resetBoard();
    if (matchedCards === cardValues.length * 2) {
        alert("Gratulacje!");
    }


}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();

    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, null];
}

document.getElementById('restartButton').addEventListener('click', () => {
    matchedCards = 0;
    initGame();
});

initGame();