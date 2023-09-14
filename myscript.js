import { initializeGame } from './initializeGame.js'
import {Game} from './Game.js'

const toggleHide = (elemArr) => {
    for (let elem of elemArr) {
        elem.classList.toggle("hide")
    }
}

let game = new Game()
initializeGame(game)
window.game = game

export {toggleHide}