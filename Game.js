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
    console.log("game.turn was player-", this.turn.num)
    if (this.turn == this.player1) {
      this.turn = this.player2;
      this.otherPlayer = this.player1;
    } else {
      this.turn = this.player1;
      this.otherPlayer = this.player2;
    }
    console.log("game.turn now is player-", this.turn.num)
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

  insertHTMLafterElem(elem1, elem2) {
    elem1.insertAdjacentHTML("afterend", elem2);
  }

  renderGame() {
    // renders player's gameBoard
    const tables = document.querySelector(".tables");
    tables.innerHTML = "";

    document.querySelector("#tables-label").remove();
    const html = `<div class="wrapper" id="tables-label">
    <div class="top-disp">Your GameBoard</div>
    <div class="disp-bel">Enemy Gameboard</div>
    </div>`;
    this.insertHTMLafterElem(document.querySelector(".NumShipsDiv"), html);
    if (this.turn.boardDOM.classList.contains("hide")) this.turn.boardDOM.classList.remove("hide")
    if (this.otherPlayer.boardDOM.classList.contains("hide")) this.otherPlayer.boardDOM.classList.remove("hide")
    tables.insertAdjacentElement("beforeend", this.turn.boardDOM);
    tables.insertAdjacentElement("beforeend", this.otherPlayer.boardDOM);

    return this.boardDOM;
  }

  removeOtherListener () {
    console.log(`before removing the event listeners from:`, this.turn.boardDOM)
    // this.turn.boardDOM.replaceWith(this.turn.boardDOM.cloneNode(true));
    this.turn.boardDOM.removeEventListener("click", (e) =>{
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
      this.hideAllTables()
      
      game.switchTurns()
      dispTop(`Player-${game.turn.num}'s Turn - Enemy Board:`)
      game.renderGame()
      dispBelow(`Player-${game.turn.num}'s own Board`)
  })
    console.log(`removing event listener from`, this.turn.boardDOM)
  }
  removeGameRender() {}

  hideAllTables() {
    const tables = Array.from(document.querySelectorAll("table"));

    for (let table of tables) {
      if (!table.classList.contains("hide")) {
        table.classList.add("hide");
      }
    }
  }
}

export { Game };
