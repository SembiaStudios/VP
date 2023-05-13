// Firebase-Konfiguration
var firebaseConfig = {
  apiKey: "AIzaSyD6h0dpMnNF2_QN0Vl4k0ipou13O4lV-fQ",
  authDomain: "languagelab---quiz.firebaseapp.com",
  projectId: "languagelab---quiz",
  appId: "1:478036064155:web:b22feda4d0cb526bf3133e"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// DOM-Elemente
var loginContainer = document.getElementById("login-container");
var quizContainer = document.getElementById("quiz-container");
var scoreboardContainer = document.getElementById("scoreboard-container");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var errorMessage = document.getElementById("error-message");
var questionElement = document.getElementById("question");
var choiceElements = document.querySelectorAll("#choices button");
var scoreElement = document.getElementById("score");
var scoreboardElement = document.getElementById("scoreboard");

// Benutzer registrieren
function register() {
    var email = emailInput.value;
    var password = passwordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        showQuiz();
    })
    .catch(function(error) {
        errorMessage.textContent = error.message;
    });
}

// Google-Anmeldung
function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
    .then(function(result) {
        showQuiz();
    })
    .catch(function(error) {
        errorMessage.textContent = error.message;
    });
}

// Benutzer abmelden
function logout() {
    auth.signOut()
    .then(function() {
        showLogin();
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Quiz anzeigen
function showQuiz() {
    loginContainer.style.display = "none";
    scoreboardContainer.style.display = "none";
    quizContainer.style.display = "block";
    scoreElement.textContent = "Punktzahl: 0";

    showQuestion();
}

// Fragen und Antworten
var questions = [
    {
        question: "Was bedeutet 'Hallo' auf Englisch?",
        choices: ["Hello", "Goodbye", "Thank you", "Yes"],
        correctAnswer: 0
    },
    {
        question: "Wie sagt man 'Danke' auf Spanisch?",
        choices: ["Gracias", "Por favor", "Hola", "Adiós"],
        correctAnswer: 0
    },
    // Fügen Sie hier weitere Fragen hinzu
];

var currentQuestionIndex = 0;
var score = 0;

// Frage anzeigen
function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    for (var i = 0; i < choiceElements.length; i++) {
        choiceElements[i].textContent = currentQuestion.choices[i];
    }
}

// Antwort überprüfen
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

// Quiz beenden
function endQuiz() {
    var user = auth.currentUser;

    quizContainer.style.display = "none";
    scoreboardContainer.style.display = "block";

    // Punktzahl in der Datenbank speichern
    db.collection("scores").add({
        user: user.uid,
        score: score
    })
    .then(function() {
        showScoreboard();
    })
.catch(function(error) {
    console.log(error);
});
}

// Scoreboard anzeigen
function showScoreboard() {
    scoreboardElement.innerHTML = "";

    db.collection("scores").orderBy("score", "desc").limit(10).get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        var scoreData = doc.data();
        var li = document.createElement("li");
        li.textContent = scoreData.score;
        scoreboardElement.appendChild(li);
    });
})
.catch(function(error) {
    console.log(error);
});
}

// Benutzerstatus überprüfen
auth.onAuthStateChanged(function(user) {
    if (user) {
        showQuiz();
    } else {
        showLogin();
    }
});

// Anmeldeformular anzeigen
function showLogin() {
    loginContainer.style.display = "block";
    quizContainer.style.display = "none";
    scoreboardContainer.style.display = "none";
    emailInput.value = "";
    passwordInput.value = "";
    errorMessage.textContent = "";
}

showLogin();