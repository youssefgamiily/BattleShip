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
  return new Promise((resolve, reject) => {
    const shipPositions = Array.from(placeShipDiv.querySelectorAll("input"));
    if (shipPositions.every(pos => pos.value!="")) {
      for (let input of shipPositions) {
        let id = parseInt(input.id[0]);
        const Value = parseStringToArrays(input.value);
        input.id[0] // tells you which form this is ex: input.id[0] = 4 --> this is the form for the 4sq ships
        let numOfShipsSubmitted = Value.length // number of ship positions placed in the form (must equal number of ship positions in the game object)
        let numberOfShipsinGame
        switch(parseInt(input.id[0])){
          case 4:
            numberOfShipsinGame = game.numberOfShips.NumSqIs4
            break;
          case 3:
            numberOfShipsinGame = game.numberOfShips.NumSqIs3
            break;
          case 2:
            numberOfShipsinGame = game.numberOfShips.NumSqIs2
            break;
          case 1:
            numberOfShipsinGame = game.numberOfShips.NumSqIs1
            break;
        }
        console.log(numOfShipsSubmitted, numberOfShipsinGame)
        if (numberOfShipsinGame == numOfShipsSubmitted){
          console.log("here")
          for (let element of Value) {
            console.log("here")
            game.turn.gameBoard.placeShip(new Ship(id, id), element);
          }
        } else throw new Error ("number of Ships submitted is not equal number of Ships in Game")
      }
      console.log("here")
      // make the promise resolve to 1
      resolve(1)
    } else reject(-7)// make the promise resolve to -7
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
    let promiseResolved
    console.log("going into getting ship positinos()")
    let res = getShipPositions(game, game.turn); // takes the ship positions from dom and adds the ships to the game object.
    console.log("coming out of getting ship positions()")
    res.then(result => {promiseResolved = true;console.log("resolved", promiseResolved)
    // if (promiseResolved){
      let existingShipPlacementWrapper = document.querySelector(
        ".ShipPlacementWrapper"
      );

      console.log(turn1, turn2)
      if (turn1==true && turn2==false) {
        console.log("turn 1")
        clearFormInputs(existingShipPlacementWrapper);
        game.switchTurns();
        switchTurns();
        dispTop(
          `Player-${game.turn.num}, please enter your ship positions below`
        );
      } else if (turn2==true && turn1==false) {
        console.log("turn2")
        if (existingShipPlacementWrapper) existingShipPlacementWrapper.remove();
        dispTop("");
        game.switchTurns();
        switchTurns();
        addTableEventListeners(game);
      }
    // } 
    }).catch((error) => {promiseResolved=false; console.log("rejected", error, promiseResolved)
    console.log("returning -1", "turn1, turn2: ", turn1, turn2);return -1})
    });
  }

const clearFormInputs = (form) => {
  console.log("in clearFormInputs");
  const inputsArr = Array.from(form.querySelectorAll("input"));
  inputsArr.forEach((elem) => (elem.value = ""));
  console.log(inputsArr);
};

async function initShipPlacement(game) {
  handlePlayer(game.turn.num, game);
  attachListener(clearFormInputs)

  // At this point, both players have entered ship positions, and you can start the game.
}

export { dispTop, initShipPlacement };
