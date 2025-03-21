# 🎤 Speech-to-Sign Language Converter
---
## 📌 Project Overview
This project is a **Speech-to-Sign Language Converter** that recognizes spoken words and plays corresponding sign language videos. It utilizes **Vosk** for speech recognition and **Node.js** for backend processing. The frontend is built with **HTML, JavaScript, and MediaRecorder API** to handle audio recording and video playback.
---
## 🚀 Features
- 🎙️ **Real-time Speech Recognition** using Vosk ASR
- 🎞️ **Automatic Sign Language Video Mapping** based on recognized text
- 🎥 **Video Playback** for matched sign language videos
- 📂 **Multer File Upload** for handling recorded audio
- 🖥️ **Simple and Responsive UI** for user interaction
---
## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Speech Recognition:** Vosk
- **Audio Processing:** FFmpeg
- **Storage:** Multer (for handling uploads)
---
## 📂 Project Structure
```
project-folder/
│── backend/
│   ├── audio/                # Stores uploaded and processed audio
│   ├── Video/                # Stores sign language videos
│   ├── vosk-model/           # Vosk speech recognition model
│   ├── recognize.py          # Speech recognition script
│   ├── server.js             # Node.js backend
│── frontend/
│   ├── index.html            # Main UI
│── README.md                 # Documentation
```
---
## 🔧 Setup Instructions
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **Python** (v3.7+ recommended)
- **FFmpeg** (for audio processing)
---
### Step 1: Clone the Repository
```sh
git clone https://github.com/yourusername/speech-to-sign.git
cd speech-to-sign
```

### Step 2: Install Dependencies
```sh
cd backend
npm install
```

### Step 3: Install Vosk Model
Download the Vosk model and place it inside `backend/vosk-model/`.
```sh
mkdir backend/vosk-model
# Download a Vosk model manually from https://alphacephei.com/vosk/models
```

### Step 4: Run the Server
```sh
node backend/server.js
```
---
## 📝 How It Works
1. Click **Start Recording** to capture audio.
2. Click **Stop Recording**, which sends the audio to the backend.
3. The backend processes the audio using **FFmpeg** and **Vosk**.
4. If recognized, it matches the text to a **sign language video**.
5. The corresponding video is played in the **frontend**.

---
