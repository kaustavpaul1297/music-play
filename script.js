const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");
// Music
const songs = [
  {
    name: "kaustav-1",
    displayName: "Friends",
    artist: "Anne Marie, Marshmello",
  },
  {
    name: "kaustav-2",
    displayName: "Kiss My Uh-Oh",
    artist: "Anne Marie, Little Mix",
  },
  {
    name: "kaustav-3",
    displayName: "Afterglow",
    artist: "Ed Sheeran",
  },
  {
    name: "kaustav-4",
    displayName: "Rewrite the stars",
    artist: "James Arthur, Anne Marie",
  },
];
// Check if playing
let isPlaying = false;

// Play song
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "Pause");
}

// Pause song
function pauseSong() {
  isPlaying = false;
  music.pause();

  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "Play");
}

//Play or pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = `/img/${song.name}.jpg`;
  music.src = `/music/${song.name}.mp3`;
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgessBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    //   Update bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}
// On Load
loadSong(songs[songIndex]);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgessBar);
