var startbutton = document.getElementById("start");
var timerElement = document.querySelector("#timer");
var questionElement = document.querySelector(".questionElement");
var questioncounter =0;
var button1 = document.getElementById('answer1')
var button2 = document.getElementById('answer2')
var button3 = document.getElementById('answer3')
var button4 = document.getElementById('answer4')
var timer=100;
var score=0
var correct = document.querySelector("#Correct");



var questions=[
{
questions:"what was the first language taught to us in class?",
choices:['JS','HTML','CSS','NUL'],
answer:'HTML',
},
{
questions:"what was the first HW assignment?",
choices:['webpage','porfolio','quiz','game'],
answer:'webpage',
},
{
 questions:"what does html stand for",
choices:['hot tomato must learn','healthy technology might last','hypertext markup language','home tile market list'],
answer:'hypertext markup language',
}, 

{
questions:"what number hw project is this",
choices:['1','2','3','4'],
answer:'4',
 },
];
startbutton.addEventListener("click", function(){

var timerInterval = setInterval(function(){
    timer--;
    timerElement.textContent = timer;
    if (timer<=0){
        clearInterval(timerInterval)
    }
}, 1000);
showQuestions();
})
function showQuestions() {
    if(questioncounter<questions.length){
questionElement.textContent=questions[questioncounter].questions
button1.textContent=questions[questioncounter].choices[0]
button2.textContent=questions[questioncounter].choices[1]
button3.textContent=questions[questioncounter].choices[2]
button4.textContent=questions[questioncounter].choices[3]
questioncounter++
}
else{
    alert(score)
}

// //     showresults
// // 


// document.querySelector('#buttons').addEventListener('click',function (questionElement){
    
// })
}

// event listener for each button and when the button is clicked
button1.addEventListener("click", function(e){
    console.log(e.target.textContent)
if(e.target.textContent==questions[questioncounter-1].answer ){
    score+=25;
  
}else{
    timer-=15;
    
}
 
 showQuestions()
}); 
button2.addEventListener("click", function(e){
    console.log(e.target.textContent)
    if(e.target.textContent==questions[questioncounter-1].answer ){
        score+=25;
        
    }else{
        timer-=15;
        
    }
     
     showQuestions()
   
}); 
button3.addEventListener("click", function(e){
    console.log(e.target.textContent)
    if(e.target.textContent==questions[questioncounter-1].answer ){
        score+=25;
        
    }else{
        timer-=15;
        
    }
     
     showQuestions()
 
}); 
button4.addEventListener("click", function(e){
    console.log(e.target.textContent)
    if(e.target.textContent==questions[questioncounter-1].answer ){
        score+=25;
        
    }else{
        timer-=15;
      
    }
     
     showQuestions()
     
 
}); 
