const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

startBtnEl.addEventListener('click', startColorChange);
stopBtnEl.addEventListener('click', stopColorChange);

function startColorChange() {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
