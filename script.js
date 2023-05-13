var words = [
    { german: "Hund", english: "dog" },
    { german: "Katze", english: "cat" },
    { german: "Haus", english: "house" },
    // Weitere Vokabeln hinzufügen...
];

var currentWordIndex = 0;

function showWord() {
    document.getElementById("germanWord").textContent = words[currentWordIndex].german;
    document.getElementById("englishWord").textContent = words[currentWordIndex].english;
}

function flipCard() {
    var flashcard = document.getElementById("flashcard");
    if (flashcard.style.transform === "rotateY(180deg)") {
        flashcard.style.transform = "rotateY(0deg)";
    } else {
        flashcard.style.transform = "rotateY(180deg)";
    }
}

function showNextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    showWord();
    document.getElementById("flashcard").style.transform = "rotateY(0deg)";
}

showWord();
