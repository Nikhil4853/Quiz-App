const questions = [{
        question: "which is the largest element in the world ?",
        answer: [
            { Text: "Shark", correct: false },
            { Text: "Blue whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false }
        ]
    },
    {
        question: "which is the largest desert in the world ?",
        answer: [
            { Text: "Shara", correct: false },
            { Text: "Gobi", correct: true },
            { Text: "kalahari", correct: false },
            { Text: "Antartica", correct: true }
        ]
    },
    {
        question: "which is smallest country in the world ?",
        answer: [
            { Text: "Vatican", correct: true },
            { Text: "bhutan", correct: false },
            { Text: "Nepal", correct: false },
            { Text: "Shri lanka", correct: false }
        ]
    },
    {
        question: "which is the smallest continent in the world ?",
        answer: [
            { Text: "Asia", correct: false },
            { Text: "Australia", correct: true },
            { Text: "India", correct: false },
            { Text: "Africa", correct: false }
        ]
    },

];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextBtnElement = document.getElementById("next-button");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtnElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questioNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questioNO + "." + currentQuestion.question;
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct == true) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer)
    })



}
nextBtnElement.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuiz();
    }
});

function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}`;
    nextBtnElement.innerHTML = "play again"
    nextBtnElement.style.display = "block";
}


function selectAnswer(e) {
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if (iscorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = "ture";
    });
    nextBtnElement.style.display = "block";

}

function resetState() {
    nextBtnElement.style.display = "none";
    while (answerButton.firstElementChild) {
        answerButton.removeChild(answerButton.firstElementChild);
    }
}
startQuiz();