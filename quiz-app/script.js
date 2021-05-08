const quizData = [
  {
    question: "How old is George Floydman?",
    a: "10",
    b: "68",
    c: "27",
    d: "46",
    correct: "d",
  },
  {
    question: "What is the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "JavaScript",
    d: "Fortnite",
    correct: "a",
  },
  {
    question: "Who is the best cahracter in Code Geass?",
    a: "Arthur",
    b: "Lelouch vi Britannia",
    c: "C.C.",
    d: "Suzaku Kururugi",
    correct: "b",
  },
  {
    question: "Where is my father?",
    a: "Local shop, he went to buy milk",
    b: "in Africa",
    c: "on Mars",
    d: "in Vietnam war",
    correct: "b",
  },
  {
    question: "What year was JavaScript launched?",
    a: "2069",
    b: "1995",
    c: "ała kurwa rzeczywiście",
    d: "none of the above",
    correct: "b",
  },
];

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
let answer = undefined;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
    //console.log(answer.checked);
  });

  return undefined;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  // check to see the answer
  getSelected();

  if (answer == quizData[currentQuiz].correct) {
    score++;
  }
  //   console.log(score);
  currentQuiz++;
  //   console.log(currentQuiz);
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    //TODO: Show results
    quiz.innerHTML = `<h2>You answered correctly at ${score} / ${quizData.length} questions.</h2> <button onclick="location.reload()">Reset quiz</button>`;
  }
});
