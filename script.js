const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Hyperlinks and Text Markup Language", correct: false },
        { text: "Home Tool Markup Language", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Sheets", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      question: "What does JS stand for?",
      answers: [
        { text: "JavaScript", correct: true },
        { text: "JavaSource", correct: false },
        { text: "JustScript", correct: false },
        { text: "None of the above", correct: false }
      ]
    }
  ];
  
  const startButton = document.getElementById('start-button');
  const questionContainer = document.getElementById('question-container');
  const timerContainer = document.getElementById('timer-container');
  const scoreContainer = document.getElementById('score-container');
  const gameOverContainer = document.getElementById('game-over-container');
  
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let score = 0;
  let timerInterval;
  
  function startQuiz() {
    startButton.classList.add('hide');
    timerInterval = setInterval(updateTimer, 1000);
    showQuestion();
  }
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = '';
    const questionElement = document.createElement('h2');
    questionElement.innerText = currentQuestion.question;
    questionContainer.appendChild(questionElement);
    currentQuestion.answers.forEach(answer => {
      const answerElement = document.createElement('button');
      answerElement.innerText = answer.text;
      answerElement.classList.add('answer');
      if (answer.correct) {
        answerElement.dataset.correct = true;
      }
      answerElement.addEventListener('click', handleAnswerClick);
      questionContainer.appendChild(answerElement);
    });
  }
  
  function handleAnswerClick(event) {
    const selectedAnswer = event.target;
    const correct = selectedAnswer.dataset.correct;
    if (correct) {
      score++;
      scoreContainer.innerText = `Score: ${score}`;
    } else {
      timeLeft -= 10;
      updateTimer();
    }
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length || timeLeft <= 0) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  function updateTimer() {
    timeLeft--;
    timerContainer.innerText = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.classList.add('hide');
    timerContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    gameOverContainer.classList.remove('hide');
    gameOverContainer.innerHTML = `
      <h2>Game Over!</h2>
      <p>Your final score is ${score}.</p>
      <label for="initials">Enter your initials:</label>
      <input type="text" id="initials">
      <button onclick="saveScore()">Save</button>
    `;
  }
  
  function saveScore() {
    const initialsInput = document.getElementById('initials');
    const initials = initialsInput.value.trim();
    if (initials) {
      const highScores = JSON.parse(localStorage.getItem('high')) || [];

    }}