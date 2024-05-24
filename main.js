let player;
let playPauseIcon = document.getElementById('playPauseIcon');
let isPlaying = true;

// Dynamically load YouTube Iframe API
function loadYouTubeIframeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Callback function when YouTube Iframe API is ready
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('player', {
    height: '157.5',
    width: '280',
    videoId: 'U0G5OA6ZH5w',
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'start': 25
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  playPauseIcon = document.getElementById('playPauseIcon');
  setInterval(updateProgressBar, 1000);

  // Add event listener for play/pause button click
  document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);

  // Add event listener for mute button click
  document.getElementById('muteBtn').addEventListener('click', toggleMute);

  // Add event listener to detect clicks on the video player
  document.getElementById('player').addEventListener('click', function () {
    togglePlayPause();
  });
}

function togglePlayPause() {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
  } else {
    player.playVideo();
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
  }
}

function toggleMute() {
  if (player.isMuted()) {
    player.unMute();
    document.getElementById('muteIcon').classList.remove('fa-volume-off');
    document.getElementById('muteIcon').classList.add('fa-volume-up');
  } else {
    player.mute();
    document.getElementById('muteIcon').classList.remove('fa-volume-up');
    document.getElementById('muteIcon').classList.add('fa-volume-off');
  }
}

function updateProgressBar() {
  var currentTime = player.getCurrentTime();
  var duration = player.getDuration();
  var progress = (currentTime / duration) * 100;
  document.getElementById('progress-bar-fill').style.width = progress + '%';
}

// Load YouTube Iframe API when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadYouTubeIframeAPI);
