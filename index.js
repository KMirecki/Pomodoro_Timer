const normalClock = document.getElementById("clock");
const pomodoroClock = document.getElementById("pomodoroClock");
const buttons = document.querySelectorAll("button");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Normal clock

clock();
setInterval(clock, 1000);

function clock() {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let dayOfWeek = days[date.getDay()];
    normalClock.textContent = `${dayOfWeek}, ${day} ${month} ${year}, ${hours}:${minutes}`;
}

//Pomodoro Timer

let interval;
let timeLeft = 1500;
let resetTime = 1500;
let isStarted = false;

const POMODORO = 1500;
const SHORT_BREAK = 300;
const LONG_BREAK = 900;

let audio = new Audio('alarm-clock-90867.mp3');

updateTimer();

buttons.forEach(button => {
    button.addEventListener("click", event => {
        switch (event.target.id) {
            case "start":
                startTimer();
                break;
            case "stop":
                stopTimer();
                break;
            case "reset":
                resetTimer(resetTime);
                break;
            case "pomodoro":
                changeColor("hsl(0, 100%, 60%)", "hsl(0, 100%, 75%)");
                resetTimer(POMODORO);
                break;
            case "shortBreak":
                changeColor("hsla(209, 55%, 45%, 1.00)", "hsla(209, 65%, 65%, 1.00)");
                resetTimer(SHORT_BREAK);
                break;
            case "longBreak":
                changeColor("hsla(138, 32%, 46%, 1.00)", "hsla(138, 40%, 63%, 1.00)");
                resetTimer(LONG_BREAK);
                break;
        }
    })
})

function startTimer() {
    if (!isStarted) {
        interval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                stopTimer();
                audio.play();
            }
        }, 1000);
        isStarted = true;
    }
}

function updateTimer() {
    let minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    let seconds = String(timeLeft % 60).padStart(2, "0");

    pomodoroClock.textContent = `${minutes}:${seconds}`;
}

function stopTimer() {
    clearInterval(interval);
    isStarted = false;
}

function resetTimer(time) {
    stopTimer();
    timeLeft = time;
    resetTime = time;
    updateTimer();
}

//Visuals

function changeColor(darkColor, lightColor) {
    document.querySelector("header").style.backgroundColor = darkColor;
    document.querySelector("main").style.backgroundColor = lightColor;
    buttons.forEach(button => {
        button.style.backgroundColor = darkColor;
    })
}