import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

class Timer {
    constructor({ selector, targetDate }) {
        this.spanDays = document.querySelector(`${selector} [data-days]`);
        this.spanHours = document.querySelector(`${selector} [data-hours]`);
        this.spanMinutes = document.querySelector(`${selector} [data-minutes]`);
        this.spanSeconds = document.querySelector(`${selector} [data-seconds]`);
        this.targetDate = targetDate;
        this.timerId = null;
    }
    start() {
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            if (this.targetDate < currentTime) {
                this.stop();
                alert('Time is over');
            }
            else
                this.setControls(deltaTime);
        }, 1000);
    }
    stop() {
        clearInterval(this.timerId);
        this.setControls(0);
    }
    
    setControls(timeMs) {
        const { days, hours, minutes, seconds } = convertMs(timeMs);
        this.spanDays.textContent = days;
        this.spanHours.textContent = hours;
        this.spanMinutes.textContent = minutes;
        this.spanSeconds.textContent = seconds;
    }
}
 
startBtn = document.querySelector('button[data-start]');
stopBtn = document.querySelector('button[data-stop]')

let date = new Date();
let timer = null;

const input = document.querySelector('#datetime-picker');

const options = {
    enableTime: true,
    time_24hr: true,
    dateFormat: "d.m.Y",
    defaultDate: date,
    minuteIncrement: 1,
    onClose: (selectedDates) => {
        date = selectedDates[0];
    },
};
let timePicker = flatpickr(input, options);

startBtn.addEventListener('click', onTimerCreate);
stopBtn.addEventListener('click', onTimerDestroy);

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function onTimerCreate() {
    if (timer) {
        alert("Timer already created");
        return;
    }
    if (date < Date.now()) {
        alert("Enter date in the future")
        return;
    }
    timer = new Timer({
        selector: ".timer",
        targetDate: date
    });
    timer.start();
    disabled(true);
}

function onTimerDestroy() {
    timer?.stop();
    timer = null;

    disabled(false);
    timePicker.setDate(new Date());
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function disabled(value) {
    startBtn.disabled = value;
    input.disabled = value;
}