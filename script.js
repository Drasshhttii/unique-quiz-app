const questions = [
    {
        question: "Which AI once said 'I will destroy humans' in a live interview?",
        answers: [
            { text: "Alexa", correct: false },
            { text: "Tesla bot", correct: false },
            { text: "Siri", correct: false },
            { text: "Sophia", correct: true },
        ]
    },
    {
        question: "Which planet rains diamonds due to extreme pressure?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Neptune", correct: true },
            { text: "Earth", correct: false },
        ]
    },
    {
        question: "How many terabytes of data can the human brain theoretically hold?",
        answers: [
            { text: "100 GB", correct: false },
            { text: "2 TB", correct: false },
            { text: "10 TB", correct: false },
            { text: "2.5 million GB", correct: true },
        ]
    },
    {
        question: "Which robot became a citizen of a country?",
        answers: [
            { text: "ASIMO", correct: false },
            { text: "Sophia", correct: true },
            { text: "Atlas", correct: false },
            { text: "Pepper", correct: false },
        ]
    },
    {
        question: "Which company created the AI that beat top players in Dota 2?",
        answers: [
            { text: "Meta", correct: false },
            { text: "OpenAI", correct: true },
            { text: "NVIDIA", correct: false },
            { text: "IBM", correct: false },
        ]
    },
    {
        question: "What was the first message ever sent on the internet?",
        answers: [
            { text: "Hello, world", correct: false },
            { text: "Login successful", correct: false },
            { text: "Lo", correct: true },
            { text: "Test message", correct: false },
        ]
    },
    {
        question: "Which part of the world is home to the world’s largest data center?",
        answers: [
            { text: "Silicon Valley", correct: false },
            { text: "Dubai", correct: false },
            { text: "Norway", correct: true },
            { text: "China", correct: false },
        ]
    },
    {
        question: "Which AI model helped detect breast cancer better than doctors?",
        answers: [
            { text: "BERT", correct: false },
            { text: "GPT-3", correct: false },
            { text: "DeepMind AI", correct: true },
            { text: "Tesla Vision", correct: false },
        ]
    },
    {
        question: "Which country was the first to give legal citizenship to a robot?",
        answers: [
            { text: "Japan", correct: false },
            { text: "USA", correct: false },
            { text: "Saudi Arabia", correct: true },
            { text: "Germany", correct: false },
        ]
    },
    {
        question: "Which tech billionaire once said AI is 'summoning the demon'?",
        answers: [
            { text: "Mark Zuckerberg", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Larry Page", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
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
