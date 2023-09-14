'use strict';

import { renderTable } from '/renderTable.js';
import {Player} from './player.js'
import {toggleHide} from './myscript.js'

let body = document.querySelector("body")
let helpSVG = body.querySelector('#question-mark-icon svg');
let startProgram = body.querySelector("#startBtn")
let playerNamesDiv = body.querySelector(".player-names")
let gameStartBtn = body.querySelector("#start-game")
let player1Input = body.querySelector("#player1-input")
let player2Input = body.querySelector("#player2-input")





function initializeGame (game ) {
    renderTable(1);
    startProgram.addEventListener("click", () => {
        toggleHide([startProgram, playerNamesDiv])
    })
    gameStartBtn.addEventListener("click", async () => {
        let userInputsArr = Array.from(playerNamesDiv.querySelectorAll("input"))
        if (userInputsArr.every(elem => elem.value != "")) {
            toggleHide([playerNamesDiv])
            game.addPlayer(1, new Player(player1Input.value))
            game.addPlayer(2, new Player(player2Input.value))
        }
        else throw new Error("Players not submitted") })

}

export {initializeGame}