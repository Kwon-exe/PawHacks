const questions = [
    {
        question: "This is a question",
        answers:[
            {text: "answer", correct: true},
            {text: "answer", correct: false},
            {text: "answer", correct: false},
            {text: "answer", correct: false},
        ]
    },
    {
        question: "This is a question 1",
        answers:[
            {text: "answer1", correct: false},
            {text: "answer1", correct: true},
            {text: "answer1", correct: false},
            {text: "answer1", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

let [seconds, tenSeconds,minutes] = [0,0,0];
let displayTime = document.getElementById("timerCount");
let timer = null;

function stopwatch(){
    seconds++
    if(seconds === 10){
        seconds = 0;
        tenSeconds++;
    }
    if(tenSeconds === 6){
        tenSeconds = 0;
        minutes++
    }
    displayTime.innerHTML = minutes + ":" + tenSeconds + seconds;
}
function watchStart(){
    seconds = 0;
    tenSeconds = 0;
    minutes = 0;
    if(timer!== null){
        clearInterval(timer);
    }
    timer = setInterval(stopwatch,1000);
}

function watchStop(){
    clearInterval(timer);
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    watchStart();
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    document.getElementById("timerCount").style.display = "block";
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    watchStop();
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Train Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        watchStart();
    }else{
        showScore();
        document.getElementById("timerCount").style.display = "none";
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();