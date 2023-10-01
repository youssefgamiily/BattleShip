import { parseStringToArrays, toggleHide } from "./toggleHide.js";
import { Ship } from "./ship.js";
import { startGameLoop } from "./gameLoop.js";
import { addTableEventListeners } from "./initializeGame.js";

const topDiv = document.querySelector(".top-disp");
let body = document.querySelector("body");
const gameDiv = document.querySelector(".gameDiv");
let placeShipDiv;
let submitShipPositionsBtn;

const formShipPositionsDiv = (game) => {
  const HTML = `<div class='ShipPlacementWrapper'><div class="placeShipDiv">
  <label for="4sq">Enter positions of 4 sq ships (#${game.numberOfShips.NumSqIs4})</label>
  <input
    type="text"
    id="4sq"
    placeholder="[00, 01, 02, 03], [85,86,87,88]-- 00 -> 0th row and 0th column"
  />
  <label for="3sq">Enter positions of 3 sq ships (#${game.numberOfShips.NumSqIs3})</label>
  <input
    type="text"
    id="3sq"
    placeholder="[00, 01, 02], [10,11,12]-- 00 -> 0th row and 0th column"
  />
  <label for="2sq">Enter positions of 2 sq ships(#${game.numberOfShips.NumSqIs2}) </label>
  <input
    type="text"
    id="2sq"
    placeholder="[00, 01], [11,12]-- 00 -> 0th row and 0th column"
  />
  <label for="1sq">Enter positions of 1 sq ships (#${game.numberOfShips.NumSqIs1})</label>
  <input
    type="text"
    id="1sq"
    placeholder="[00],[11]-- 00 -> 0th row and 0th column"
  /></div>
  <div class="buttonWrapper"><button type="button" id="submitShipPositions">Submit</button></div>
  </div></div>`;
  gameDiv.insertAdjacentHTML("beforeend", HTML);
  placeShipDiv = document.querySelector(".placeShipDiv");
  submitShipPositionsBtn = placeShipDiv.parentNode.querySelector(
    "#submitShipPositions"
  );
};

const dispTop = (message, additionalElements = []) => {
  if (topDiv.parentNode.classList.contains("hide")) {
    topDiv.parentNode.parentNode.classList.remove("hide");
  }
  if (topDiv.parentNode.querySelector(".disp-bel"))
    topDiv.parentNode.querySelector(".disp-bel").remove();
  const heading = document.createElement("h3");
  heading.id = "temp-header";
  heading.insertAdjacentHTML("beforeend", message);
  topDiv.innerHTML = "";
  topDiv.insertAdjacentElement("afterbegin", heading);
  for (const element of additionalElements) {
    topDiv.insertAdjacentElement("beforeend", element);
  }
};

const dispTopRemove = () => {
  if (topDiv) topDiv.remove();
};

function getShipPositions(game, guide) {
  // by me
  return new Promise(() => {
    const shipPositions = Array.from(placeShipDiv.querySelectorAll("input"));
    for (let input of shipPositions) {
      let id = parseInt(input.id[0]);
      const Value = parseStringToArrays(input.value);
      for (let element of Value) {
        // element should be ['']
        game.turn.gameBoard.placeShip(new Ship(id, id), element);
      }
    }
  });
}

function handlePlayer(int, game) {
  console.log(`in handlePlayer with int ${int}`);
  let message =
    int == 1
      ? "Player-1, please enter your ship positions below"
      : "Player-2, please enter your ship positions below";
  dispTop(message);
  console.log(`after dispTop, topDiv now is: `, topDiv);
  formShipPositionsDiv(game);
}

let buttonClicked;
let turn1 = true;
let turn2 = false;

let switchTurns = () => {
  turn1 = !turn1;
  turn2 = !turn2;
};

const attachListener = (clearFormInputs) => {
  submitShipPositionsBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    buttonClicked = true;
    getShipPositions(game, game.turn);
    let existingShipPlacementWrapper = document.querySelector(
      ".ShipPlacementWrapper"
    );

    if (turn1) {
      clearFormInputs(existingShipPlacementWrapper);
      game.switchTurns();
      switchTurns();
      dispTop(
        `Player-${game.turn.num}, please enter your ship positions below`
      );
    } else if (turn2) {
      if (existingShipPlacementWrapper) existingShipPlacementWrapper.remove();
      dispTop("");
      game.switchTurns();
      switchTurns();
      addTableEventListeners(game);
    }
  });
};

const clearFormInputs = (form) => {
  console.log("in clearFormInputs");
  const inputsArr = Array.from(form.querySelectorAll("input"));
  inputsArr.forEach((elem) => (elem.value = ""));
  console.log(inputsArr);
};

async function initShipPlacement(game) {
  handlePlayer(game.turn.num, game);
  attachListener(clearFormInputs);
  // At this point, both players have entered ship positions, and you can start the game.
}

export { dispTop, initShipPlacement };
