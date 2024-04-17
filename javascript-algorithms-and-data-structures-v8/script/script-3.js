const playlistSongs = document.getElementById("playlist-songs");
const albumArt = document.getElementById("player-album-art");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "菜の花のように",
    romaji: "Na no hana no youni",
    artist: "relier feat. TORi",
    duration: "4:47",
    src: "https://www.dropbox.com/scl/fi/oj4zhc1wzvpc2be5l9y5e/.m4a?rlkey=tm9v0sn8amh6imbzx9kua76gz&raw=1",
    source: "SIW7cNyQPak",
  },
  {
    id: 1,
    title: "カナリア",
    romaji: "Kanaria",
    artist: "relier feat. TORi",
    duration: "3:12",
    src: "https://www.dropbox.com/scl/fi/pg4ahzv1uduybbnc7b3cf/.mp3?rlkey=unriwcp7euv9tkgnoh1gw4tib&raw=1",
    source: "sNcDYUHB0FI",
  },
  {
    id: 2,
    title: "in the rain",
    romaji: "",
    artist: "TORi",
    duration: "5:23",
    src: "https://www.dropbox.com/scl/fi/ch26ek3zmtkelcohw3tgw/in-the-rain.mp3?rlkey=a9f6db5thvs4mlkuju7cbetau&raw=1",
    source: "JtwAPgHnCU0",
  },
  {
    id: 3,
    title: "それがあなたの幸せとしても",
    romaji: "Sore ga anata no shiawase toshitemo",
    artist: "TORi",
    duration: "4:38",
    src: "https://www.dropbox.com/scl/fi/20urc8zeuif7dtdkb44ee/.mp3?rlkey=cft9mjox5mym4n1kaa1msuu5g&raw=1",
    source: "gjMY2VQPO08",
  },
  {
    id: 4,
    title: "アスノヨゾラ哨戒班",
    romaji: "Asu no yozora shoukaihan",
    artist: "凛々咲 / Ririsya",
    duration: "3:42",
    src: "https://www.dropbox.com/scl/fi/fhd7gqnb2ojqdkbsq8oqi/.mp3?rlkey=4ckbtr9609ttolxvit489kpbx&raw=1",
    source: "KBIk7N0fq-0",
  },
  {
    id: 5,
    title: "正解",
    romaji: "Seikai",
    artist: "RADWIMPS",
    duration: "6:20",
    src: "https://www.dropbox.com/scl/fi/3e3wme6jlqwa4u8nttmxp/.mp3?rlkey=yh9usgqmzd4oqf9z8kx5h7ymx&raw=1",
    source: "wTc3jXDTNBo",
  },
  {
    id: 6,
    title: "水平線",
    romaji: "Suiheisen",
    artist: "back number",
    duration: "5:13",
    src: "https://www.dropbox.com/scl/fi/79zp6ydv0m95wu27f5ee8/.mp3?rlkey=9ikc5bon0exo8ewnsehdzxnyk&raw=1",
    source: "iqEr3P78fz8",
  },
  {
    id: 7,
    title: "夜明けと蛍",
    romaji: "Yoake to hotaru",
    artist: "あれくん",
    duration: "5:47",
    src: "https://www.dropbox.com/scl/fi/a6djef064ssz1x9c6y405/.mp3?rlkey=114n080qo7kkq4igyyyazut8b&raw=1",
    source: "X97TUJ13-YM",
  },
  {
    id: 8,
    title: "ぎゅっと",
    romaji: "Gyutto",
    artist: "春茶",
    duration: "4:34",
    src: "https://www.dropbox.com/scl/fi/g0lh1hqhdbhfi413hdccu/.mp3?rlkey=g59sbtu7n4i9tveflp3dkacrm&raw=1",
    source: "jp-uOszFnl8",
  },
  {
    id: 9,
    title: "別の人の彼女になったよ",
    romaji: "Betsu no hito no kanojo ninattayo",
    artist: "粉ミルク",
    duration: "5:03",
    src: "https://www.dropbox.com/scl/fi/4e0hxg8lduapd299kynz7/.mp3?rlkey=jrhtnnsqnm3n6ftpot2e4fsu4&raw=1",
    source: "oMDsVsOljSU",
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  if (userData?.currentSong?.id == id) {
    const isPlaying = playButton.classList.contains("playing");
    if (isPlaying) return pauseSong();
  } else {
    audio.src = song.src;
    audio.title = song.title;
  }

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title || "";
  const currentRomaji = userData?.currentSong?.romaji;
  const currentArtist = userData?.currentSong?.artist;
  const currentAlbum = userData?.currentSong
    ? `https://i.ytimg.com/vi/${userData?.currentSong?.source}/mqdefault.jpg`
    : `https://i.ytimg.com/vi/${userData?.songs[0]?.source}/mqdefault.jpg`;
  const combineTitleRomaji = `${currentTitle || ""}<br />${
    currentRomaji || ""
  }`;

  playingSong.setAttribute(
    "href",
    userData?.currentSong
      ? `https://youtu.be/${userData?.currentSong?.source}`
      : `https://youtu.be/${userData?.songs[0]?.source}`
  );
  playingSong.innerHTML = combineTitleRomaji || "";
  songArtist.textContent = currentArtist || "";
  albumArt.innerHTML = `<img src="${currentAlbum}" alt="song ${currentTitle} art">`;
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
    <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})" aria-label="Delete ${song.title}">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
        </svg>
      </button>
    </li>
    `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
};

playButton.addEventListener("click", () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs());
