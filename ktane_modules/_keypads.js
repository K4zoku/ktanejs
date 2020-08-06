const SYMBOLS = {
    AE: 'æ',
    BALLOON: 'Ϙ',
    COPYRIGHT: '©',
    DOUBLE_K: 'Җ',
    DRAGON: 'Ѯ',
    FILLED_STAR: '★',
    HOLLOW_STAR: '☆',
    LAMBDA: 'ƛ',
    LEFT_C: 'Ͽ',
    LETTER_A: 'Ѧ',
    LETTER_B: 'Ѣ',
    LETTER_E: 'Ӭ',
    LETTER_H: 'ϗ',
    LETTER_N: 'Ҋ',
    LETTER_Q: 'Ҩ',
    LIGHTNING: 'ϟ',
    MELTED_THREE: 'Ԇ',
    OMEGA: 'Ω',
    PARAGRAPH: '¶',
    PITCH_FORK: 'Ψ',
    PUMPKIN: "Ѽ",
    QUESTION_SIGN: '¿',
    RIGHT_C: 'Ͼ',
    SIX: 'б',
    SMILEY_FACE: 'ټ',
    SPIDER: 'Ѭ',
    TRACKS: '҂'
};
const GROUPS = [
    [
        SYMBOLS.BALLOON,
        SYMBOLS.LETTER_A,
        SYMBOLS.LAMBDA,
        SYMBOLS.LIGHTNING,
        SYMBOLS.SPIDER,
        SYMBOLS.LETTER_H,
        SYMBOLS.LEFT_C
    ],
    [
        SYMBOLS.LETTER_E,
        SYMBOLS.BALLOON,
        SYMBOLS.LEFT_C,
        SYMBOLS.LETTER_Q,
        SYMBOLS.HOLLOW_STAR,
        SYMBOLS.LETTER_H,
        SYMBOLS.QUESTION_SIGN
    ],
    [
        SYMBOLS.COPYRIGHT,
        SYMBOLS.PUMPKIN,
        SYMBOLS.LETTER_Q,
        SYMBOLS.DOUBLE_K,
        SYMBOLS.MELTED_THREE,
        SYMBOLS.LAMBDA,
        SYMBOLS.HOLLOW_STAR
    ],
    [
        SYMBOLS.SIX,
        SYMBOLS.PARAGRAPH,
        SYMBOLS.LETTER_B,
        SYMBOLS.SPIDER,
        SYMBOLS.DOUBLE_K,
        SYMBOLS.QUESTION_SIGN,
        SYMBOLS.SMILEY_FACE
    ],
    [
        SYMBOLS.PITCH_FORK,
        SYMBOLS.SMILEY_FACE,
        SYMBOLS.LETTER_B,
        SYMBOLS.RIGHT_C,
        SYMBOLS.PARAGRAPH,
        SYMBOLS.DRAGON,
        SYMBOLS.FILLED_STAR ],
    [
        SYMBOLS.SIX,
        SYMBOLS.LETTER_E,
        SYMBOLS.TRACKS,
        SYMBOLS.AE,
        SYMBOLS.PITCH_FORK,
        SYMBOLS.LETTER_N,
        SYMBOLS.OMEGA
    ]
];

module.exports.SYMBOLS = SYMBOLS;

module.exports.sort = function (symbols) {
    let result = [];
    GROUPS.forEach((group) => {
        if (group.contains(symbols)) {
            group.forEach((elem) => {
                if (symbols.includes(elem)) {
                    result.push(elem);
                }
            });
        }
    });
    return result;
}

Array.prototype.contains = function(array) {
    return array.every(function(item) {
        return this.indexOf(item) !== -1;
    }, this);
}