import {toggleHide} from './myscript.js'
const hideAllTables = () => {
    for (let table of Array.from(document.querySelectorAll("table"))) {
        table.classList.add("hide")
    }
}

export function renderTable (playerNum) {
    console.log("in renderTable")
    hideAllTables()
    if (playerNum ==1 || playerNum == 2) {
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
    }
    else throw new Error("invalid Player Number given to renderTable()")
    console.log("leaving renderTable")
}
