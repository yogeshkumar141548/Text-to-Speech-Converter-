const express = require("express");
const cors = require("cors");
const fs = require("fs");
const ffmpegPath = require("ffmpeg-static");
const googleTTS = require("google-tts-api");

const app = express();
app.use(cors());
app.use(express.json());

/* 🎧 Generate MP3 */
app.post("/tts", async (req, res) => {
    const { text, lang } = req.body;

    if (!text) return res.status(400).send("Text required");

    try {
        const url = googleTTS.getAudioUrl(text, {
            lang: lang || "en",
            slow: false,
            host: "https://translate.google.com",
        });

        res.json({ url });
    } catch (err) {
        res.status(500).send("TTS failed");
    }
});

app.listen(5000, () =>
    console.log("✅ TTS backend running on http://localhost:5000")
);
