var startDiv = document.getElementById('start')
var startButton = document.getElementById('startbutton')
var question1 = document.getElementById("question1")

var questionsArray = [
    {
        question: "a question",
        answer1: "answer",
        answer2: "answer",
        answer3: "a third answer",
        answer4: "yet one more answer",
        correct: "yet one more answer"
    },
    {
        question: "a question",
        answer1: "answer",
        answer2: "answer",
        answer3: "a third answer",
        answer4: "yet one more answer",
        correct: "yet one more answer"
    }
]

// element.textContent to change the values in the HTML to ther calues of the current question
function startsGame(){
startDiv.style.display="none"
question1.style.display="block"
}








startButton.addEventListener("click",startsGame)