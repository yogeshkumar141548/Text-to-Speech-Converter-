const express = require("express");
const cors = require("cors");
const googleTTS = require("google-tts-api");

const app = express();
app.use(cors());
app.use(express.json());

/* Generate MP3 URL */
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

/* Dynamic PORT for Render or local */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`TTS backend running on port ${PORT}`));
