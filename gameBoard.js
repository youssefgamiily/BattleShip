class gameBoard {
  constructor() {
    this.gameBoard = this.initGameBoard();
    console.log("gameBoard is");
    console.log(this.gameBoard);
    this.ships = 0;
  }
  initGameBoard() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      const boardRow = [];

      for (let j = 0; j < 10; j++) {
        boardRow.push({
          hit: false,
          ship: null,
        });
      }

      board.push(boardRow);
    }

    return board;
  }

  isArrAdjacent(arr) {
    arr.sort();

    for (let i = 0; i < arr.length - 1; i++) {
      const currentCell = arr[i];
      const nextCell = arr[i + 1];

      const [x1, y1] = [parseInt(currentCell[0]), parseInt(currentCell[1])];
      const [x2, y2] = [parseInt(nextCell[0]), parseInt(nextCell[1])];

      if (
        (x1 === x2 && Math.abs(y1 - y2) === 1) || // Vertical adjacency
        (y1 === y2 && Math.abs(x1 - x2) === 1) // Horizontal adjacency
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
  isOutOfBounds(arr) {
    for (let elem of arr) {
      if (elem.length !== 2) return true;
      let int = parseInt(elem);
      if (int < 0 || int > 99) return true;
    }
    return false;
  }
  placeShip(shipToBePlaced, arr) {
    if (shipToBePlaced.length > arr.length) {
      throw new Error("placing long ship on one square");
    }
    if (!this.isArrAdjacent(arr)) {
      throw "placing ship on non-adjacent squares";
    }
    if (shipToBePlaced > 5) {
      throw "ship length exceeded maximum length";
    }
    if (this.isOutOfBounds(arr)) {
      throw "error placing ship out of bounds";
    }
    for (let cell of arr) {
      // ex. cell is '02'
      let row = parseInt(cell[0]);
      let col = parseInt(cell[1]);
      this.gameBoard[row][col].ship = shipToBePlaced;
      this.ships++;
    }
    return "1";
  }

  ifShipExists(x, y) {
    if (this.gameBoard[x][y].ship != null) return true;
    else return false;
  }
  ifCellHit(x, y) {
    if (!this.isOutOfBounds([`${x}${y}`])) {
      return this.gameBoard[x][y].hit;
    } else throw "this Cell is out of Bounds";
  }
  receiveAttack(x, y) {
    console.log(x, y);
    x = parseInt(x);
    y = parseInt(y);
    console.log(x, y);
    if (this.isOutOfBounds[`${x}${y}`]) throw "attacking place out of bounds";
    if (this.gameBoard[x][y].hit == true)
      throw "this square has been hit before";
    this.gameBoard[x][y].hit = true;
    if (this.gameBoard[x][y].ship !== null) {
      this.gameBoard[x][y].ship.hit();
      if (this.gameBoard[x][y].ship.isSunk()) {
        this.ships--;
        return 1;
      } else if (
        this.gameBoard[x][y].ship.hitsTaken <
        this.gameBoard[x][y].ship.numOfHitsToSink
      )
        return 2;
    } else return 3;
  }

  getShip(x, y) {
    return this.gameBoard[x][y].ship;
  }
}

export { gameBoard };
