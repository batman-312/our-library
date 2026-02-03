/* ======================================================
   GLOBAL OVERLAY ROUTER
====================================================== */

window.openOverlay = function (type) {
  // Ensure only one overlay at a time
  const root = document.getElementById("overlay-root");
  if (root) root.innerHTML = "";

  switch (type) {
    case "Book":
      if (typeof openBookOverlay === "function") {
        openBookOverlay();
      } else {
        console.warn("Book overlay not loaded");
      }
      break;

    case "Papers":
      if (typeof openPapersOverlay === "function") {
        openPapersOverlay();
      } else {
        console.warn("Papers overlay not loaded");
      }
      break;

    default:
      console.warn("Unknown overlay type:", type);
  }
};

/* =========================================
   INTRO BLUR – CLICK ANYWHERE TO ENTER
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const introBlur = document.getElementById("intro-blur");

  if (!introBlur) return;

  function dismissIntro() {
    introBlur.style.opacity = "0";
    introBlur.style.pointerEvents = "none";

    // fully remove after fade
    setTimeout(() => {
      introBlur.remove();
    }, 900);
  }

  // Click anywhere
  introBlur.addEventListener("click", dismissIntro);

  // Optional: also allow keyboard
  window.addEventListener("keydown", dismissIntro, { once: true });
});


/* ======================================================
   BOOK ICON – HOVER + CLICK
====================================================== */

const book = document.getElementById("book");
let hoverTimer = null;

if (book) {
  book.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      book.classList.add("active");
    }, 1000);
  });

  book.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    book.classList.remove("active");
  });

  book.addEventListener("click", () => {
    openOverlay("Book");
  });
}

/* ======================================================
   BACKGROUND + LIGHT CORD
====================================================== */

const background = document.querySelector(".background");
const lightCord = document.getElementById("lightCord");

let isNight = false;

if (lightCord) {
  lightCord.addEventListener("mouseenter", () => {
    lightCord.classList.add("active");
  });

  lightCord.addEventListener("mouseleave", () => {
    lightCord.classList.remove("active");
  });

  lightCord.addEventListener("click", () => {
    isNight = !isNight;
    background.classList.toggle("night", isNight);

    lightCord.classList.add("pull");
    setTimeout(() => lightCord.classList.remove("pull"), 180);
  });
}

/* ======================================================
   PAPERS ICON – HOVER + CLICK
====================================================== */

const papers = document.getElementById("papers");

if (papers) {
  papers.addEventListener("mouseenter", () => {
    papers.classList.add("active");
  });

  papers.addEventListener("mouseleave", () => {
    papers.classList.remove("active");
  });

  papers.addEventListener("click", () => {
    openOverlay("Papers");
  });
}

/* ======================================================
   PHOTO FRAME
====================================================== */

const frame = document.getElementById("frame");

if (frame) {
  frame.addEventListener("mouseenter", () => {
    frame.classList.add("active");
  });

  frame.addEventListener("mouseleave", () => {
    frame.classList.remove("active");
  });

  frame.addEventListener("click", () => {
  if (typeof openPhotoOverlay === "function") {
    openPhotoOverlay();
  }
});
}

/* ======================================================
   PARTICLES (FIREFLIES)
====================================================== */

