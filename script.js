const songs = [
  {
    title: "Diet Pepsi",
    artist: "Addison Rae",
    src: "songs/diet_pepsi.mp3",
    img: "artists/addison.jpg"
  },
  {
    title: "Night Train",
    artist: "Milena",
    src: "songs/night_train.mp3",
    img: "artists/milena.jpg"
  },
  {
    title: "SexyBack",
    artist: "Justin Timberlake",
    src: "songs/sexyback.mp3",
    img: "artists/justin.jpg"
  },
  {
    title: "Good For You",
    artist: "Selena Gomez",
    src: "songs/good_for_you.mp3",
    img: "artists/selena.jpg"
  },
  {
    title: "Dangerous Hands",
    artist: "Austin Giorgio",
    src: "songs/dangerous_hands.mp3",
    img: "artists/austin.jpg"
  },
  {
    title: "Here",
    artist: "Alessia Cara",
    src: "songs/here.mp3",
    img: "artists/alessia.jpg"
  },
  {
    title: "induvadana",
    artist: "chiru",
    src: "songs/rapo.mp3",
    img: "artists/rapo.jpg"
  }
];

let current = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");
const img = document.getElementById("artist-img");
const cd = document.getElementById("cd");
const playBtn = document.getElementById("play-btn");
const loopBtn = document.getElementById("loop-btn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const progressContainer = document.querySelector(".progress-container");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  img.src = song.img;
  playBtn.textContent = "Play";
  if (progress) progress.style.width = "0%";
  if (currentTimeEl) currentTimeEl.textContent = "00:00";
  if (totalTimeEl) totalTimeEl.textContent = "00:00";
  updatePlaylistHighlight();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    cd.classList.add("playing");
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    cd.classList.remove("playing");
    playBtn.textContent = "Play";
  }
}

function nextSong() {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
  cd.classList.add("playing");
  playBtn.textContent = "Pause";
}

function prevSong() {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  audio.play();
  cd.classList.add("playing");
  playBtn.textContent = "Pause";
}

function toggleLoop() {
  audio.loop = !audio.loop;
  loopBtn.textContent = "Loop: " + (audio.loop ? "On" : "Off");
}

audio.addEventListener("ended", () => {
  if (!audio.loop) nextSong();
});

audio.addEventListener("timeupdate", () => {
  if (progress) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
  }
  updateTime();
});

function seek(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function updateTime() {
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  if (totalTimeEl) totalTimeEl.textContent = isNaN(audio.duration) ? "00:00" : formatTime(audio.duration);
}

// Build Playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    current = index;
    loadSong(current);
    audio.play();
    cd.classList.add("playing");
    playBtn.textContent = "Pause";
  };
  playlist.appendChild(li);
});

function updatePlaylistHighlight() {
  const items = playlist.querySelectorAll("li");
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === current);
  });
}

audio.addEventListener("play", updatePlaylistHighlight);

loadSong(current);
