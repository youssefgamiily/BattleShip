export class Ship {
    constructor(length, numOfHitsToSink) {
        this.length = length
        this.numOfHitsToSink = numOfHitsToSink
        this.sunk = false
        this.hitsTaken = 0
    }
    
    isSunk () {
        return this.sunk
    }

    hit() {
        this.hitsTaken ++
    }

}