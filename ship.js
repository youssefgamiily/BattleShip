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
        
        if (this.hitsTaken < this.numOfHitsToSink) this.hitsTaken ++
        else throw("ship has already sunk")
    }

}