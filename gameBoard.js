import {Ship} from './ship.js'
class gameBoard {
    constructor(){
        this.gameBoard = this.initGameBoard()
    }
    initGameBoard () {
        let board = []
        for (let i=0; i<10; i++) {
            let boardRow = []
            for (let j=0; j<10; j++) {
                boardRow.push({
                    hit: false,
                    ship: null
                })
            board.push(boardRow)
            }
        }
        return board
    }

    isArrAdjacent(arr) {
        // Sort the coordinates to make it easier to check adjacency
        arr.sort();
        
        for (let i = 0; i < arr.length - 1; i++) {
            const currentCell = arr[i];
            const nextCell = arr[i + 1];
        
            const [x1, y1] = [parseInt(currentCell[0]), parseInt(currentCell[1])];
            const [x2, y2] = [parseInt(nextCell[0]), parseInt(nextCell[1])];
        
            // Check if the cells are horizontally or vertically adjacent
            if (
            (x1 === x2 && Math.abs(y1 - y2) === 1) || // Vertical adjacency
            (y1 === y2 && Math.abs(x1 - x2) === 1)    // Horizontal adjacency
            ) {
            continue; // Continue checking the next pair
            } else {
            return false; // Not adjacent
            }
        }
        return true; // All cells are adjacent
        
    }
    isOutOfBounds (arr) {
        for (let elem of arr) {
            if (elem.length !== 2) return true
            let int = parseInt(elem)
            if (int<0 || int>99) return true
        }
        return false
    }
    placeShip(shipToBePlaced, arr) {
        if (shipToBePlaced.length > arr.length) { 
            console.log("in case 1")
            throw( new Error ("placing long ship on one square"))
        }
        if (!this.isArrAdjacent(arr)) { 
            console.log("in case 2")
            throw("placing ship on non-adjacent squares")
        }
        if (shipToBePlaced > 5) { 
            console.log("in case 3")
            throw("ship length exceeded maximum length")
        }
        if (this.isOutOfBounds(arr)) {
            console.log("in case 4")
            throw("error placing ship out of bounds")
        }
        for (let cell of arr) { // ex. cell is '02'
            let row = parseInt(cell[0])
            let col = parseInt(cell[1])
            this.gameBoard[row][col].ship = shipToBePlaced
        }
    return '1'
    }

    ifShipExists(x,y) {
        if (this.gameBoard[x][y].ship != null) return true
        else return false
    }
    ifCellHit(x,y){
        if (!this.isOutOfBounds([`${x}${y}`])) {
            console.log(this.gameBoard[x][y].hit)
            return this.gameBoard[x][y].hit
        }
        else throw("this Cell is out of Bounds")
    }
    receiveAttack (x,y) {
        if (this.isOutOfBounds[`${x}${y}`]) throw ("attacking place out of bounds")
        if (this.gameBoard[x][y].hit == true) throw("this square has been hit before")
        this.gameBoard[x][y].hit=true
        if(this.gameBoard[x][y].ship !== null) this.gameBoard[x][y].ship.hit()
    }

    getShip (x,y) {
        return this.gameBoard[x][y].ship
    }
}

export {gameBoard}

/* Loop to create the gameBoard
    let board = []
    for (i=0; i<10; i++) {
        let boardRow = []
        for (j=0; j<10; j++) {
            boardRow.push({
                hit: false,
                ship: null
            })
        board.push(boardRow)
        }
    }
*/