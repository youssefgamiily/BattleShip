const gameBoard = document.getElementById("game-board");

export function renderTable () {
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
