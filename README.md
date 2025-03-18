Voice Recorder App

📌 Project Description

The Voice Recorder App is a simple web-based application that allows users to record their voice, visualize the waveform in real time, and save the recorded audio. The recordings persist in localStorage, meaning users can access their previous recordings even after refreshing the page or revisiting the app.

🚀 Features

🎙️ Record Voice: Start and stop voice recording using a microphone.

🎛 Pause and Resume: Pause and continue recording without losing progress.

📊 Live Waveform Visualization: Displays real-time waveform animation while recording.

🔄 Local Storage Persistence: Automatically saves recordings so they persist across page reloads.

🎵 Playback and Delete: Users can play back their recordings and delete them when no longer needed.

🔹 Responsive UI: Works across different devices with a simple and user-friendly interface.

📂 Project Structure

📁 voice-recorder-app
│── 📄 index.html          # Main HTML file (UI)
│── 📄 style.css           # CSS file for styling (if separate)
│── 📄 script.js           # JavaScript logic for recording, storing, and retrieving audio
│── 📄 README.md           # Project documentation (this file)

🎯 How to Use

Open the app in a browser.

Click on the microphone button to start recording.

Click the button again to pause recording (icon changes to pause).

Click the stop button to finalize the recording.

The recording is automatically saved and appears in the list.

Click Play to listen or Delete to remove a recording.

Refresh the page – your recordings will still be there!

🛠️ Installation & Setup

No installation is required! Just open https://github.com/Tunde914/Voice-Recorder file in your browser.

However, if you want to modify or extend the project:

Clone the Repository

git clone https://github.com/Tunde914/voice-recorder-app.git
cd voice-recorder-app

Open in Browser

Simply open index.html in any modern web browser (Chrome, Firefox, Edge, etc.).

🔧 Technologies Used

HTML5 – For structuring the web page

CSS3 – For styling the UI

JavaScript (ES6) – For handling recording, waveform visualization, and localStorage

MediaRecorder API – For capturing and processing audio

Canvas API – For rendering real-time waveform visualization

🛠️ Future Enhancements

📝 Download Option: Allow users to save recordings as .wav files.

🌍 Cloud Storage: Store recordings in a database for cross-device access.

🎨 UI Improvements: Enhance the design with better animations.

🤝 Contributing

Feel free to contribute! Fork the repo, make changes, and submit a pull request.

📜 License

This project is open-source and available under the MIT License.
