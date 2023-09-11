'use strict';

import { renderTable } from '/table.js';

let body = document.querySelector("body")
let helpSVG = body.querySelector('#question-mark-icon svg');
let startProgram = body.querySelector("#startBtn")
let playerNamesDiv = body.querySelector(".player-names")
let gameStartBtn = body.querySelector("#start-game")



function initializeGame () {
  renderTable();

  startProgram.addEventListener("click", () => {
    startProgram.classList.toggle("hide")
    playerNamesDiv.classList.toggle("hide")
  })

  gameStartBtn.addEventListener("click", () => {
    let userInputsArr = Array.from(playerNamesDiv.querySelectorAll("input"))
    if (userInputsArr.every(elem => elem.value != "")) {
        console.log(gameStartBtn)
        playerNamesDiv.classList.toggle("hide")
    }
  })
}
initializeGame()

export {initializeGame}