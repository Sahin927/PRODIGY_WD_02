let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
let running = false;

const display = document.getElementById("display");
const startStop = document.getElementById("startStop");
const reset = document.getElementById("reset");
const lap = document.getElementById("lap");
const laps = document.getElementById("laps");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = `${h}:${m}:${s}`;
}

function timerCycle() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

startStop.addEventListener("click", () => {
  if (!running) {
    timer = setInterval(timerCycle, 1000);
    startStop.textContent = "Pause";
    running = true;
  } else {
    clearInterval(timer);
    startStop.textContent = "Start";
    running = false;
  }
});

reset.addEventListener("click", () => {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  running = false;
  startStop.textContent = "Start";
  laps.innerHTML = "";
  updateDisplay();
});

lap.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});

updateDisplay();
