import { gameBoard } from "./gameBoard.js"

class Player {
    constructor(name) {
        this.name = name
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
}

export {Player}