let audioContext;
let audioStream;
let recorder;
let analyser;
let dataArray;
let bufferLength;
let canvas = document.getElementById("waveform");
let canvasCtx = canvas.getContext("2d");
let recordings = [];
let isRecording = false;
let audioChunks = [];

canvas.width = 400;
canvas.height = 100;

// Initialize Audio Context
async function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const source = audioContext.createMediaStreamSource(audioStream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
        drawWaveform(); // Keep drawing waveform

        recorder = new MediaRecorder(audioStream);
        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        loadRecordings(); // Load previous recordings from localStorage
    } catch (error) {
        console.error("Error accessing microphone:", error);
    }
}

// Function to draw the waveform dynamically
function drawWaveform() {
    requestAnimationFrame(drawWaveform);
    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "white";
    canvasCtx.beginPath();

    let sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = v * (canvas.height / 2);

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    canvasCtx.stroke();
}

// Start or Pause Recording
document.getElementById("start-btn").addEventListener("click", () => {
    if (!recorder) {
        alert("Microphone not initialized. Refresh the page and allow microphone access.");
        return;
    }

    const micIcon = document.getElementById("start-btn").querySelector("i");

    if (!isRecording) {
        if (recorder.state === "inactive") {
            audioChunks = [];
            recorder.start();
        } else if (recorder.state === "paused") {
            recorder.resume();
        }

        isRecording = true;
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-pause");
        document.getElementById("stop-btn").disabled = false;
    } else {
        recorder.pause();
        isRecording = false;
        micIcon.classList.remove("fa-pause");
        micIcon.classList.add("fa-microphone");
    }
});

// Stop Recording
document.getElementById("stop-btn").addEventListener("click", () => {
    if (recorder && recorder.state !== "inactive") {
        recorder.stop();
    }
    
    isRecording = false;
    document.getElementById("start-btn").querySelector("i").classList.remove("fa-pause");
    document.getElementById("start-btn").querySelector("i").classList.add("fa-microphone");
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;

    recorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const recording = { id: Date.now(), audio: url };
        recordings.push(recording);
        saveRecordings(); // Save new recording to localStorage
        displayRecordings();
    };
});

// Display recordings with Play button
function displayRecordings() {
    const recordingsList = document.getElementById("recordings-list");
    recordingsList.innerHTML = "";
    recordings.forEach(recording => {
        const recordingDiv = document.createElement("div");
        recordingDiv.classList.add("recording");

        const timestamp = document.createElement("span");
        timestamp.textContent = new Date(recording.id).toLocaleTimeString();

        const playButton = document.createElement("button");
        playButton.classList.add("play-btn");
        playButton.innerHTML = `<i class="fa fa-play"></i>`;
        playButton.style.backgroundColor = "#007BFF"; 
        playButton.style.color = "white";
        playButton.onclick = () => togglePlayDelete(playButton, recording.id, recording.audio);

        recordingDiv.appendChild(timestamp);
        recordingDiv.appendChild(playButton);
        recordingsList.appendChild(recordingDiv);
    });
}

// Toggle Play & Delete Button
function togglePlayDelete(button, id, audioURL) {
    const audio = new Audio(audioURL);
    audio.play();
    button.innerHTML = `<i class="fa fa-trash"></i>`; // Change to delete icon
    button.style.backgroundColor = "#FF4444"; 
    button.onclick = () => deleteRecording(id);
}

// Delete Recording
function deleteRecording(id) {
    recordings = recordings.filter(recording => recording.id !== id);
    saveRecordings(); // Save the updated recordings list to localStorage
    displayRecordings();
}

// Save recordings to localStorage
function saveRecordings() {
    localStorage.setItem("recordings", JSON.stringify(recordings));
}

// Load recordings from localStorage
function loadRecordings() {
    const savedRecordings = localStorage.getItem("recordings");
    if (savedRecordings) {
        recordings = JSON.parse(savedRecordings);
        displayRecordings();
    }
}

// Initialize microphone and waveform
window.onload = initAudio;
