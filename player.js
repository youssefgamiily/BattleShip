import { gameBoard } from "./gameBoard.js"

class Player {
    constructor(name, num) {
        this.name = name
        this.num = num
        this.numberOfTurns = 0
        this.numberOfHits = 0
        this.numberOfMissed = 0
        this.gameBoard = new gameBoard()
        this.score = 0
    }

    attack (enemy, square) { // square is "00"
        const x = parseInt (square[0])
        const y = parseInt(square[1])
        console.log("parseInt(square) is : ")
        console.log(parseInt(square))
        if( -1 < parseInt(square) < 100) {
            console.log("going to receiveAttack()")
            enemy.gameBoard.receiveAttack(x,y)
        }
        else throw("attacking out of bounds cell")
        if(enemy.gameBoard.ifCellHit() === true) return true
        
    }
    hideAllTables ()  {
        for (let table of Array.from(document.querySelectorAll("table"))) {
            table.classList.add("hide")
        }
    }
    renderGame () {
        // this.hideAllTables()
            console.log("in renderGame")
            const gameBoardHTML = document.querySelector(`.p${this.num}`)
            console.log(gameBoardHTML)
            for (let row = 0; row < 10; row++) {
                const newRow = document.createElement("tr");
    
                for (let col = 0; col < 10; col++) {
                    const cellId = `${row}${col}`;
                    const newCell = document.createElement("td");
                    newCell.id = cellId;
                    newCell.textContent = "";
                    newRow.appendChild(newCell);
                }
    
                gameBoardHTML.appendChild(newRow);
            }         
    }
}

export {Player}