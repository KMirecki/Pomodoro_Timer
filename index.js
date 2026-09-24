const clockElement = document.getElementById("clock");
const timerDisplay = document.getElementById("pomodoroClock");

const MODES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

let currentMode = "pomodoro";
let timeLeft = MODES[currentMode];
let intervalId = null;

const alarmSound = new Audio("alarm-clock-90867.mp3");

function updateSystemClock() {
  const now = new Date();
  clockElement.textContent = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
}

updateSystemClock();
setInterval(updateSystemClock, 1000);

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function renderTimer() {
  const formatted = formatTime(timeLeft);
  timerDisplay.textContent = formatted;
  document.title = `${formatted} - Pomodoro`;
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    timeLeft--;
    renderTimer();

    if (timeLeft <= 0) {
      stopTimer();
      alarmSound.play().catch(() => {});
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  timeLeft = MODES[currentMode];
  renderTimer();
}

function switchMode(modeKey) {
  if (!MODES[modeKey]) return;
  currentMode = modeKey;
  document.body.dataset.theme = modeKey;
  resetTimer();
}

document.querySelectorAll("[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => switchMode(btn.dataset.mode));
});

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

renderTimer();
