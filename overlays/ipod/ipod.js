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

    <div class="volume-controls">
  <button onclick="volumeDown()">-</button>
  <button onclick="volumeUp()">+</button>
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
    name: "Reminder of You",
    thumbnail: "Assets/Images/reminder-of-you-cover.jpg",
    songs: [
      {
  title: "Until I Found You",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622923/Stephen_Sanchez_-_Until_I_Found_You_Official_Video_-_StephenSanchezVEVO_nrqvhs.mp3",
  thumbnail: "Assets/Images/reminder of you/1.jpg"
},
{
  title: "Those Eyes",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622921/New_West_-_Those_Eyes_-_New_West_vta3lx.mp3",
  thumbnail: "Assets/Images/reminder of you/2.jpg"
},
{
  title: "Yellow",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622922/coldplay_-_Yellow_Lyrics_-_Dan_Music_gchobo.mp3",
  thumbnail: "Assets/Images/reminder of you/3.jpg"
},
{
  title: "Best Part",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622921/Daniel_Caesar_-_Best_Part_Audio_ft._H.E.R._-_HERMusicVEVO_ydk14k.mp3",
  thumbnail: "Assets/Images/reminder of you/4.jpg"
},
{
  title: "Pink + White",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622919/Frank_Ocean_-_Pink_White_-_Blonded_tsb8uh.mp3",
  thumbnail: "Assets/Images/reminder of you/5.jpg"
},
{
  title: "Sure Thing",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775622921/Miguel_-_Sure_Thing_Lyrics_-_Dan_Music_bxtthx.mp3",
  thumbnail: "Assets/Images/reminder of you/6.jpg"
},
{
  title: "Snooze",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775622920/SZA_-_Snooze_Audio_-_SZAVEVO_fbctjf.mp3",
  thumbnail: "Assets/Images/reminder of you/7.jpg"
},
{
  title: "C U Girl",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622918/C_U_Girl_-_Steve_Lacy_mnkqnr.mp3",
  thumbnail: "Assets/Images/reminder of you/8.jpg"
},
{
  title: "My Kind of Woman",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622917/Mac_DeMarco____My_Kind_Of_Woman_-_CapturedTracks_bl1qry.mp3",
  thumbnail: "Assets/Images/reminder of you/9.jpg"
},
{
  title: "Babydoll",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622916/Dominic_Fike_Babydoll_Official_Audio_-_Dominic_Fike_ljtj0i.mp3",
  thumbnail: "Assets/Images/reminder of you/10.jpg"
},
{
  title: "Something About You",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622916/Eyedress_Dent_May_-_Something_About_You_-_David_Dean_Burkhart_y6nqpw.mp3",
  thumbnail: "Assets/Images/reminder of you/11.jpg"
},
{
  title: "Who Knows",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622916/Daniel_Caesar_-_Who_Knows_Official_Lyric_Video_-_Daniel_Caesar_vdavt2.mp3",
  thumbnail: "Assets/Images/reminder of you/12.jpg"
},
{
  title: "Kingston",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622918/Faye_Webster_Kingston_Lyrics_-_Worldly_Hits_kfskre.mp3",
  thumbnail: "Assets/Images/reminder of you/13.jpg"
},
{
  title: "Thinking Bout You",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622916/Thinkin_Bout_You_-_Frank_Ocean_xciid4.mp3",
  thumbnail: "Assets/Images/reminder of you/14.jpg"
},
{
  title: "I Wanna Be Yours",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622920/I_Wanna_Be_Yours_-_Arctic_Monkeys_xfxscv.mp3",
  thumbnail: "Assets/Images/reminder of you/15.jpg"
},
{
  title: "My Love Mine All Mine",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622913/Mitski_-_My_Love_Mine_All_Mine_Official_Video_-_MitskiVEVO_hkanwe.mp3",
  thumbnail: "Assets/Images/reminder of you/16.jpg"
},
{
  title: "There Is a Light That Never Goes Out",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622913/There_Is_a_Light_That_Never_Goes_Out_2011_Remaster_-_The_Smiths_wktxa7.mp3",
  thumbnail: "Assets/Images/reminder of you/17.jpg"
},
{
  title: "Like You Do",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622913/Joji_-_Like_You_Do_-_Joji_zmulut.mp3",
  thumbnail: "Assets/Images/reminder of you/18.jpg"
},
{
  title: "Ew",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622913/Joji_-_Ew_-_Joji_ey3yaa.mp3",
  thumbnail: "Assets/Images/reminder of you/19.jpg"
},
{
  title: "NIGHTS LIKE THIS",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622909/The_Kid_LAROI_-_NIGHTS_LIKE_THIS_-_Minimal_Sounds_raaktf.mp3",
  thumbnail: "Assets/Images/reminder of you/20.jpg"
},
{
  title: "Apocalypse",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622911/Apocalypse_-_Cigarettes_After_Sex_-_Cigarettes_After_Sex_avoprp.mp3",
  thumbnail: "Assets/Images/reminder of you/21.jpg"
},
{
  title: "Heavenly",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622910/Heavenly_-_Cigarettes_After_Sex_-_Cigarettes_After_Sex_mdppvb.mp3",
  thumbnail: "Assets/Images/reminder of you/22.jpg"
},
{
  title: "Sweet",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622913/Sweet_-_Cigarettes_After_Sex_-_Cigarettes_After_Sex_z8ln0y.mp3",
  thumbnail: "Assets/Images/reminder of you/23.jpg"
},
{
  title: "No. 1 Party Anthem",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622906/No._1_Party_Anthem_-_Arctic_Monkeys_jiap6n.mp3",
  thumbnail: "Assets/Images/reminder of you/24.jpg"
},
{
  title: "Co2",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622906/Prateek_Kuhad_-_Co2_Official_Audio_-_Prateek_Kuhad_s9btul.mp3",
  thumbnail: "Assets/Images/reminder of you/25.jpg"
},
{
  title: "cold/mess",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622913/Prateek_Kuhad_-_cold_mess_Lyrics_-_Friday_oda1o9.mp3",
  thumbnail: "Assets/Images/reminder of you/26.jpg"
},
{
  title: "Always Forever",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622906/Cults_-_Always_Forever_-_kaonashi_dq191h.mp3",
  thumbnail: "Assets/Images/reminder of you/27.jpg"
},
{
  title: "I Thought I Saw Your Face Today",
  file: "https://res.cloudinary.com/dxlkxqmax/video/upload/v1775622905/I_Thought_I_Saw_Your_Face_Today_-_AcultKings_hcxmod.mp3",
  thumbnail: "Assets/Images/reminder of you/28.jpg"
},

    ]
  },
  {
    name: "❤️❤️",
    thumbnail: "Assets/Images/playlist2.png",
    songs: [
    { title: "Pal Pal Dil Ke Paas", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775610019/pal-pal-dil-ke-paas_auvmlv.mp3", thumbnail: "Assets/Images/playlist2/1.jpg" },
    { title: "O Rangrez", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775610005/O_Rangrez_brdh09.mp3", thumbnail: "Assets/Images/playlist2/2.jpg" },
    { title: "Tum Tak", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609898/Tum_Tak_qjrswh.mp3", thumbnail: "Assets/Images/playlist2/3.jpg" },
    { title: "Raat Bhar", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609898/Raat_Bhar_q5yi4n.mp3", thumbnail: "Assets/Images/playlist2/4.jpg" },
    { title: "Pehli Nazar Mein", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609897/Pehli_Nazar_Mein_qley5v.mp3", thumbnail: "Assets/Images/playlist2/5.jpg" },
    { title: "Tera Hone Laga Hoon", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609893/Tera_Hone_Laga_Hoon_trdbmw.mp3", thumbnail: "Assets/Images/playlist2/6.jpg" },
    { title: "Pani Da Rang", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609874/Pani_Da_Rang_zxdxvn.mp3", thumbnail: "Assets/Images/playlist2/7.jpg" },
    { title: "Zaalima", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609864/Zaalima_scnp0a.mp3", thumbnail: "Assets/Images/playlist2/8.jpg" },
    { title: "Main Rang Sharbaton Ka", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609863/Main_rang_sharbaton_ka_ljnfw2.mp3", thumbnail: "Assets/Images/playlist2/9.jpg" },
    { title: "Tu Hi Meri Shab Hai", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609860/Tu_Hi_Meri_Shab_Hai_htvnmf.mp3", thumbnail: "Assets/Images/playlist2/10.jpg" },
    { title: "Ye Fitoor Mera", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609858/Ye_Fitoor_Mera_uvz8fs.mp3", thumbnail: "Assets/Images/playlist2/11.jpg" },
    { title: "Ye Tune Kya Kiya", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609839/Ye_Tune_Kya_Kiya_ep2guf.mp3", thumbnail: "Assets/Images/playlist2/15.jpg" },
    { title: "Jeene Laga Hoon", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609837/Jeene_Laga_Hoon_fky7zm.mp3", thumbnail: "Assets/Images/playlist2/12.jpg" },
    { title: "Laapata", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609828/Laapata_ffyjmh.mp3", thumbnail: "Assets/Images/playlist2/13.jpg" },
    { title: "I Love You", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609816/I_Love_you_qk9f97.mp3", thumbnail: "Assets/Images/playlist2/14.jpg" },
    { title: "Ishq Wala Love", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609814/Ishq_Wala_Love_dbks5d.mp3", thumbnail: "Assets/Images/playlist2/16.jpg" },
    { title: "Tum Ho", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609813/Tum_Ho_i9ztv8.mp3", thumbnail: "Assets/Images/playlist2/17.jpg" },
    { title: "Tum Se Hi", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609805/Tum_Se_Hi_ouno2a.mp3", thumbnail: "Assets/Images/playlist2/18.jpg" },
    { title: "Guzarish", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609795/Guzarish_mvyjuy.mp3", thumbnail: "Assets/Images/playlist2/19.jpg" },
    { title: "Finding Her", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609780/Finding_Her_jvrqsp.mp3", thumbnail: "Assets/Images/playlist2/20.jpg" },
    { title: "Hoor", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609769/Hoor_izmhpx.mp3", thumbnail: "Assets/Images/playlist2/21.jpg" },
    { title: "Teri Jhuki Nazar", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609758/Teri_Jhuki_Nazar_nilj7f.mp3", thumbnail: "Assets/Images/playlist2/22.jpg" },
    { title: "Tere Liye", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609754/Tere_Liye_ltcgaq.mp3", thumbnail: "Assets/Images/playlist2/23.jpg" },
    { title: "Haareya", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609749/Haareya_e7l2g8.mp3", thumbnail: "Assets/Images/playlist2/24.jpg" },
    { title: "Tu Chahiye", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609738/Tu_Chahiye_alxw8k.mp3", thumbnail: "Assets/Images/playlist2/25.jpg" },
    { title: "Dil Diyan Gallan", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609725/Dil_Diyan_Gallan_sk8bce.mp3", thumbnail: "Assets/Images/playlist2/26.jpg" },
    { title: "Chaar Kadam", file: "https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775609716/Chaar_Kadam_c0g3wb.mp3", thumbnail: "Assets/Images/playlist2/27.jpg" },
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

    ${
      playlist.name.toLowerCase() === "reminder of you"
        ? `
        <div class="ipod-item spotify-link" onclick="openSpotify()">
          <span>Open on Spotify</span>
        </div>
        `
        : ""
    }
  `;
}

/* =========================
   IPOD UI
========================= */
function renderNowPlaying(song, playlistName) {
  const menu = document.getElementById("ipod-menu");

  menu.innerHTML = `
  <div class="ipod-back" onclick="openPlaylist(${currentPlaylist})">← Back</div>

  <div class="now-playing">

    <div class="now-header">Now Playing</div>

    <img src="${song.thumbnail}" class="now-art" />

    <div class="now-title">${song.title}</div>
    <div class="now-artist">${playlistName}</div>

  </div>
`;
}
/* =========================
   AUDIO SYSTEM
========================= */
let audio = new Audio();

const clickSound = new Audio("https://res.cloudinary.com/dxlkxqmax/video/upload/q_auto/f_auto/v1775651966/150382__orginaljun__soft-sound-plastic-button-click_w7wufg.mp3");
clickSound.volume = 0.3; 

audio.addEventListener("ended", () => {
  nextSong();
});
audio.addEventListener("play", () => {
  audio.volume = 0.1;
});
audio.preload = "metadata";
audio.crossOrigin = "anonymous";

let currentPlaylist = 0;
let currentSong = 0;

function playSong(pIndex, sIndex) {
  currentPlaylist = pIndex;
  currentSong = sIndex;

  const song = playlists[pIndex].songs[sIndex];

  audio.src = song.file;

  audio.volume = 0.4;  // 👈 SET BEFORE
  audio.play();

  setTimeout(() => {
    audio.volume = 0.15;
    console.log("forced volume:", audio.volume);
  }, 50);

  renderNowPlaying(song, playlists[pIndex].name);}

console.log("volume:", audio.volume);

/* =========================
   CONTROLS (WHEEL)
========================= */
function togglePlay() {
clickSound.currentTime = 0;
  clickSound.play();

  if (!audio.src) return;

  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  clickSound.currentTime = 0;
clickSound.play();

  const playlist = playlists[currentPlaylist];
  if (!playlist) return;

  currentSong = (currentSong + 1) % playlist.songs.length;
  playSong(currentPlaylist, currentSong);
}

function prevSong() {
  clickSound.currentTime = 0;
  clickSound.play();

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


function openSpotify() {
  window.open("https://open.spotify.com/playlist/6iqe7MqZHnbPi2FxBo42pS?si=kWHRMjqoSvCuwhCJjxXoIQ", "_blank");
}


function volumeUp() {
  audio.volume = Math.min(1, audio.volume + 0.1);
}

function volumeDown() {
  audio.volume = Math.max(0, audio.volume - 0.1);
}