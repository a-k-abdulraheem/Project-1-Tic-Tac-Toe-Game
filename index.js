const player1 = {
  name: 'Player 1',
  score: 0,
  letter: 'x'
};

const player2 = {
  name: 'Player 2',
  score: 0,
  letter: 'o'
};

/* const computer = {
  name: 'Computer',
  score: 0,
  letter: 'o'
}; */

const boxesElement = document.querySelectorAll('button[class^="js-move-button"]');

updatePlayersDetails();

// I used numbers in the array because while evatuating in checkResult(), all the empty strings were evaluating as true
const gameBoxes = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9']
];

let movesCounter = 0;

let currentPLayer = player1;

let hasAnyPlayerWon = false;

boxesElement.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', ()=> {
        if ((!hasAnyPlayerWon) && (buttonElement.innerHTML === '')) {
          buttonElement.innerHTML = `${currentPLayer.letter}`;
          addLetterToGameBoxArray(index, currentPLayer);
          movesCounter++;

          checkResult();

          currentPLayer = (currentPLayer.name === 'Player 1') ? player2 : player1;
          updatePlayerTurn(currentPLayer);
        }
      });
  });

function addLetterToGameBoxArray(index, player) {
  const i = Math.floor((index) / 3);
  const j = index % 3;
  gameBoxes[i][j] = `${player.letter}`;
}

function checkResult() {
  let flag = 0;

  // check if the any diagonal items has equal items
  if (gameBoxes[0][0] === gameBoxes[1][1] && gameBoxes[1][1] === gameBoxes[2][2]) {
    highlightWinBoxes(0, 0, 1, 1, 2, 2);
    updateWinner(gameBoxes[0][0]);
    return;
  }
  else if (gameBoxes[0][2] === gameBoxes[1][1] && gameBoxes[1][1] === gameBoxes[2][0]) {
    highlightWinBoxes(0, 2, 1, 1, 2, 0)
    updateWinner(gameBoxes[0][2]);
    return;
  }

  // check if any row has equal items
  for (let i = 0; i < 3; i++) {
    const j = 0;
    if (gameBoxes[i][j] === gameBoxes[i][j+1] && gameBoxes[i][j+1] === gameBoxes[i][j+2]) {
      highlightWinBoxes(i, j, i, j+1, i, j+2);
      updateWinner(gameBoxes[i][j]);
      flag = 1
      break;
    }
  }

  if (flag) return;

  // check if any column has equal items
  for (let j = 0; j < 3; j++) {
    const i = 0;
    if (gameBoxes[i][j] === gameBoxes[i+1][j] && gameBoxes[i+1][j] === gameBoxes[i+2][j]) {
      highlightWinBoxes(i, j, i+1, j, i+2, j);
      updateWinner(gameBoxes[i][j]);
      flag = 1;
      break;
    }
  }

  if (flag) return;

  //check if no available box
  if (movesCounter === 9) {
    displayReplayMessage();
  }
}

function updatePlayersDetails() {
  document.querySelector('.js-player1-details')
    .innerHTML = `
      <p>${player1.name} (${player1.letter})</p>
      <p>Score: ${player1.score}</p>
      <p class="js-player1-turn player-turn">${player1.letter}'s Turn</p>
    `;

  document.querySelector('.js-player2-details')
    .innerHTML = `
      <p>${player2.name} (${player2.letter})</p>
      <p>Score: ${player2.score}</p>
      <p class="js-player2-turn player-turn"></p>
    `;
}

function updatePlayerTurn(currentPLayer) {
  if (currentPLayer.name === 'Player 1') {
    document.querySelector('.js-player1-turn')
      .innerHTML = `${player1.letter}'s Turn`;
    document.querySelector('.js-player2-turn')
      .innerHTML = '';
  } else if (currentPLayer.name === 'Player 2') {
    document.querySelector('.js-player2-turn')
      .innerHTML = `${player2.letter}'s Turn`;
    document.querySelector('.js-player1-turn')
      .innerHTML = '';
  }
}

function updateWinner(letter) {
  hasAnyPlayerWon = true;

  if (letter === player1.letter) {
    player1.score++;
  }
  else if (letter === player2.letter) {
    player2.score++;
  }

  updatePlayersDetails();

  displayReplayMessage();
}

function displayReplayMessage() {
  setTimeout(() => {
    const replyMessageElement = document.querySelector('.js-replay-message');
    replyMessageElement.classList.add('js-display-replay-message');

    document.querySelector('.js-replay-yes')
      .addEventListener( 'click', () => {
        //reset the array
        let num = 1
        for (let i = 0; i < 3; i++)
          for (let j = 0; j < 3; j++, num++) {
            gameBoxes[i][j] = num
          }

        //reset the boxes
        boxesElement.forEach(element => {
            element.innerHTML = '';
          });
        
        // reset moves counter
        movesCounter = 0;

        hasAnyPlayerWon = false;

        replyMessageElement.classList.remove('js-display-replay-message');

        boxesElement.forEach((element) => {
            element.classList.remove('win-boxes');
        });
      });

    document.querySelector('.js-replay-no')
      .addEventListener('click', () => {
        replyMessageElement.innerHTML = `Game Over!`;
      });
  }, 1000);  
}

function highlightWinBoxes(a, b, m, n, x, y) {
  // [a][b] => location of first box in array
  // [i][j] => location of second box in array
  // [x][y] => location of third box in array

  boxesElement.forEach((element, index) => {
    if (index === (3*a)+b) {
      element.classList.add('win-boxes');
    } else if(index === (3*m)+n) {
      element.classList.add('win-boxes');
    } else if (index === (3*x)+y) {
      element.classList.add('win-boxes');
    }
  });
}