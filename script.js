let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

function toggleStopwatch() {
    if (!isRunning) {
        start();
    } else {
        stop();
    }
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 100); // Update every 100 milliseconds
    isRunning = true;
    document.getElementById("controlImg").src = "stopper.png";
    document.getElementById("recordBtn").disabled = false;
}

function stop() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("controlImg").src = "start-removebg-preview.png";
    document.getElementById("recordBtn").disabled = true;
}

function record() {
    const lapsList = document.getElementById("lapsList");
    const lapTime = elapsedTime;
    const formattedTime = formatTime(lapTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter++}: ${formattedTime}`;
    lapsList.appendChild(lapItem);
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById("stopwatch").textContent = "00 H:00 M:00 S 000 ms";
    document.getElementById("controlImg").src = "start-removebg-preview.png";
    document.getElementById("recordBtn").disabled = true;
    document.getElementById("lapsList").innerHTML = "";
    lapCounter = 1;
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    document.getElementById("stopwatch").textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000));
    return (
        ("00" + hours).slice(-2) +
        " H:" +
        ("00" + minutes).slice(-2) +
        " M:" +
        ("00" + seconds).slice(-2) +
        " S " +
        ("000" + milliseconds).slice(-3) +
        " ms"
    );
}