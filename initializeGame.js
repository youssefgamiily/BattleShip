'use strict';

import {Player} from './player.js'
import {toggleHide} from './toggleHide.js'
import {startGameLoop} from './gameLoop.js'
import {dispTop, initShipPlacement} from './shipPlacement.js'


let body = document.querySelector("body")
let helpSVG = body.querySelector('#question-mark-icon svg');
let startProgram = body.querySelector("#startBtn")
let playerNamesDiv = body.querySelector(".player-names")
let gameStartBtn = body.querySelector("#start-game")
let player1Input = body.querySelector("#player1-input")
let player2Input = body.querySelector("#player2-input")
let NumShipsDiv = body.querySelector(".NumShipsDiv")



const dispBelow = (message, additionalElements = []) => {
    if (!document.querySelector(".bel-disp")){
        const bottomDiv = document.createElement("div")
        bottomDiv.classList.add("bel-disp")
        const heading = document.createElement("h3");
        heading.id="temp-header"
        heading.insertAdjacentHTML("beforeend", message)
        bottomDiv.innerHTML = "";
        bottomDiv.insertAdjacentElement("afterbegin", heading);
        for (const element of additionalElements) {
        bottomDiv.insertAdjacentElement("beforeend", element);
        }
        body.insertAdjacentElement("beforeend", bottomDiv) 
    } else if (document.querySelector(".bel-disp")) {
        document.querySelector(".bel-disp").remove()
        dispBelow (message, additionalElements)
    }
  };


const getGameSpecs = () => {
    const allInputs = NumShipsDiv.querySelectorAll("div input");
    if (Array.from(allInputs).every((field) => !isNaN(parseInt(field.value)))) {
      const numOfShips = {
        NumSqIs4: parseInt(NumShipsDiv.querySelector("#NoOfShips-4sq").value),
        NumSqIs3: parseInt(NumShipsDiv.querySelector("#NoOfShips-3sq").value),
        NumSqIs2: parseInt(NumShipsDiv.querySelector("#NoOfShips-2sq").value),
        NumSqIs1: parseInt(NumShipsDiv.querySelector("#NoOfShips-1sq").value),
      };
      game.numberOfShips = numOfShips;
    } else throw new Error("number of ships for the game is not a valid number");
    NumShipsDiv.id="hide"
    return game.numOfShips;
    // document.querySelector(".NumShipsDiv").id="hide"
}

async function initializeGame (game) {
    return new Promise (() => {
    startProgram.addEventListener("click", async () => {
        console.log("in startProgram Event Listener")

        // toggleHide([startProgram, playerNamesDiv])
        getGameSpecs()
        game.addPlayer(1, new Player(player1Input.value, 1))
        game.addPlayer(2, new Player(player2Input.value, 2))
        
        // remove the hide class from .secondWrapper
        if (document.querySelector(".secondWrapper").classList.contains("hide")) document.querySelector(".secondWrapper").classList.remove("hide")

        await initShipPlacement(game)
        // game.player1.renderGame()
        
        

        

    })

    gameStartBtn.addEventListener("click", async () => {
        let userInputsArr = Array.from(playerNamesDiv.querySelectorAll("input"))
        if (userInputsArr.every(elem => elem.value != "")) {
            toggleHide([playerNamesDiv])
            NumShipsDiv.id=""
            
        }
        else throw new Error("Players not submitted") 
    })

    

    

})

}

const addTableEventListeners = (game) => {
    return new Promise((resolve) => {
        game.renderGame()
        let gameBoards = body.querySelectorAll("table")
        let flag = false
        for (let table of Array.from(gameBoards)) {
            if (table === game.otherPlayer.boardDOM){
                const otherTable = Array.from(gameBoards).filter((table)=> table!==game.turn.boardDOM)
                game.removeOtherListener()// remove the evenlisteners from the other table
                table.addEventListener("click", (e) =>{
                    console.log("adding listener to", table)
                    e.preventDefault()
                    console.log(e)
                    if (e.target.nodeName == "TD") {
                        if ( -1 < parseInt(e.target.id) < 100) {
                            console.log("in L104")
                            const affectedPlayer = e.target.closest("table").classList.item(0)[1]
                            const move= [affectedPlayer, e.target]
                            console.log(move)
                            game.registerMove(move)
                            
                        }
                    }
                    console.log("in L112")
                    game.turn.hideAllTables()
                    
                })
                if (!flag) { // just want to make sure i only switchTurns once as i loop over the tables
                    console.log("in flag condition")
                    game.switchTurns();
                    flag=true
                }
                dispTop(`Player-${game.turn.num}'s Turn - Enemy Board:`)
                game.renderGame()
                dispBelow(`Player-${game.turn.num}'s own Board`)
            }
        }
        startGameLoop(game) 
        resolve()
    
    })
}

export {initializeGame, addTableEventListeners}