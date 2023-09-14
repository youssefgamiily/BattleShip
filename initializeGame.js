'use strict';

import {Player} from './player.js'
import {toggleHide} from './toggleHide.js'

let body = document.querySelector("body")
let helpSVG = body.querySelector('#question-mark-icon svg');
let startProgram = body.querySelector("#startBtn")
let playerNamesDiv = body.querySelector(".player-names")
let gameStartBtn = body.querySelector("#start-game")
let player1Input = body.querySelector("#player1-input")
let player2Input = body.querySelector("#player2-input")
let gameBoards = body.querySelectorAll("table")




const addTableEventListeners = (game) => {
    for (let table of Array.from(gameBoards)) {
        table.addEventListener("click", (e) =>{
            e.preventDefault()
            console.log(e)
            if (e.target.nodeName == "TD") {
                if ( -1 < parseInt(e.target.id) < 100) {
                    game.receiveUserHit(e.target.id)
                    // e.target is the element of the clicked node - you can access it here
                    // 1. is there a ship on this cell ? 
                        // if yes, hit the ship and the cell on the game board
                            // mark the cell as hit
                            // if the ship is sunk, 
                                //mark this cell as sunk (sunk ship)
                                // also if the ship is on more than 1 square and it's hit, mark the rest of the squares on the ship as hit and sunk
                                // uncover the surrounding cells on the gameboard around the sunk ship
                            // if the is not sunk, mark this cell as hit a target (smoke out)
                    // 2. if no cell on this cell, mark cell as hit (missed shot)

                }
            }
        })
    }
}

function initializeGame (game ) {
    startProgram.addEventListener("click", () => {
        toggleHide([startProgram, playerNamesDiv])
    })
    gameStartBtn.addEventListener("click", async () => {
        let userInputsArr = Array.from(playerNamesDiv.querySelectorAll("input"))
        if (userInputsArr.every(elem => elem.value != "")) {
            toggleHide([playerNamesDiv])
            game.addPlayer(1, new Player(player1Input.value, 1))
            game.addPlayer(2, new Player(player2Input.value, 2))
            game.player1.renderGame()
            addTableEventListeners(game)
        }
        else throw new Error("Players not submitted") 
    })
    



}

export {initializeGame}