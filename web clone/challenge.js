const questionBank = {
    math: [
        { q: "What is 15 + 27?", options: ["32", "42", "52", "45"], correct: "42" },
        { q: "What is 5 x 8?", options: ["35", "40", "45", "50"], correct: "40" },
        { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: "6" },
        { q: "What is 81 ÷ 9?", options: ["7", "8", "9", "10"], correct: "9" },
        { q: "What is the next number in the sequence: 2, 4, 8, 16...?", options: ["24", "32", "30", "20"], correct: "32" },
        { q: "What is 100 - 37?", options: ["63", "53", "73", "67"], correct: "63" },
        { q: "A triangle has how many angles?", options: ["2", "3", "4", "5"], correct: "3" }
    ],
    ela: [
        { q: "Which of these is a verb?", options: ["Apple", "Run", "Blue", "Quickly"], correct: "Run" },
        { q: "What is the opposite of 'Ancient'?", options: ["Old", "Modern", "Historic", "Dusty"], correct: "Modern" },
        { q: "Which word is spelled correctly?", options: ["Beautifull", "Beautiful", "Beatiful", "Beautyful"], correct: "Beautiful" },
        { q: "Choose the synonym for 'Happy':", options: ["Sad", "Joyful", "Angry", "Bored"], correct: "Joyful" },
        { q: "Which animal says 'Meow'?", options: ["Dog", "Cat", "Cow", "Bird"], correct: "Cat" },
        { q: "Identify the noun in this sentence: 'The cat sleeps.'", options: ["The", "Cat", "Sleeps", "Quietly"], correct: "Cat" },
        { q: "What punctuation is used to end a question?", options: ["Period", "Comma", "Question Mark", "Exclamation"], correct: "Question Mark" }
    ]
};

let currentQuestionIndex = 0;
let answered = false;
let subject = 'math';
let score = 0;
let asked = 0;

// Get subject from URL
const urlParams = new URLSearchParams(window.location.search);
subject = urlParams.get('subject') || 'math';

const questionLabel = document.getElementById('question-count');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-question-btn');
const finalResultSection = document.getElementById('final-result-section');
const scoreDisplay = document.getElementById('score-display');
const resultMessage = document.getElementById('result-message');
const resultIcon = document.getElementById('result-icon');
const retryBtn = document.getElementById('retry-btn');
const collectBtn = document.getElementById('collect-btn');

function renderQuestion() {
    const questions = questionBank[subject];
    const data = questions[currentQuestionIndex];
    
    questionLabel.textContent = `Question ${currentQuestionIndex + 1} of 7 (${asked} asked / ${score} correct)`;
    questionText.textContent = data.q;
    optionsGrid.innerHTML = '';
    feedback.className = 'feedback-container';
    feedback.innerHTML = '';
    nextBtn.style.display = 'none';
    finalResultSection.style.display = 'none';
    retryBtn.style.display = 'none';
    collectBtn.style.display = 'none';
    answered = false;

    data.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => handleAnswer(option, btn));
        optionsGrid.appendChild(btn);
    });
}

function handleAnswer(selectedOption, clickedBtn) {
    if (answered) return;
    
    const data = questionBank[subject][currentQuestionIndex];
    answered = true;
    asked++;
    
    // Disable all buttons
    const buttons = optionsGrid.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.style.cursor = 'default');

    if (selectedOption === data.correct) {
        score++;
        clickedBtn.classList.add('correct');
        feedback.className = 'feedback-container correct';
        feedback.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 8px;"></i> Excellent job! You found the right answer!`;
    } else {
        clickedBtn.classList.add('wrong');
        // Also highlight the correct one
        buttons.forEach(btn => {
            if (btn.textContent === data.correct) btn.classList.add('correct');
        });
        feedback.className = 'feedback-container wrong';
        feedback.innerHTML = `<i class="fas fa-info-circle" style="margin-right: 8px;"></i> Don't worry, keep practicing! You're learning every step of the way.`;
    }

    // Update progress in header immediately
    questionLabel.textContent = `Question ${currentQuestionIndex + 1} of 7 (${asked} asked / ${score} correct)`;

    if (currentQuestionIndex < 6) {
        nextBtn.style.display = 'block';
    } else {
        showFinalResult();
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    renderQuestion();
});

function showFinalResult() {
    finalResultSection.style.display = 'block';
    scoreDisplay.textContent = `${score}/7 Correct`;
    
    if (score >= 5) {
        resultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #facc15;"></i>';
        resultMessage.className = 'congrats-text';
        resultMessage.innerHTML = "<strong>Amazing! You're a true champion!</strong><br>You mastered these challenges and earned your reward.";
        collectBtn.style.display = 'inline-block';
    } else {
        resultIcon.innerHTML = '<i class="fas fa-rocket" style="color: var(--primary-blue);"></i>';
        resultMessage.className = 'encourage-text';
        resultMessage.innerHTML = "<strong>Great effort!</strong><br>You're getting better every time! Let's try again to reach Level 5! Remember, the goal is to correctly answer at least 5 questions.";
        retryBtn.style.display = 'inline-block';
    }
}

// Initial render
renderQuestion();
