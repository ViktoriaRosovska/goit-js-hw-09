import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

Notify.init({
    position: 'center-top'
});
class Timer {
    constructor({ selector, targetDate, onFinished }) {
        this.spanDays = document.querySelector(`${selector} [data-days]`);
        this.spanHours = document.querySelector(`${selector} [data-hours]`);
        this.spanMinutes = document.querySelector(`${selector} [data-minutes]`);
        this.spanSeconds = document.querySelector(`${selector} [data-seconds]`);
        this.targetDate = targetDate;
        this.timerId = null;
        this.onFinished = onFinished;
    }
    start() {
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            if (this.targetDate < currentTime) {
                this.stop();
                Notify.success('Time is over');

                if (this.onFinished) {
                    this.onFinished(this);
                }
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
        const { days, hours, minutes, seconds } = this.convertMs(timeMs);
        this.spanDays.textContent = days;
        this.spanHours.textContent = hours;
        this.spanMinutes.textContent = minutes;
        this.spanSeconds.textContent = seconds;
    }
    
    convertMs(ms) {

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days    = this.addLeadingZero(Math.floor(ms / day));
        const hours   = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
};
 
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]')
const input = document.querySelector('#datetime-picker');

startBtn.disabled = true;

let date = new Date();
let timer = null;

const options = {
    enableTime: true,
    time_24hr: true,
    dateFormat: "d.m.Y",
    defaultDate: date,
    minuteIncrement: 1,
    onClose: (selectedDates) => {
        if (selectedDates[0] <= new Date()) {
            startBtn.disabled = true;
            Notify.failure("Please choose a date in the future");
          
        } else {
            date = selectedDates[0];
            startBtn.disabled = false;
        }
        
    },
};
let timePicker = flatpickr(input, options);

startBtn.addEventListener('click', onTimerCreate);
stopBtn.addEventListener('click', onTimerDestroy);

function onTimerCreate() {
    if (timer) {
        Notify.failure("Timer already created");
        return;
    }
    
    if (date > new Date()){
        timer = new Timer({
            selector: ".timer",
            targetDate: date,
            onFinished: onTimerDestroy
        });
    stopBtn.disabled = false;
    startBtn.disabled = true;
    timer.start();
    input.disabled = true; 
    } else {
        Notify.failure("Please choose a date in the future");
    }
}

function onTimerDestroy() {
    timer?.stop();
    timer = null;
    date = new Date();

    startBtn.disabled = false;
    stopBtn.disabled = true;
    input.disabled = false;
    timePicker.setDate(date);
}
