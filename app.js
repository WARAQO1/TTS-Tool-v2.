const textBox = document.getElementById("textBox");
const speakButton = document.getElementById("speakButton");
const saveButton = document.getElementById("saveButton");
const voiceDropdown = document.getElementById("voiceDropdown");
const samples = document.querySelectorAll(".sample");

let synth = window.speechSynthesis;
let voices = [];

// Populate voices
function loadVoices() {
    voices = synth.getVoices();
    voiceDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

// Speak text
function speakText(text) {
    if (!text) {
        alert("Please enter some text!");
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(voice => voice.name === voiceDropdown.value);
    if (selectedVoice) utterance.voice = selectedVoice;
    synth.speak(utterance);
}

// Save text as MP3
async function saveAsMP3(text) {
    alert("MP3 saving feature requires a server-side setup. Stay tuned!");
}

// Event listeners
speakButton.addEventListener("click", () => speakText(textBox.value));
saveButton.addEventListener("click", () => saveAsMP3(textBox.value));
samples.forEach(button => button.addEventListener("click", () => textBox.value = button.dataset.text));

// Load voices on page load
if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
window.onload = loadVoices;
