var questions = [
    { question: "Was bedeutet 'Platzhalter' auf Englisch?", choices: ["Placeholder", "AB", "A", "EF"], correctAnswer: 0 },
    { question: "Was bedeutet 'Platzhalter' auf Englisch?", choices: ["Dg", "Placeholder", "Ho", "Te"], correctAnswer: 1 },
    { question: "Was bedeutet 'Platzhalter' auf Englisch?", choices: ["Do", "Ct", "Placeholder", "Tr"], correctAnswer: 2 },
    // Weitere Fragen hinzufügen...
];

var currentQuestionIndex = 0;
var score = 0;

function showQuestion() {
    var questionElement = document.getElementById("question");
    var choiceElements = document.querySelectorAll("#choices button");
    var currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    for (var i = 0; i < choiceElements.length; i++) {
        choiceElements[i].textContent = currentQuestion.choices[i];
    }
}

function checkAnswer(choiceIndex) {
    var currentQuestion = questions[currentQuestionIndex];

    if (choiceIndex === currentQuestion.correctAnswer) {
        score++;
        alert("Richtig!");
    } else {
        alert("Falsch!");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    var questionContainer = document.getElementById("question-container");
    var choicesContainer = document.getElementById("choices");
    var scoreElement = document.getElementById("score");

    questionContainer.style.display = "none";
    choicesContainer.style.display = "none";
    scoreElement.textContent = "Punktzahl: " + score;
    scoreElement.style.display = "block";
}

showQuestion();
