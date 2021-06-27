const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button[data-time]');
let countdown;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const display = `${mins}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function displayEndTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const mins = date.getMinutes();
  const adjustedTime = `${hours > 12 ? hours - 12 : hours}:${
    mins < 10 ? '0' : ''
  }${mins}`;
  endTime.textContent = `Be Back At ${adjustedTime}`;
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
