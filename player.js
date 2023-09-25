import { gameBoard } from "./gameBoard.js";

class Player {
  constructor(name, num) {
    this.name = name;
    this.num = num;
    this.numberOfTurns = 0;
    this.numberOfHits = 0;
    this.numberOfMissed = 0;
    this.gameBoard = new gameBoard();
    this.boardDOM = this.formDOMTable(this.gameBoard);
    console.log(this.boardDOM);
    this.score = 0;
  }
  formDOMTable(gameboard) {
    const tableElement = document.createElement("table");
    const tbodyElement = document.createElement("tbody");
    tableElement.id = "game-board";
    tableElement.classList.add(`p${this.num}`);
    tableElement.classList.add(`hide`);
    tableElement.id = `${this.num}`;

    for (let row = 0; row < 10; row++) {
      const newRow = document.createElement("tr");

      for (let col = 0; col < 10; col++) {
        const cellId = `${row}${col}`;
        const newCell = document.createElement("td");
        newCell.id = cellId;
        newCell.textContent = "";
        newRow.appendChild(newCell);
      }

      tbodyElement.appendChild(newRow);
    }

    tableElement.appendChild(tbodyElement);
    document.body.querySelector(".gameDiv").appendChild(tableElement);
    return tableElement;
  }
  attack(enemy, square) {
    // square is "00"
    const x = parseInt(square[0]);
    const y = parseInt(square[1]);
    console.log("parseInt(square) is : ");
    console.log(parseInt(square));
    if (-1 < parseInt(square) < 100) {
      console.log("going to receiveAttack()");
      enemy.gameBoard.receiveAttack(x, y);
    } else throw "attacking out of bounds cell";
    if (enemy.gameBoard.ifCellHit() === true) return true;
  }
  hideAllTables() {
    const tables = Array.from(document.querySelectorAll("table"));

    for (let table of tables) {
      console.log(table);
      if (!table.classList.contains("hide")) {
        table.classList.add("hide");
      }
    }
  }
  renderGame() {
    this.hideAllTables();
    for (let Class of this.boardDOM.classList) {
      if (this.boardDOM.classList.contains("hide"))
        this.boardDOM.classList.remove("hide");
    }
    return this.boardDOM;
  }
}

export { Player };
