var startPage = document.querySelector(".start-page"); // start page elements
var quizPage = document.querySelector(".quiz-page"); // quiz page elements
var scorePage = document.querySelector(".score-page"); // final score page elements
var highscoresPage = document.querySelector(".highscores-page"); // highscores page elements

// hide non-start-page elements to begin
quizPage.style.visibility = "hidden";
scorePage.style.visibility = "hidden";
highscoresPage.style.visibility = "hidden";

var timerEl = document.querySelector(".timer"); // timer element

var startButton = document.querySelector(".start-button"); // start button
var answerButtons = document.querySelector(".quiz-page"); // PARENT of answer buttons
var submitScoreButton = document.querySelector(".submit-score-button"); // submit score button
var goBackButton = document.querySelector(".go-back-button"); // go back button
var clearHighscoresButton = document.querySelector(".clear-highscores-button"); // clear scores button

var timerId = 0; // declare timerId globally so we can use clearInterval anywhere
var timerVal = 0; // declare timerVal globally so we can adjust it anywhere
var questionIndex = 0; // declare questionIndex globally so we can increment it every time we answer a question; start at 0 to start with first question

//array of question objects with question, choices, and correct answer in strings
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

function startQuiz() {
    startPage.style.visibility = "hidden"; // hide start page
    quizPage.style.visibility = "visible"; // show quiz page
    
    timerVal = 60; // give players 1 minute
    timerId = setInterval(function(){ // begin countdown and save id
        timerVal --; // decrement timer
        timerEl.textContent = "Time: " + timerVal; // display timer
        if (timerVal <= 0) { // negative values possible thanks to penalty for wrong answers!!
            endQuiz(); // ends quiz
        }
    }, 1000); // run above function every 1000 milliseconds

    questionIndex = 0 // reset to 0 for attempts after the first

    getQuestion(questionIndex); // load first question
}

// function for populating questions
function getQuestion(n) {
    questionEl = document.querySelector(".quiz-page").children[0]; //saves location of question element
    questionEl.textContent = questions[n].question; // populates nth question

    for(i=1; i<=4; i++) { // four times for four choices
        answerEl = document.querySelector(".quiz-page").children[i]; // saves location of i-th answer button
        answerEl.textContent = questions[n].choices[i-1]; // populates answer choices
    }
}

// function for ending quiz
function endQuiz() {
    clearInterval(timerId); // stops countdown timer
    timerEl.textContent = "Time: " + timerVal; // displays final timer/score in corner

    quizPage.style.visibility = "hidden"; // hide quiz page
    scorePage.style.visibility = "visible"; // show final score page

    var finalScoreMessage = document.querySelector(".final-score-message"); // saves location of final score message
    finalScoreMessage.textContent = "Your final score is " + timerVal; // display message with score (timerVal)
}

// function for saving score
function saveScore() {
    var initials = document.querySelector(".initials").value; // saves input from initials form to variable
    
    if (initials == "") { // if player leaves initials field blank...
        alert("Please provide initials!") // alert them that they should provide something
    } else{ // otherwise...
        scorePage.style.visibility = "hidden"; // hide final score page
        highscoresPage.style.visibility = "visible"; //show highscores page

        // player object storing initials and score
        var player = {
            playerName: initials,
            playerScore: timerVal
        };

        if (localStorage.getItem("highscores") === null || localStorage.getItem("highscores") === "cleared") { //if no scores saved locally yet
            var storedHighscores = [player]; 
        } else { 
            var storedHighscores = JSON.parse(localStorage.getItem("highscores")); 
            storedHighscores.push(player);
        }

        localStorage.setItem("highscores", JSON.stringify(storedHighscores)); 

        for (i=0; i<storedHighscores.length; i++) {
            var li = document.createElement("li");
            li.textContent = storedHighscores[i].playerName + ": " + storedHighscores[i].playerScore;
            highscoresPage.children[1].appendChild(li);
        }
    }
}

function goBack() {
    highscoresPage.style.visibility = "hidden"; // hide highscores page

    var scoresList = document.querySelector(".scores-list");
    scoresList.innerHTML = ""; // remove all scores from highscores list so that it's clean on repeat attempts

    startPage.style.visibility = "visible"; // show start page again
}

// clears saved scores from local storage and html
function clearHighscores() {
    localStorage.setItem("highscores", "cleared"); // clears local storage
    
    var scoresList = document.querySelector(".scores-list");
    scoresList.innerHTML = ""; // clears html elements
}

startButton.addEventListener("click", startQuiz); // click event listener for start button
answerButtons.addEventListener("click", function(event) { // click event listener for quiz answer buttons
    var element = event.target;

    if (element.matches("button")) { // check that user actually clicked a button
        var chosenAnswer = element.textContent; // saves string value with chosen answer
        var correctAnswer = questions[questionIndex].answer; //saves string value of CORRECT answer

        if (chosenAnswer !== correctAnswer) { // if wrong...
            timerVal -= 10; // incorrect answer penalty
            // display "Incorrect" message
        } else { // if right...
            // display "Correct" message
        }

        questionIndex++;
        if (questionIndex < questions.length) { //if there are questions left...
            getQuestion(questionIndex); // change to next question
        } else { // if no questions left...
            endQuiz(); //ends quiz and goes to final score page
        }
    }
});
submitScoreButton.addEventListener("click", saveScore); // click event listener for score submit button
goBackButton.addEventListener("click", goBack); // click event listener for go back button
clearHighscoresButton.addEventListener("click", clearHighscores); // click event listener for clear highscores button