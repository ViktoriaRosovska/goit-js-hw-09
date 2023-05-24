const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopBtn.disabled = true;
startBtn.addEventListener('click', onStartButtonChangeBg);
stopBtn.addEventListener('click', onStopButtonCancelChangeBg);


function onStartButtonChangeBg() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }, 1000)
}

function onStopButtonCancelChangeBg() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}