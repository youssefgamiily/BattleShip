import {Ship} from '../ship.js'
import {gameBoard} from '../gameBoard.js'
import {Player} from '../player.js'

/*testing Ship*/
it("creating a Ship object", () => {
    let ship1 = new Ship(2, 3) // length 2 and 3 hits to sink
    expect (typeof ship1).toBe("object")
})

it ("testing ship hit", () => {
    let ship1 = new Ship (2,3)
    ship1.hit()
    expect(ship1.hitsTaken).toBe(1)
})

it ("testing ship isSunk()", () => {
    let ship1 = new Ship (2,1)
    ship1.hit()
    expect(ship1.isSunk()).toBe(true)
})

/* Testing gameBoard */
it("creating a gameBoard failed", () => {
    let gameBoard1 = new gameBoard() // length 2 and 3 hits to sink
    expect (typeof gameBoard1).toBe("object")
})

it("testing ifShipExists method", () => {
    let gameBoard1 = new gameBoard()
    console.log(gameBoard1)
    gameBoard1.gameBoard[0][0].ship = new Ship (1,1)
    expect(gameBoard1.ifShipExists(0,0)).toBe(true)
})
it("testing placeShip method", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship (1,1)
    gameBoard1.placeShip(ship1, ['00'])
    expect(gameBoard1.ifShipExists(0,0)).toBe(true)
})
it("failed to place long ship on 1 square", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship (2,1)
    expect(() => gameBoard1.placeShip(ship1, ['00'])).toThrow(new Error("placing long ship on one square"))
})
it("testing placing 2 squares long ship on 2 squares", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship (2,1)
    gameBoard1.placeShip(ship1, ['00', '01'])
    expect(gameBoard1.ifShipExists(0,0)).toBe(true)
})
it("testing placing long ship on 2 non-adjacent squares", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship (2,1)
    expect(() => gameBoard1.placeShip(ship1, ['00', '66']).toThrow(new Error ("placing ship on non-adjacent squares")))
})
it("testing placing ship longer than 5 squares", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship (6,1)
    expect(() => gameBoard1.placeShip(ship1, ['00', '01', '02', '03', '04', '05']).toThrow(new Error ('ship length exceeded maximum length')))
})
it("testing placing out of bounds", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship (1,1)
    expect(() => gameBoard1.placeShip(ship1, ['100']).toThrow('error placing ship out of bounds'))
    expect(() => gameBoard1.placeShip(ship1, ['010']).toThrow('error placing ship out of bounds'))
})
it ("testing ifCellHit", () => {
    let gameBoard1 = new gameBoard()
    gameBoard1.gameBoard[0][0].hit = true
    expect(gameBoard1.ifCellHit(0,0)).toBe(true)
})
it("testing receiveAttack (on gameBoard)", () => {
    let gameBoard1 = new gameBoard()
    gameBoard1.receiveAttack(0,0)
    expect(gameBoard1.ifCellHit(0,0)).toBe(true)
})
it("testing receiveAttack (on ship)", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship(1,1)
    gameBoard1.placeShip(ship1, ['00'])
    gameBoard1.receiveAttack(0,0)
    expect(gameBoard1.gameBoard[0][0].ship.hitsTaken).toBe(1)
})
it("testing gameBoard getShip method ", () => {
    let gameBoard1 = new gameBoard()
    let ship1 = new Ship(1,1)
    gameBoard1.placeShip(ship1, ['00'])
    expect(gameBoard1.getShip(0,0)).toBe(ship1)
})

it ("testing creating player", () => {
    const player1 = new Player("joe")
    const player2 = new Player("Omar")
    expect(player1.attack(player2, "00")).toBe(Omar.gameBoard.ifCellHit(0,0))
})