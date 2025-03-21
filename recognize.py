import wave
import json
import sys
from vosk import Model, KaldiRecognizer

MODEL_PATH = "backend/vosk-model-small-en-us-0.15"
AUDIO_PATH = "backend/audio/processed.wav"  #  Read processed file

# Load Vosk model
model = Model(MODEL_PATH)
rec = KaldiRecognizer(model, 16000)

try:
    with wave.open(AUDIO_PATH, "rb") as wf:
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            rec.AcceptWaveform(data)
except wave.Error:
    print("ERROR: Invalid WAV format. Please check the audio file.")
    sys.exit(1)

# Extract text
result = json.loads(rec.FinalResult())
print(result["text"])