const text = document.getElementById("text");
const playBtn = document.getElementById("play");
const downloadBtn = document.getElementById("download");
const themeBtn = document.getElementById("theme");
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

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
    const h = Math.random() * canvas.height;
    ctx.fillRect(i * 12, canvas.height - h, 8, h);
  }
}

/* Play browser speech with waveform */
playBtn.onclick = () => {
  const utter = new SpeechSynthesisUtterance(text.value);
  utter.lang = detectLanguage(text.value);
  speechSynthesis.speak(utter);

  const interval = setInterval(drawWave, 100);
  utter.onend = () => clearInterval(interval);
};

/* Download real MP3 using backend */
downloadBtn.onclick = async () => {
  const lang = detectLanguage(text.value);
  const res = await fetch("https://YOUR_BACKEND_URL/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text.value, lang })
  });
  const data = await res.json();
  window.open(data.url); // Opens MP3 in new tab for download
};

/* Dark/Light Mode toggle */
themeBtn.onclick = () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light")
    ? "🌞 Light Mode"
    : "🌙 Dark Mode";
};
