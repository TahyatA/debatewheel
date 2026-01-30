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
   Shared beep sound
------------------------------ */

function beep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.value = 600;
  gain.gain.value = 0.1;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}


/* -----------------------------
   15-Minute Prep Timer
------------------------------ */

let prepInterval = null;
let prepSeconds = 15 * 60;

function updatePrepDisplay() {
  const m = String(Math.floor(prepSeconds / 60)).padStart(2, "0");
  const s = String(prepSeconds % 60).padStart(2, "0");
  document.getElementById("prepDisplay").textContent = `${m}:${s}`;
}

function startPrep() {
  if (prepInterval) return;

  prepInterval = setInterval(() => {
    prepSeconds--;
    updatePrepDisplay();

    if (prepSeconds <= 0) {
      clearInterval(prepInterval);
      prepInterval = null;
      document.getElementById("prepStatus").textContent = "Prep time over!";
      beep();
    }
  }, 1000);
}

function stopPrep() {
  clearInterval(prepInterval);
  prepInterval = null;
}

function resetPrep() {
  stopPrep();
  prepSeconds = 15 * 60;
  updatePrepDisplay();
  document.getElementById("prepStatus").textContent = "";
}

document.getElementById("startPrepBtn").addEventListener("click", startPrep);
document.getElementById("stopPrepBtn").addEventListener("click", stopPrep);
document.getElementById("resetPrepBtn").addEventListener("click", resetPrep);

updatePrepDisplay();


/* -----------------------------
   7-Minute Speaking Timer
------------------------------ */

let speakInterval = null;
let speakSeconds = 7 * 60;

function updateSpeakDisplay() {
  const m = String(Math.floor(speakSeconds / 60)).padStart(2, "0");
  const s = String(speakSeconds % 60).padStart(2, "0");
  document.getElementById("speakDisplay").textContent = `${m}:${s}`;
}

function startSpeak() {
  if (speakInterval) return;

  const status = document.getElementById("speakStatus");
  status.textContent = "";

  speakInterval = setInterval(() => {
    speakSeconds--;
    updateSpeakDisplay();

    if (speakSeconds === 6 * 60) status.textContent = "1 minute has passed.";
    if (speakSeconds === 2 * 60) status.textContent = "5 more minutes have passed.";
    if (speakSeconds === 60) status.textContent = "Final minute!";

    if (speakSeconds <= 0) {
      clearInterval(speakInterval);
      speakInterval = null;
      status.textContent = "Time's up!";
      beep();
    }
  }, 1000);
}

function stopSpeak() {
  clearInterval(speakInterval);
  speakInterval = null;
}

function resetSpeak() {
  stopSpeak();
  speakSeconds = 7 * 60;
  updateSpeakDisplay();
  document.getElementById("speakStatus").textContent = "";
}

document.getElementById("startSpeakBtn").addEventListener("click", startSpeak);
document.getElementById("stopSpeakBtn").addEventListener("click", stopSpeak);
document.getElementById("resetSpeakBtn").addEventListener("click", resetSpeak);

updateSpeakDisplay();
