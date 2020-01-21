/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, lastDice, winningScore

init()

// Dice ROll
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1
    var diceDom = document.querySelector('.dice')
    diceDom.style.display = 'block'
    diceDom.src = 'dice-' + dice + '.png'

    // Twice Six occure
    if (dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0
      lastDice = 0
      document.getElementById('score-' + activePlayer).textContent = '0'
      nextPlayer()
    } else if (dice !== 1) {
      roundScores += dice
      document.getElementById('current-' + activePlayer).textContent = roundScores
    } else {
      nextPlayer()
    }
    lastDice = dice
  }
})

// Hold Score
document.querySelector('.btn-hold').addEventListener('click', function () {
  var input = document.getElementById('winningScore').value
  lastDice = 0

  if (input) {
    winningScore = input
  } else {
    winningScore = 100
  }

  if (gamePlaying) {
    scores[activePlayer] += roundScores
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]

    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false
      document.getElementById('name-' + activePlayer).textContent = 'winner!'
      document.querySelector('.dice').style.display = 'none'

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    } else {
      nextPlayer()
    }
  }
})

// Next player Function
function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScores = 0

  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  // document.querySelector('.dice').style.display = 'none'
}

// New Game
document.querySelector('.btn-new').addEventListener('click', init)

function init () {
  scores = [0, 0]
  roundScores = 0
  activePlayer = 0
  gamePlaying = true
  lastDice = 0

  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'

  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'

  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')

  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')

  document.querySelector('.player-0-panel').classList.add('active')

  // Set dice image display to none
  document.querySelector('.dice').style.display = 'none'
}
