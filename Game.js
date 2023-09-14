class Game {
    constructor () {
        this.player1 = null
        this.player2 = null
        this.round = 0
        this.turn = this.player1
        this.otherPlayer = this.player2
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
            this.turn = this.player1
        } else if (playerNum == 2) {
            this.player2 = playerInstance
            this.otherPlayer = this.player2
        }
        else throw new Error("this is not a valid playerNum")
    }

    switchTurns () {
        if (this.turn == this.player1) {
            this.turn = this.player2
            this.otherPlayer = this.player1
        }
        else {
            this.turn = this.player1
            this.otherPlayer = this.player2
        }
    }
    receiveUserHit(cell) { // cell is 00
        console.log(this)
        console.log(this.otherPlayer)
        console.log(this.turn)
        this.otherPlayer.renderGame()
    
    }
}

export {Game}