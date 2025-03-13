// Image
const dynamicImage = document.getElementById("dynamicImage");
const imageUrl = "img/bodrum-turkey.webp"; // Bron: "https://hips.hearstapps.com/hmg-prod/images/bodrum-in-turkey-royalty-free-image-1665505514.jpg?:*";
dynamicImage.src = imageUrl;

dynamicImage.onload = () => {
    console.log("Image loaded."); // Debug
};

// Timer
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById("swdisplay");
const startStopButton = document.getElementById("swstartStop");
const resetButton = document.getElementById("swreset");

// Volume
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

// Timer func
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = ms % 100;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime + (isRunning ? Date.now() - startTime : 0));
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = "Play";
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 1);
        startStopButton.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    startStopButton.textContent = "Play";
    updateDisplay();
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);

updateDisplay();

// Volume func
volumeSlider.addEventListener("input", () => {
    let value = volumeSlider.value;
    volumeValue.textContent = `${value}%`;

    volumeSlider.style.background = `linear-gradient(to right,rgb(0, 0, 0) ${value}%, #ccc ${value}%)`;
});