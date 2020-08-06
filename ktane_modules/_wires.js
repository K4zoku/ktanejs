const Bomb = require("../entity/bomb");
/**
 * R: Red
 * B: Blue
 * L: Black
 * Y: Yellow
 * X: Cut wire
 **/
module.exports.check = function (wires="", bomb= new Bomb()) {
    let w = wires.toUpperCase().split("")
    switch (w.length) {
        case 3:
            if (!wires.includes("R")) {
                w[1] = "X";
            } else if (moreThanOne(wires, "B")) {
                w[wires.lastIndexOf("B")] = "X";
            } else {
                w[2] = "X";
            }
            break;
        case 4:
            if (moreThanOne(wires, "R") && bomb.odd) {
                w[wires.lastIndexOf("R")] = "X";
            } else if (w[3] === "Y" && !wires.includes("R")) {
                w[0] = "X";
            } else if (exactOne(wires, "B") || moreThanOne(wires, "Y")) {
                w[3] = "X";
            } else {
                w[1] = "X";
            }
            break;
        case 5:
            if (w[4] === "L" && bomb.odd) { // L = Black
                w[3] = "X";
            } else if (!wires.includes("L")) {
                w[1] = "X";
            } else {
                w[0] = "X";
            }
            break;
        case 6:
            if (!wires.includes("Y") && bomb.odd) {
                w[2] = "X";
            } else if (!wires.includes("R")) {
                w[5] = "X";
            } else {
                w[3] = "X";
            }
            break;
        default:
            return wires;
    }
    return w.join("");
}

function moreThanOne(wires="", color="") {
    return wires.indexOf(color) < wires.lastIndexOf(color);
}

function exactOne(wires="", color="") {
    return !moreThanOne(wires, color);
}