import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEL = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')

buttonEl.disabled = true;
let delta = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    delta = selectedDates[0].getTime() - options.defaultDate.getTime()
    if (delta <= 0) {
      Notiflix.Notify.failure("Please choose a date in the future.");

      buttonEl.disabled = true;

      return 
    }
    buttonEl.disabled = false;

    Notiflix.Notify.success("The time of doomsday is chosen.");
  },
};

flatpickr('#datetime-picker', options);

buttonEl.addEventListener('click', startTimer);

function startTimer() {
  buttonEl.disabled = true;

  Notiflix.Notify.success("The doomsday timer has started. Thanks");

  timerId = setInterval(()=> {
    const { days, hours, minutes, seconds } = convertMs(delta)
    if (seconds < 0) {
      Notiflix.Notify.success("Congratulations, we have reached our goal!");
      clearInterval(timerId)
      return
    }
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    delta -= 1000;
  }, 1000) 
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

