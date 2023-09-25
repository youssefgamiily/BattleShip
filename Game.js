import { markers } from "./svgMarkers.js";
class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.round = 0;
    this.turn = this.player1;
    this.otherPlayer = this.player2;
    this.winner = null;
    this.movements = [];
    this.markers = markers;
    this.numberOfShips = null;
  }

  isWin() {
    if (this.player1.gameBoard.ships.length === 0) {
      this.winner = "player2";
      return true;
    } else if (this.player2.gameBoard.ships.length === 0) {
      this.winner = "player1";
      return true;
    }
    return false;
  }
  addPlayer(playerNum, playerInstance) {
    if (playerNum == 1) {
      this.player1 = playerInstance;
      this.turn = this.player1;
    } else if (playerNum == 2) {
      this.player2 = playerInstance;
      this.otherPlayer = this.player2;
    } else throw new Error("this is not a valid playerNum");
  }

  switchTurns() {
    if (this.turn == this.player1) {
      this.turn = this.player2;
      this.otherPlayer = this.player1;
    } else {
      this.turn = this.player1;
      this.otherPlayer = this.player2;
    }
  }
  receiveAttackedUser(cell) {
    this.otherPlayer.renderGame();
  }
  renderInSideBar(move) {
    const sideBar = document.querySelector(".sideBar");
    let attacker;
    if (parseInt(move[0]) == 1) {
      attacker = 2;
    } else attacker = 1;
    sideBar.insertAdjacentHTML(
      "afterbegin",
      `<div class="move"><h1>attacker:"player: ${attacker}"</h1>  <h1>"hits: #${move[1].id}"</h1></div>`
    );
  }
  getPlayer(playerNum) {
    const retVal = this.player1.num == playerNum ? this.player1 : this.player2;
    return retVal;
  }
  logMove(move) {
    let [affectedPlayer, hitCell] = move;
    affectedPlayer = this.getPlayer(affectedPlayer);
    console.log(affectedPlayer);
    if (
      !affectedPlayer.gameBoard.gameBoard[parseInt(hitCell.id[0])][
        parseInt(hitCell.id[1])
      ].hit == true
    ) {
      this.movements.push(move);
      this.renderInSideBar(move);
    }
  }
  markmove(move) {
    let [affectedPlayer, hitCell] = move;
    affectedPlayer = this.getPlayer(affectedPlayer);
    console.log(affectedPlayer);
    console.log(move);
    let outcome = affectedPlayer.gameBoard.receiveAttack(
      hitCell.id[0],
      hitCell.id[1]
    ); // this is the affected player
    console.log(`outcome is ${outcome}`);
    if (outcome == 1) {
      // if ship sunk
      hitCell.insertAdjacentHTML("afterbegin", this.markers.tagetSunk);
    } else if (outcome == 2) {
      // if ship damaged returns 2
      hitCell.insertAdjacentHTML("afterbegin", this.markers.targetDamaged);
    } else if (outcome == 3) {
      // if no ship hit returns 3
      hitCell.insertAdjacentHTML("afterbegin", this.markers.targetMissed);
    } else throw new Error("unexpected Outcome from gameBoard.receiveAttack()");
  }
  registerMove(move) {
    //move = [1 (player1 is affected), hit cell element]
    let [affectedPlayer, hitCell] = move;
    this.logMove(move);
    this.markmove(move);
  }
}

export { Game };
