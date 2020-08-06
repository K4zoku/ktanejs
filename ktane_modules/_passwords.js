const _WORD_LIST = [
    "about", "after", "again", "below", "could",
    "every", "first", "found", "great", "house",
    "large", "learn", "never", "other", "place",
    "plant", "point", "right", "small", "sound",
    "spell", "still", "study", "their", "there",
    "these", "thing", "think", "three", "water",
    "where", "which", "world", "would", "write"
];

module.exports.find = function (chars) {
        let result = [];
        _WORD_LIST.forEach((word) =>  {
            let found = recursiveFind(chars, word, 0, chars.length);
            if (found) result.push(found);
        });
        return result;
}

function recursiveFind(chars, word, i, max) {
    if (i >= max) return word;
    if (chars[i].toLowerCase().includes(word.split("")[i])) return recursiveFind(chars, word, i+1, max);
    else return false;
}