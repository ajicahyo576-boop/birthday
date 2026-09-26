const screens = [...document.querySelectorAll(".screen")];
const petals = document.getElementById("petals");

function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
  if (id === "heroScreen") makePetals(18);
  if (id === "finalScreen") makePetals(35);
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.next));
});

// Secret code demo: 2709. Change it here to your preferred date/code.
let code = "";
const secretCode = "2709";
const dots = [...document.querySelectorAll("#codeDots span")];
const error = document.getElementById("codeError");

function updateDots() {
  dots.forEach((dot, i) => dot.classList.toggle("filled", i < code.length));
}
document.querySelectorAll(".keypad button").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    const action = btn.dataset.action;
    if (key !== undefined && code.length < 4) code += key;
    if (action === "clear") code = "";
    if (action === "back") code = code.slice(0, -1);
    updateDots();
    error.textContent = "";
    if (code.length === 4) {
      if (code === secretCode) {
        setTimeout(() => {
          code = "";
          updateDots();
          showScreen("heroScreen");
        }, 220);
      } else {
        error.textContent = "Kode belum tepat. Coba lagi ✦";
        setTimeout(() => {
          code = "";
          updateDots();
        }, 650);
      }
    }
  });
});

function makePetals(count = 20) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("i");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    p.style.animationDuration = (4 + Math.random() * 5) + "s";
    p.style.animationDelay = Math.random() * 2 + "s";
    petals.appendChild(p);
    setTimeout(() => p.remove(), 11000);
  }
}

const songs = [...document.querySelectorAll(".song")];
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const playBtn = document.getElementById("playBtn");
const vinyl = document.getElementById("vinyl");
const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");

songs.forEach(song => {
  song.addEventListener("click", () => {
    songs.forEach(s => s.classList.remove("active-song"));
    song.classList.add("active-song");
    songTitle.textContent = song.dataset.title;
    songArtist.textContent = song.dataset.artist;
  });
});

// Optional music file. Add assets/music/song.mp3 and uncomment the next line if desired.
// audio.src = "assets/music/song.mp3";

playBtn.addEventListener("click", async () => {
  if (!audio.src) {
    vinyl.classList.toggle("playing");
    playBtn.textContent = vinyl.classList.contains("playing") ? "Ⅱ" : "▶";
    return;
  }
  if (audio.paused) {
    await audio.play();
    vinyl.classList.add("playing");
    playBtn.textContent = "Ⅱ";
  } else {
    audio.pause();
    vinyl.classList.remove("playing");
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progressBar.style.width = ((audio.currentTime / audio.duration) * 100) + "%";
});

document.getElementById("restartBtn").addEventListener("click", () => {
  showScreen("lockScreen");
});

makePetals(12);
