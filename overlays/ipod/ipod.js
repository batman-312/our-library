/* =========================
   OPEN IPOD OVERLAY
========================= */
function openIpodOverlay() {
  const root = document.getElementById("overlay-root");

  const overlay = document.createElement("div");
  overlay.className = "ipod-overlay";

  overlay.innerHTML = `
    <button class="ipod-close">×</button>

    <div class="ipod-container">
      <img src="Assets/Images/ipod.png" class="ipod-img" />

      <!-- WHEEL CONTROLS -->
      <div class="ipod-controls">
        <div class="ipod-btn prev" onclick="prevSong()"></div>
        <div class="ipod-btn play" onclick="togglePlay()"></div>
        <div class="ipod-btn next" onclick="nextSong()"></div>
      </div>

      <!-- MINIMAL PLAYER -->
      <div class="music-player" id="music-player">
        <div class="player-ui">

          <span class="time current" id="current-time">0:00</span>

          <div class="progress-bar" id="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>

          <span class="time total" id="total-time">0:00</span>

        </div>
      </div>

      <!-- SCREEN -->
      <div class="ipod-screen">
        <div id="ipod-menu"></div>
      </div>
    </div>
  `;

  root.appendChild(overlay);

  renderPlaylists();
  setupProgressBar();

  overlay.querySelector(".ipod-close").onclick = () => {
    overlay.remove();
  };
}

/* =========================
   DATA
========================= */
const playlists = [
  {
    name: "#Track2",
    thumbnail: "Assets/Images/playlist1.png",
    songs: [
      { 
        title: "Song 1", 
        file: "Assets/Audio/song1.mp3",
        thumbnail: "Assets/Images/song1.jpg"
      },
      { 
        title: "Song 2", 
        file: "Assets/Audio/song2.mp3",
        thumbnail: "Assets/Images/song2.jpg"
      }
    ]
  },
  {
    name: "❤️❤️",
    thumbnail: "Assets/Images/playlist2.png",
    songs: [
      { 
        title: "Song A", 
        file: "Assets/Audio/songA.mp3",
        thumbnail: "Assets/Images/songA.jpg"
      }
    ]
  }
];

/* =========================
   RENDER PLAYLISTS
========================= */
function renderPlaylists() {
  const menu = document.getElementById("ipod-menu");

  menu.innerHTML = playlists.map((p, i) => `
    <div class="ipod-item" onclick="openPlaylist(${i})">

      <img src="${p.thumbnail}" class="ipod-thumb" />

      <span>${p.name}</span>

    </div>
  `).join("");
}
/* =========================
   OPEN PLAYLIST
========================= */
function openPlaylist(index) {
  const menu = document.getElementById("ipod-menu");
  const playlist = playlists[index];

  menu.innerHTML = `
    <div class="ipod-back" onclick="renderPlaylists()">← Back</div>

    ${playlist.songs.map((s, i) => `
      <div class="ipod-item" onclick="playSong(${index}, ${i})">

        <img src="${s.thumbnail}" class="ipod-thumb" />

        <span>${s.title}</span>

      </div>
    `).join("")}
  `;
}
/* =========================
   AUDIO SYSTEM
========================= */
let audio = new Audio();
let currentPlaylist = 0;
let currentSong = 0;

function playSong(pIndex, sIndex) {
  currentPlaylist = pIndex;
  currentSong = sIndex;

  const song = playlists[pIndex].songs[sIndex];

  audio.src = song.file;
  audio.play();
}

/* =========================
   CONTROLS (WHEEL)
========================= */
function togglePlay() {
  if (!audio.src) return;

  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  const playlist = playlists[currentPlaylist];
  if (!playlist) return;

  currentSong = (currentSong + 1) % playlist.songs.length;
  playSong(currentPlaylist, currentSong);
}

function prevSong() {
  const playlist = playlists[currentPlaylist];
  if (!playlist) return;

  currentSong = (currentSong - 1 + playlist.songs.length) % playlist.songs.length;
  playSong(currentPlaylist, currentSong);
}

/* =========================
   PROGRESS BAR SYSTEM
========================= */
function setupProgressBar() {
  const progressBar = document.getElementById("progress-bar");

  if (!progressBar) return;

  // Click to seek
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    if (audio.duration) {
      audio.currentTime = percent * audio.duration;
    }
  });
}

/* Update progress + time */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  const fill = document.getElementById("progress-fill");
  const current = document.getElementById("current-time");

  if (fill) fill.style.width = percent + "%";
  if (current) current.innerText = formatTime(audio.currentTime);
});

/* Set total duration */
audio.addEventListener("loadedmetadata", () => {
  const total = document.getElementById("total-time");
  if (total) total.innerText = formatTime(audio.duration);
});

/* =========================
   TIME FORMAT
========================= */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}