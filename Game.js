class Game {
    constructor () {
        this.player1 = null
        this.player2 = null
        this.round = 0
        this.turn = this.player1
        this.winner = null
    }
    isWin() {
        if (this.player1.gameBoard.ships.length === 0) {
            this.winner = 'player2';
            return true; 
        } else if (this.player2.gameBoard.ships.length === 0) {
            this.winner = 'player1';
            return true; 
        }
        return false; 
    }
    addPlayer(playerNum, playerInstance) {
        if (playerNum == 1) {
            this.player1 = playerInstance
        } else if (playerNum == 2) {
            this.player2 = playerInstance
        }
        else throw new Error("this is not a valid playerNum")
    }
    hideAllTables ()  {
        for (let table of Array.from(document.querySelectorAll("table"))) {
            table.classList.add("hide")
        }
    }
    renderGame () {
        this.hideAllTables()

            const gameBoard = document.querySelector(`.p${playerNum}`)
            for (let row = 0; row < 10; row++) {
                const newRow = document.createElement("tr");
    
                for (let col = 0; col < 10; col++) {
                    const cellId = `${row}${col}`;
                    const newCell = document.createElement("td");
                    newCell.id = cellId;
                    newCell.textContent = "";
                    newRow.appendChild(newCell);
                }
    
                gameBoard.appendChild(newRow);
            } 
        
        console.log("leaving renderTable")
    }
}

export {Game}