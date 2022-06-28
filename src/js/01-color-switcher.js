const refs = {
    start: document.querySelector("button[data-start]"),
    stop: document.querySelector("button[data-stop]")
}

const PROMPT_INTERVAL = 1000;
let timerId = null;

refs.start.addEventListener('click', onStartButtonClick);
refs.stop.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
    timerId = setInterval(setColor, PROMPT_INTERVAL);
    refs.start.setAttribute("disabled", "disabled");
    refs.stop.removeAttribute("disabled", "disabled");
};

function onStopButtonClick() {
    clearInterval(timerId);
    refs.start.removeAttribute("disabled", "disabled");
    refs.stop.setAttribute("disabled", "disabled");
};

function setColor() {
    document.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
