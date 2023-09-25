'enable strict'

const startGameLoop = (game) => {
    // Player.hideAllTables() // hides all the gameBoards
    console.log(game)
    game.otherPlayer.renderGame()

}

export {startGameLoop}