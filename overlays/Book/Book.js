/* ====================
   BOOK OVERLAY LOGIC
   (NO ANIMATIONS)
===================== */

const bookIcon = document.getElementById("book");
const bookOverlay = document.getElementById("book-overlay");
const bookClose = document.querySelector(".book-close");

const pageLeft = document.getElementById("page-left");
const pageRight = document.getElementById("page-right");

const nextBtn = document.getElementById("next-page");
const prevBtn = document.getElementById("prev-page");

/* Page turn sounds */
const nextSound = document.getElementById("pageNextSound");
const prevSound = document.getElementById("pagePrevSound");

nextSound.volume = 0.45;
prevSound.volume = 0.45;


function playWithRandomPitch(audio) {
  const min = 0.5;
  const max = 1.5;

  audio.pause();
  audio.currentTime = 0;
  audio.playbackRate = Math.random() * (max - min) + min;

  audio.play().catch(() => {});
}

/* Book content */
const pages = [
  `
  <b><em>The Three Crossings</em></b><br>
  Some people don't arrive all at once. They pass through your life softly,
  more than once, until the moment finally feels <em>right</em>.<br><br>

  You were there, before I understood why. Then we met again, and the timing
  was wrong, the words didn't land, and we (i) walked away with the wrong
  impressions. But the next time, everything felt
  different. One conversation was enough. Nothing forced, nothing missing.<br><br>

  Just two souls finally meeting at the right time. And since then, you
  haven't felt like someone I met… <i>you've felt like someone I found.</i>
  `,
  /*____________________________________________________________________________________________*/
  `
  <img src="overlays/Book/us.gif" class="page-photo polaroid left">
  <div style="clear: both;"></div>

  Seeing your smile literally changes my whole day. Just know this....that i will never let go of you...and my feelings for you will never disappear. I wish i could explain it to you...how amazing youre to me, how i can look at you forever and never get tired of that pretty face of yours. The sound of <i>your voice</i> always gives me butterflies, how seeing you laugh makes me the happiest person alive.
  `,
  /*____________________________________________________________________________________________*/
  `
  I wish i could fully tell you how much i love you, but you leave me at a loss of words....and even if i could put everyhing together it still wont come close to showing you how much you really mean to me
  <br><br>
  I know i am not the most amazing or perfect guy, but i promise to give my all to you, <i>to us. </i>
  Ill give you reassurance, all my love, care, affection, loyalty and attention. Ill do anything to make you feel valued, safe. I want to be my best for you...i promise..
  <br>
  I love you no matter what. No matter how much i get hurt, no matter what happens or what anyone sayes....i will always love you. I love EVERYTHING about you - 
  `,
  /*____________________________________________________________________________________________*/
  `
  - your voice, your laugh, the way you talk to me, the way you hold my hand when youre with me, the way you make everything feel so special, the way you look at me, the way you say my name sounds different, how you bring colours to my dull days....<i>You</i>.
  <br>
  I dont know what the future holds or what life might throw at us, but i know we'll get through it together. I know what i want and what i need, and thats <i>YOU</i>. Nothing will ever stop me from loving you. Youre the best thing that has ever happened to me.<br>
  <p>
  You are my home.<br>
  I love you so much.<br>
  <span class="book-signature">
   Eternally yours<br>
   ~Buttowski
  </span>
  </p>
  `
];
let spreadIndex = 0;

/* Render pages */
function renderPages() {
  pageLeft.innerHTML = pages[spreadIndex * 2] || "";
  pageRight.innerHTML = pages[spreadIndex * 2 + 1] || "";

  prevBtn.style.visibility = spreadIndex === 0 ? "hidden" : "visible";
  nextBtn.style.visibility =
    spreadIndex >= Math.floor(pages.length / 2) - 1
      ? "hidden"
      : "visible";
}

/* Open book */
bookIcon.addEventListener("click", () => {
  spreadIndex = 0;
  renderPages();

  bookOverlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    bookOverlay.classList.add("visible");
  });
});

/* Close book */
function closeBook() {
  bookOverlay.classList.remove("visible");
  setTimeout(() => {
    bookOverlay.classList.add("hidden");
  }, 400);
}

bookClose.addEventListener("click", closeBook);

/* Navigation (instant page switch + sound) */
nextBtn.addEventListener("click", () => {
  if (spreadIndex < Math.floor(pages.length / 2) - 1) {
    spreadIndex++;
    renderPages();

    playWithRandomPitch(nextSound);
  }
});

prevBtn.addEventListener("click", () => {
  if (spreadIndex > 0) {
    spreadIndex--;
    renderPages();

    playWithRandomPitch(prevSound);
  }
});