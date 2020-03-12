const words = require("../constants/hangmanWords");

module.exports = class Hangman {
    constructor() {
        this.gallows = [
            "###########\n##        |\n##\n##\n##\n##\n##\n##",
            "###########\n##        |\n##        @\n##\n##\n##\n##\n##",
            "###########\n##        |\n##        @\n##        |\n##        |\n##\n##\n##",
            "###########\n##        |\n##        @\n##       /|\n##        |\n##\n##\n##",
            "###########\n##        |\n##        @\n##       /|\\\n##        |\n##\n##\n##",
            "###########\n##        |\n##        @\n##       /|\\\n##        |\n##       /\n##\n##",
            "###########\n##        |\n##        @\n##       /|\\\n##        |\n##       / \\\n##\n##"
        ];
        this.quesses = 6;
        this.wrongLetters = [];
        this.quessedLetters = [];
        this.word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    }

    quess(letter) {
        if (letter === "exit") return this.quesses = 0;
        if (this.quessedLetters.includes(letter.toUpperCase())) return;
        this.quessedLetters.push(letter.toUpperCase());
        if (!this.word.includes(letter.toUpperCase())) this.quesses-- && this.wrongLetters.push(letter.toUpperCase());
    }

    victory() {
        let correct = 0;
        for (const letter of this.word) {
            if (this.quessedLetters.includes(letter)) {
                correct++;
            }
        }
        return correct === this.word.length;
    }

    getWord() {
        let blank = "";
        for (const letter of this.word) {
            if (this.quessedLetters.includes(letter)) {
                blank += `${letter} `;
            } else {
                blank += `_ `;
            }
        }
        return blank;
    }

    getWrongLetters() {
        return this.wrongLetters.join(" ")
    }

    getGallows() {
        return this.gallows[this.gallows.length - this.quesses - 1];
    }
}