const text = document.getElementById("text");
const playBtn = document.getElementById("play");
const downloadBtn = document.getElementById("download");
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

/* 🌍 Language Auto-Detect */
function detectLanguage(txt) {
  if (/[\u0900-\u097F]/.test(txt)) return "hi"; // Hindi
  if (/[\u0600-\u06FF]/.test(txt)) return "ar"; // Arabic
  return "en";
}

/* 🔊 Waveform */
function drawWave() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#ff7a7a";
  for (let i=0;i<30;i++){
    const h = Math.random()*canvas.height;
    ctx.fillRect(i*12, canvas.height-h, 8, h);
  }
}

/* ▶ Browser Speech */
playBtn.onclick = () => {
  const utter = new SpeechSynthesisUtterance(text.value);
  utter.lang = detectLanguage(text.value);
  speechSynthesis.speak(utter);

  const interval = setInterval(drawWave, 100);
  utter.onend = () => clearInterval(interval);
};

/* 💾 REAL MP3 DOWNLOAD */
downloadBtn.onclick = async () => {
  const lang = detectLanguage(text.value);
  const res = await fetch("http://localhost:5000/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text.value, lang })
  });

  const data = await res.json();
  window.open(data.url);
};
