/* -----------------------------
   Debate Topic Picker
------------------------------ */

function spinWheel() {
  const raw = document.getElementById("topics").value.trim();
  const items = raw.split("\n").map(x => x.trim()).filter(x => x.length > 0);
  const resultDiv = document.getElementById("result");
  const spinner = document.getElementById("spinner");

  if (items.length === 0) {
    resultDiv.textContent = "Add at least one topic.";
    return;
  }

  spinner.style.display = "block";
  spinner.style.animation = "spin 1.5s ease-out";

  resultDiv.textContent = "";

  setTimeout(() => {
    spinner.style.display = "none";

    const topic = items[Math.floor(Math.random() * items.length)];
    const side = Math.random() < 0.5 ? "Proposition" : "Opposition";

    resultDiv.innerHTML = `
      Topic: <strong>${topic}</strong><br>
      Side: <strong>${side}</strong>
    `;
  }, 1500);
}

document.getElementById("spinBtn").addEventListener("click", spinWheel);


/* -----------------------------
   7-Minute Timer
------------------------------ */

let timerInterval = null;
let totalSeconds = 7 * 60;

function updateDisplay() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
}

function startSevenMinuteTimer() {
  if (timerInterval) return;

  const status = document.getElementById("timerStatus");
  status.textContent = "";

  timerInterval = setInterval(() => {
    totalSeconds--;
    updateDisplay();

    if (totalSeconds === 6 * 60) status.textContent = "1 minute has passed.";
    if (totalSeconds === 2 * 60) status.textContent = "5 more minutes have passed.";
    if (totalSeconds === 60) status.textContent = "Final minute!";

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      status.textContent = "Time's up!";
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  totalSeconds = 7 * 60;
  updateDisplay();
  document.getElementById("timerStatus").textContent = "";
}

document.getElementById("startTimerBtn").addEventListener("click", startSevenMinuteTimer);
document.getElementById("stopTimerBtn").addEventListener("click", stopTimer);
document.getElementById("resetTimerBtn").addEventListener("click", resetTimer);

// Initialize display
updateDisplay();
