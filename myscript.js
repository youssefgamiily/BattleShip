import { initializeGame } from "./initializeGame.js";
import { Game } from "./Game.js";
import { dispTop } from "./shipPlacement.js";

const body = document.querySelector("body") 

let game = new Game();
window.game = game;
// initializeShip()
await initializeGame(game);

const addTableEventListeners = (game) => {
    let gameBoards = body.querySelectorAll("table");
    console.log(gameBoards);
    for (let table of Array.from(gameBoards)) {
      table.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);
        if (e.target.nodeName == "TD") {
          if (-1 < parseInt(e.target.id) < 100) {
            const affectedPlayer = e.target.closest("table").classList.item(0)[1];
            const move = [affectedPlayer, e.target];
            console.log(move);
            game.registerMove(move);
          }
        }
      });
    }

    game.turn.hideAllTables()
    game.switchTurns()
};

const startGame = (game) => {
    addTableEventListeners(game)
    game.otherPlayer.boardDOM.classList.remove("hide")
}
console.log("in L29")




export {startGame}