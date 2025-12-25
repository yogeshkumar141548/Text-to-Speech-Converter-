const text = document.getElementById("text");
const playBtn = document.getElementById("play");
const downloadBtn = document.getElementById("download");
const themeBtn = document.getElementById("theme");
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

/* Canvas size */
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

/* Language auto-detection */
function detectLanguage(txt) {
  if (/[\u0900-\u097F]/.test(txt)) return "hi"; // Hindi
  if (/[\u0600-\u06FF]/.test(txt)) return "ar"; // Arabic
  return "en";
}

/* Waveform animation */
function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff7a7a";

  for (let i = 0; i < 30; i++) {
    const height = Math.random() * canvas.height;
    ctx.fillRect(i * 12, canvas.height - height, 8, height);
  }
}

/* Play Text to Speech */
playBtn.onclick = () => {
  if (!text.value.trim()) {
    alert("Please enter text first!");
    return;
  }

  speechSynthesis.cancel(); // stop previous speech

  const utter = new SpeechSynthesisUtterance(text.value);
  utter.lang = detectLanguage(text.value);
  speechSynthesis.speak(utter);

  const interval = setInterval(drawWave, 100);
  utter.onend = () => clearInterval(interval);
};

/* Download MP3 (Backend required) */
downloadBtn.onclick = async () => {
  if (!text.value.trim()) {
    alert("Please enter text first!");
    return;
  }

  const lang = detectLanguage(text.value);

  try {
    const res = await fetch(
      "https://text-to-speech-converter-s8lc.onrender.com/tts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.value, lang })
      }
    );

   
