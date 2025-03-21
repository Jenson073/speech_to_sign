const fs = require("fs");
const { spawn } = require("child_process");
const multer = require("multer");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

//  Allow CORS for frontend access
app.use(cors());
app.use(express.static("frontend")); //  Serve frontend files

//  Serve static video files from the correct directory
const VIDEO_DIR = "D:/project 2/backend/Video";// Updated to match the correct structure
app.use("/Video", express.static(VIDEO_DIR));

//  Configure Multer for audio uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "audio");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, "recorded.wav");
    }
});

const upload = multer({ storage });

//  Handle Speech Recognition
app.post("/recognize", upload.single("audio"), (req, res) => {
    console.log("✅ Audio received, processing...");

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }

    const audioFilePath = path.join(__dirname, "audio", "recorded.wav");
    const processedAudioPath = path.join(__dirname, "audio", "processed.wav");

    const ffmpeg = spawn("ffmpeg", [
        "-y", "-i", audioFilePath,
        "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le",
        processedAudioPath
    ]);

    ffmpeg.on("close", (code) => {
        if (code !== 0) {
            console.error("❌ FFmpeg conversion failed!");
            return res.status(500).json({ error: "Audio conversion failed!" });
        }

        const pythonProcess = spawn("python", [path.join(__dirname, "recognize.py")]);

        pythonProcess.stdout.on("data", (data) => {
            const recognizedText = data.toString().trim().toLowerCase();
            console.log("🔹 Recognized:", recognizedText);

            //  Video Mapping (Ensure filenames match exactly!)
            const videoMap = {
                "hello": "hello.mp4",
                "yes": "yes.mp4",
                "no": "no.mp4",
                "thank you": "thank you.mp4",
                "sorry": "sorry.mp4"
            };

            let videoFile = videoMap[recognizedText] || null;

            if (videoFile) {
                videoFile = `/Video/${videoFile}`; //  Ensure correct URL for frontend
                console.log(`✅ Mapped video: ${videoFile}`);
            } else {
                console.log("⚠️ No matching video found for:", recognizedText);
            }

            res.json({
                text: recognizedText,
                video: videoFile
            });
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error("❌ Python Error:", data.toString());
        });

        pythonProcess.on("close", (code) => {
            console.log(`🔹 Python process exited with code ${code}`);
        });
    });
});

//  Route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📂 Serving videos from: ${VIDEO_DIR}`);
});
