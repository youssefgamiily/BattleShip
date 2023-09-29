import { initializeGame } from "./initializeGame.js";
import { Game } from "./Game.js";
import { dispTop } from "./shipPlacement.js";
import { addTableEventListeners } from "./initializeGame.js";

const body = document.querySelector("body") 

let game = new Game();
window.game = game;
// initializeShip()
await initializeGame(game);

