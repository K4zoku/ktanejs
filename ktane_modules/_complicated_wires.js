const COMPLICATED_WIRES = new Map([
    ["C", [ "W", "SW", "RSW" ]],
    ["D", [ "LW", "BSW", "BLRS" ]],
    ["S", [ "RW", "BW", "BR", "BLR" ]],
    ["P", [ "BLW", "BRS", "BLS", "BLSW" ]],
    ["B", [ "LSW", "LRW", "LRSW" ]]
]);

module.exports.check = function(wire) {
    wire = sortStr(wire.toUpperCase());
    let result = "D"; // Default is "Do not cut"
    COMPLICATED_WIRES.forEach((value, key) => {
        if (value.includes(wire)) {
            result = key;
        }
    });
    return result;
}

function sortStr(text) {
    return text.split('').sort().join('')
}