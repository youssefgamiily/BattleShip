'enable strict'

const tablesLabels = document.querySelector("#tables-label")

const startGameLoop = (game) => {
    // Player.hideAllTables() // hides all the gameBoards
    console.log(game)
    tablesLabels.classList.remove("hide")
    game.renderGame()

    // 
}

export {startGameLoop}