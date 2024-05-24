let player;
let playPauseIcon = document.getElementById('playPauseIcon');
let isPlaying = true;
let muteBtn = document.getElementById('muteBtn');
let volumeSlider = document.getElementById('volumeSlider');
let volumeRange = document.getElementById('volumeRange');
let nextBtn = document.getElementById('nextBtn');

// Array of video objects with IDs and starting times
var videos = [
  { id: 'U0G5OA6ZH5w', start: 25 }, // Provided Video ID
  { id: '9t57C7NcjWo', start: 10 },
  { id: 'Z_BhMhZpAug', start: 0 },
  { id: '2NArH91kHoQ', start: 10 }
];

var currentIndex = 0;

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
    videoId: videos[currentIndex].id,
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'start': videos[currentIndex].start
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
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

  // Toggle volume slider visibility on mute button hover
  muteBtn.addEventListener('mouseover', function () {
    volumeSlider.style.display = 'block';
  });

  muteBtn.addEventListener('mouseleave', function () {
    volumeSlider.style.display = 'none';
  });

  // Prevent volume slider from hiding when interacting with it
  volumeSlider.addEventListener('mouseover', function () {
    volumeSlider.style.display = 'block';
  });

  volumeSlider.addEventListener('mouseleave', function () {
    volumeSlider.style.display = 'none';
  });

  // Adjust volume when slider value changes
  volumeRange.addEventListener('input', function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up to the mute button
    player.setVolume(event.target.value);
  });

  // Prevent click on volumeRange from toggling mute
  volumeRange.addEventListener('mousedown', function (event) {
    event.stopPropagation();
  });

  volumeRange.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Add event listener for next button click
  nextBtn.addEventListener('click', function () {
    nextVideo();
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

function onPlayerStateChange(event) {
  // If the video ends, play the next video in the playlist
  if (event.data == YT.PlayerState.ENDED) {
    nextVideo();
  }
}

function nextVideo() {
  currentIndex++;
  if (currentIndex < videos.length) {
    player.loadVideoById({
      videoId: videos[currentIndex].id,
      startSeconds: videos[currentIndex].start
    });
  } else {
    // If all videos have been played, loop back to the beginning
    currentIndex = 0;
    player.loadVideoById({
      videoId: videos[currentIndex].id,
      startSeconds: videos[currentIndex].start
    });
  }
}


// Load YouTube Iframe API when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadYouTubeIframeAPI);
