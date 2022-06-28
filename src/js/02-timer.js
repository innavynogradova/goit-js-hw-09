import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate = null;
let intervalId = 0;
const PROMPT_INTERVAL = 1000;

const refs = {
    input: document.querySelector("#datetime-picker"),
    btn: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
}

refs.btn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() > Date.now()) {
            refs.btn.disabled = false;
            selectedDate = selectedDates[0].getTime();
        } else {
            Notify.failure('Please choose a date in the future', {
            width: '400px',
            position: 'center-top',
            distance: '10px',
            opacity: 1,
            });
        }
    },
  };

flatpickr("#datetime-picker", options);
refs.btn.addEventListener('click', () => {
    
    intervalId = setInterval(countdown, PROMPT_INTERVAL);
    refs.btn.disabled = true;
    refs.input.disabled = true;
});

function countdown() {
    let delta = selectedDate - Date.now();
    if(delta > 0) {
        const { days, hours, minutes, seconds } = convertMs(delta);
        refs.days.innerText = addLeadingZero(days);
        refs.hours.innerText = addLeadingZero(hours);
        refs.minutes.innerText = addLeadingZero(minutes);
        refs.seconds.innerText = addLeadingZero(seconds);
    } else {
        clearInterval(intervalId);
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }