/* ===============================
   LYRICS OVERLAY (FINAL)
   PASSIVE – NO AUDIO CONTROL
================================ */

const SONG_DELAY = 0;

const song = document.getElementById("songAudio");   // <-- FIXED
const lyricsBox = document.getElementById("lyrics-box");
const lyricsLine = document.getElementById("lyrics-line");

if (!song || !lyricsBox || !lyricsLine) {
  console.warn("Lyrics elements missing");
}

/* -------------------------------
   LYRIC DATA
-------------------------------- */

const lyrics = [
  { time: 0, text: "..." },

  { time: 7.120, text: "Wise men say..." },
  { time: 14.240, text: "Only fools rush in..." },
  { time: 21.320, text: "But I can't help..." },
  { time: 28.400, text: "Falling in love with you 🤍" },

  { time: 36.660, text: "Shall I stay?" },
  { time: 43.750, text: "Would it be a sin..." },
  { time: 50.850, text: "If I can't help..." },
  { time: 56.580, text: "Falling in love with you?" },

  { time: 64.800, text: "Like a river flows..." },
  { time: 69.350, text: "Surely to the sea..." },
  { time: 72.820, text: "Darling, so it goes..." },
  { time: 76.150, text: "Some things are meant to be." },

  { time: 82.850, text: "Take my hand..." },
  { time: 89.950, text: "Take my whole life, too 🤍" },
  { time: 97.100, text: "For I can't help..." },
  { time: 104.200, text: "Falling in love with you ❤️" },

  { time: 111.780, text: "Like a river flows..." },
  { time: 115.380, text: "Surely to the sea..." },
  { time: 118.820, text: "Darling, so it goes..." },
  { time: 122.050, text: "Some things are meant to be." },

  { time: 128.950, text: "Take my hand..." },
  { time: 136.050, text: "Take my whole life, too" },
  { time: 143.150, text: "For I can't help..." },
  { time: 150.200, text: "Falling in love with you" },

  { time: 157.180, text: "For I can't help" },
  { time: 164.250, text: "Falling in love with YOOUUUUUUUUUUUUU!.." }
];

let lyricIndex = 0;
let isTransitioning = false;

/* -------------------------------
   AUDIO EVENTS
-------------------------------- */

// When song starts
song.addEventListener("play", () => {
  lyricIndex = 0;
  isTransitioning = false;

  lyricsLine.textContent = "";
  lyricsLine.classList.remove("show");

  lyricsBox.classList.remove("hidden");
  lyricsBox.classList.add("visible");
});

// Sync lyrics
song.addEventListener("timeupdate", () => {
  if (lyricIndex >= lyrics.length) return;
  if (isTransitioning) return;

  if (song.currentTime + SONG_DELAY >= lyrics[lyricIndex].time) {
    isTransitioning = true;

    lyricsLine.classList.remove("show");

    setTimeout(() => {
      lyricsLine.textContent = lyrics[lyricIndex].text;
      lyricsLine.classList.add("show");

      lyricIndex++;
      isTransitioning = false;
    }, 300);
  }
});

// Hide lyrics on pause or end
song.addEventListener("pause", hideLyrics);
song.addEventListener("ended", hideLyrics);

/* -------------------------------
   HELPERS
-------------------------------- */

function hideLyrics() {
  lyricsBox.classList.remove("visible");
  lyricsLine.classList.remove("show");

  isTransitioning = false;

  setTimeout(() => {
    lyricsBox.classList.add("hidden");
    lyricsLine.textContent = "";
  }, 600);
}
