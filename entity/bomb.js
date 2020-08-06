class Bomb {
    constructor(hasVowel=false, lastDigitOdd=false, hasTwoOrMoreBatteries=false, hasFRK=false, hasCar=false, hasParallelPort=false) {
        this.hasTwoOrMoreBatteries = hasTwoOrMoreBatteries;
        this.hasVowel= hasVowel;
        this.odd = lastDigitOdd;
        this.even = !lastDigitOdd;
        this.frk = hasFRK;
        this.car = hasCar;
        this.parallel = hasParallelPort;
    }
}

module.exports = Bomb;