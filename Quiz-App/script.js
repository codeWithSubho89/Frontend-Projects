const question = document.querySelector('.question')
const options = document.querySelector('.options')
const nextButton = document.querySelector('.next-btn')
const questionArea = document.querySelector('.question-area')
const modal = document.querySelector('.modal')
const playAgainBtn = document.querySelector('.playAgainBtn')
const currect = document.querySelector('.currect')
const wrong = document.querySelector('.wrong')


const ans = {rightAns: 0, wrongAns: 0}


const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    answer: "Au"
  },
  {
    question: "Which country invented pizza?",
    options: ["France", "Italy", "USA", "Greece"],
    answer: "Italy"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Cheetah", "Lion", "Horse", "Leopard"],
    answer: "Cheetah"
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Salt", "Ammonia", "Water", "Hydrogen Peroxide"],
    answer: "Water"
  }
];

let questionNumber = 0;

function startQuiz(){
  question.textContent = quiz[questionNumber].question;
  options.innerHTML = '';
  quiz[questionNumber].options.forEach(op=>{
    const btn = document.createElement('button');
    btn.classList.add('option')
    btn.textContent = op;
    options.appendChild(btn)
  })

  if(options.innerHTML !== '' && question.textContent !== ''){
    const questionAnswer = quiz[questionNumber].answer;
    
    const allOptions =options.querySelectorAll('.option')
    allOptions.forEach(op=>{
      op.addEventListener('click',()=>{
        if(op.textContent === questionAnswer){
          op.style.background = 'lightgreen';
          ans.rightAns++
          allOptions.forEach(o => o.setAttribute('disabled','true'))
        }else{
          op.style.background = 'red';
          Array.from(allOptions).find(op => op.textContent === questionAnswer).style.background = 'lightGreen'
          allOptions.forEach(o => o.setAttribute('disabled','true'))
          ans.wrongAns++
        }
        nextButton.style.display = 'block'
      }) 
    })

  }
}
startQuiz()
nextButton.addEventListener('click',()=>{
  if(questionNumber < quiz.length-1){
    questionNumber++
    startQuiz()
  }else{
    currect.textContent = ans.rightAns;
    wrong.textContent = ans.wrongAns;
    modal.classList.add('active')
  }
})

playAgainBtn.addEventListener('click',()=>{
  questionNumber = 0;
  ans.rightAns = 0;
  ans.wrongAns = 0;
  modal.classList.remove('active')
  startQuiz()
})