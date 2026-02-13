// --------------------
// Element References
// --------------------
const choices = document.querySelectorAll(".choice");
const message = document.getElementById("message");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");

// --------------------
// Game State
// --------------------
let userScore = 0;
let computerScore = 0;

// --------------------
// Helper Functions
// --------------------
const getComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
};

const resetHighlights = () => {
    setTimeout(() => {
        choices.forEach(choice => {
            choice.classList.remove("win", "lose", "selected");
        });
    }, 1200);
};

const updateMessage = (text, className) => {
    message.textContent = text;
    message.className = className;
};

// --------------------
// Game Logic
// --------------------
const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();
    const userChoiceEl = document.getElementById(userChoice);
    const computerChoiceEl = document.getElementById(computerChoice);
    // Draw
    if (userChoice === computerChoice) {
        updateMessage("It's a draw 🤝", "draw");
        userChoiceEl.classList.add("selected");
        computerChoiceEl.classList.add("selected");
        resetHighlights();
        return;
    }
    const userWins =
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper");
    if (userWins) {
        userScore++;
        userScoreEl.textContent = userScore;
        updateMessage(`You win! ${userChoice} beats ${computerChoice} 🎉`, "win");
        userChoiceEl.classList.add("win");
        computerChoiceEl.classList.add("lose");
    } else {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        updateMessage(`You lose! ${computerChoice} beats ${userChoice} 😞`, "lose");
        userChoiceEl.classList.add("lose");
        computerChoiceEl.classList.add("win");
    }
    resetHighlights();
};

// --------------------
// Event Listeners
// --------------------
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        // Remove previous selection
        choices.forEach(c => c.classList.remove("selected"));
        // Highlight current selection
        choice.classList.add("selected");
        // Play round
        playGame(choice.id);
    });
});

// --------------------
// Reset Button
// --------------------
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    userScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    message.textContent = "Game reset. Make your move!";
    message.className = "";
    choices.forEach(choice => {
        choice.classList.remove("win", "lose", "selected");
    });
});

// --------------------
// Theme Toggle
// --------------------
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    themeToggle.textContent = body.classList.contains("light")
        ? "☀️"
        : "🌙";
});