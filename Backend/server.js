const express = require("express");
const cors = require("cors");
const googleTTS = require("google-tts-api");

const app = express();

app.use(cors());
app.use(express.json());

/* Health check */
app.get("/", (req, res) => {
  res.send("TTS Backend Running 🚀");
});

/* Generate MP3 URL */
app.post("/tts", async (req, res) => {
  try {
    const { text, lang } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (text.length > 200) {
      return res.status(400).json({
        error: "Text too long (max 200 characters)"
      });
    }

    const url = googleTTS.getAudioUrl(text, {
      lang: lang || "en",
      slow: false,
      host: "https://translate.google.com",
    });

    res.json({ url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS generation failed" });
  }
});

/* Dynamic PORT for Render or local */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ TTS backend running on port ${PORT}`)
);