function initParticles() {
  const container = document.querySelector(".particles");
  if (!container) return;

  const COUNT = 70;
  const particles = [];

  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function nightMode() {
    return background?.classList.contains("night");
  }

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const size = Math.random() * 4 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;

    p.vx = (Math.random() - 0.5) * 0.3;
    p.vy = (Math.random() - 0.5) * 0.3;
    p.phase = Math.random() * Math.PI * 2;

    container.appendChild(p);
    particles.push(p);
  }

  function animate() {
    const night = nightMode();

    particles.forEach(p => {
      const rect = p.getBoundingClientRect();
      const dx = mouseX - rect.left;
      const dy = mouseY - rect.top;
      const dist = Math.hypot(dx, dy) + 0.001;

      p.phase += night ? 0.015 : 0.03;

      p.vx += Math.sin(p.phase) * 0.02;
      p.vy += Math.cos(p.phase) * 0.02;

      const attract = night ? 60 / dist : 120 / dist;
      p.vx += (dx / dist) * Math.min(attract, night ? 0.08 : 0.35);
      p.vy += (dy / dist) * Math.min(attract, night ? 0.08 : 0.35);

      p.vx *= night ? 0.985 : 0.94;
      p.vy *= night ? 0.985 : 0.94;

      p.style.transform = `translate(${p.vx}px, ${p.vy}px)`;
      p.style.opacity = night
        ? 0.5 + Math.sin(p.phase * 2) * 0.4
        : 0.6;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

initParticles();

/* ======================================================
   VINYL PLAYER (AUDIO + ARM)
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const toneArm = document.getElementById("toneArm");
  const cd = document.querySelector(".cd");

  const crackle = document.getElementById("vinylAudio");
  const song = document.getElementById("songAudio");
  const pop = document.getElementById("vinylPop");

  if (!toneArm || !song || !crackle) return;

  let isPlaying = false;
  let songTimeout = null;

  function fadeIn(audio, target) {
    audio.volume = 0;
    audio.play().catch(() => {});
    const i = setInterval(() => {
      audio.volume = Math.min(audio.volume + 0.02, target);
      if (audio.volume >= target) clearInterval(i);
    }, 40);
  }

  function fadeOut(audio) {
    const i = setInterval(() => {
      audio.volume = Math.max(audio.volume - 0.02, 0);
      if (audio.volume <= 0) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(i);
      }
    }, 40);
  }

  function startPlayback() {
    isPlaying = true;

    toneArm.classList.remove("lifting");
    toneArm.classList.add("playing");
    cd?.classList.add("spinning");

    pop.currentTime = 0;
    pop.volume = 0.15;
    pop.play().catch(() => {});

    setTimeout(() => fadeIn(crackle, 0.32), 150);
    songTimeout = setTimeout(() => fadeIn(song, 0.22), 2000);
  }

  window.stopPlayback = function () {
    isPlaying = false;
    clearTimeout(songTimeout);

    toneArm.classList.remove("playing");
    toneArm.classList.add("lifting");
    cd?.classList.remove("spinning");

    fadeOut(song);
    fadeOut(crackle);

    setTimeout(() => {
      toneArm.classList.remove("lifting");
    }, 900);
  }

  toneArm.addEventListener("click", () => {
    toneArm.classList.remove("playing", "lifting");
    void toneArm.offsetWidth; // reset animation state
    isPlaying ? stopPlayback() : startPlayback();
  });

  song.addEventListener("ended", stopPlayback);
});

/* =========================================
   VINYL SPIN + NATURAL SLOWDOWN (FINAL)
========================================= */

const vinylFocus = document.getElementById("vinyl-focus");
const vinylDisc  = document.querySelector(".vinyl-disc");
const songAudio  = document.getElementById("songAudio");

if (vinylFocus && vinylDisc && songAudio) {

  /* Show vinyl when song starts */
  songAudio.addEventListener("play", () => {
    vinylFocus.classList.add("active");
    vinylDisc.style.setProperty("--spin-speed", "6s"); // normal speed
  });

  /* Gradual slowdown near the end */
  songAudio.addEventListener("timeupdate", () => {
    const duration = songAudio.duration;
    const current  = songAudio.currentTime;

    if (!duration || duration === Infinity) return;

    const remaining = duration - current;

    // Start slowing in last 8 seconds
    if (remaining <= 8) {
      const t = Math.max(remaining / 8, 0);   // 1 → 0
const eased = 1 - Math.pow(t, 3);       // ease-out curve
const speed = 6 + eased * 14;           // 6s → ~20s
      vinylDisc.style.setProperty("--spin-speed", `${speed}s`);
    }
  });

  /* Stop spin naturally when song ends */
  songAudio.addEventListener("ended", () => {
    vinylDisc.style.setProperty("--spin-speed", "0s");
  });
}


/* =========================================
   VINYL OVERLAY TONE ARM CONTROL
========================================= */

const toneArmOverlay = document.getElementById("toneArmOverlay");

if (toneArmOverlay && songAudio && vinylFocus) {

  // When song starts
  songAudio.addEventListener("play", () => {
    toneArmOverlay.classList.remove("disengaged");
    toneArmOverlay.classList.add("engaged");
  });

  // Click overlay arm to stop song
  toneArmOverlay.addEventListener("click", (e) => {
    e.stopPropagation();

    toneArmOverlay.classList.remove("engaged");
    toneArmOverlay.classList.add("disengaged");

   if (typeof window.stopPlayback === "function") {
  window.stopPlayback();
}
    setTimeout(() => {
      vinylFocus.classList.remove("active");
    }, 900);
  });

  // If song ends naturally
  songAudio.addEventListener("ended", () => {
    toneArmOverlay.classList.remove("engaged");
    toneArmOverlay.classList.add("disengaged");

    setTimeout(() => {
      vinylFocus.classList.remove("active");
    }, 900);
  });
}
