const questions = [
    {
        question: "If f(x) = x + 7 and g(x) = 7x, what is the value of 4f(2) − g(2)?",
        answers:[
            {text: "-5", correct: false},
            {text: "1", correct: false},
            {text: "22", correct: true},
            {text: "28", correct: false},
        ],
        unit: "Algebra",
        mastery: 0.0,
    },
    {
        question: "y < -4x + 4\n Which point (x, y) is a solution to the given inequality in the xy-plane?",
        answers:[
            {text: "(2, -1)", correct: false},
            {text: "(2, 1)", correct: false},
            {text: "(0, 5)", correct: false},
            {text: "(-4, 0)", correct: true},
        ],
        unit: "Algebra",
        mastery: 0.0,
    },
    {
        question: "Figure A and figure B are both regular polygons. The sum of the perimeter of figure A and the perimeter of figure B is 63 inches. The equation 3x + 6y = 63 represents this situation, where x is the number of sides of figure A and y is the number of sides of figure B. Which statement is the best interpretation of 6 in this context?",
        answers:[
            {text: "Each side of figure B has a length of 6 inches.", correct: true},
            {text: "The number of sides of figure B is 6.", correct: false},
            {text: "Each side of figure A has a length of 6 inches.", correct: false},
            {text: "The number of sides of figure A is 6.", correct: false},
        ],
        unit: "Algebra",
        mastery: 0.0,
    },
    {
        question: "Store A sells raspberries for $5.50 per pint and blackberries for $3.00 per pint. Store B sells raspberries for $6.50 per pint and blackberries for $8.00 per pint. A certain purchase of raspberries and blackberries would cost $37.00 at store A or $66.00 at store B. How many pints of blackberries are in this purchase?",
        answers:[
            {text: "12", correct: false},
            {text: "8", correct: false},
            {text: "5", correct: true},
            {text: "4", correct: false},
        ],
        unit: "Algebra",
        mastery: 0.0,
    },
    {
        question: "In a group, 40% of the items are red. Of all the red items in the group, 30% also have stripes. What percentage of the items in the group are red and have stripes?",
        answers:[
            {text: "10%", correct: false},
            {text: "12%", correct: true},
            {text: "70%", correct: false},
            {text: "75%", correct: false},
        ],
        unit: "Problem-Solving and Data Analysis",
        mastery: 0.0,
    },
    {
        question: "The density of a certain type of wood is 353 kilograms per cubic meter. A sample of this type of wood is in the shape of a cube and has a mass of 345 kilograms. To the nearest hundredth of a meter, what is the length of one edge of this sample?",
        answers:[
            {text: "0.98", correct: false},
            {text: "0.99", correct: true},
            {text: "1.01", correct: false},
            {text: "1.02", correct: false},
        ],
        unit: "Problem-Solving and Data Analysis",
        mastery: 0.0,
    },
    {
        question: "Two nearby trees are perpendicular to the ground, which is flat. One of these trees is 10 feet tall and has a shadow that is 5 feet long. At the same time, the shadow of the other tree is 2 feet long. How tall, in feet, is the other tree?",
        answers:[
            {text: "3", correct: false},
            {text: "4", correct: true},
            {text: "8", correct: false},
            {text: "27", correct: false},
        ],
        unit: "Geometry and Trigonometry",
        mastery: 0.0,
    },
    {
        question: "A circle has center O, and points A and B lie on the circle. The measure of arc AB is 45° and the length of arc AB is 3 inches. What is the circumference, in inches, of the circle?",
        answers:[
            {text: "3", correct: false},
            {text: "6", correct: false},
            {text: "9", correct: false},
            {text: "24", correct: true},
        ],
        unit: "Geometry and Trigonometry",
        mastery: 0.0,
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

let minutes = 5;
let seconds = 0;
let displayTime = document.getElementById("timerCount");
let timer = null;

let leftScore = 0;
let rightScore = 0;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (seconds === 0 && minutes === 0) {
        clearInterval(timer);
        showScore();
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        displayTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        if(currentQuestionIndex % 2 === 0){
            leftScore+=5;
        }
        if(currentQuestionIndex % 2 === 1){
            rightScore+=5
        }
    } else {
        selectedBtn.classList.add("incorrect");
        if(currentQuestionIndex % 2 === 0){
            leftScore-=10;
        }
        if(currentQuestionIndex % 2 === 1){
            rightScore-=10
        }
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    document.getElementById("left-score").innerHTML = leftScore;
    document.getElementById("right-score").innerHTML = rightScore;
    nextButton.style.display = "block";
}

function showScore() {
    clearInterval(timer);
    resetState();
    if(rightScore > leftScore){
        questionElement.textContent = "right player won";
    }
    if(leftScore > rightScore){
        questionElement.textContent = "left player won";
    }
    if(leftScore === rightScore){
        questionElement.textContent = "tie!";
    }
    nextButton.textContent = "Train Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();