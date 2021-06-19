// Get our elements

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playButton = document.querySelector('.toggle');
const playerSliders = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]')

const fullScreen = document.querySelector('.fullScreen');

// Build our functions 

function playPause() {video.paused ? video.play() : video.pause()}

function togglePlayButton() {this.paused ? playButton.textContent = "Play" : playButton.textContent = "Pause"}

function handlePlayerSliders() {video[this.name] = this.value}

function rewind() {video.currentTime += Number(this.dataset.skip)}

function updateprogressBar() {
    const timePassed = (this.currentTime / this.duration) * 100;
    progressBar.style.flexBasis = timePassed + '%';
}

function rewindProgress(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
    
}

function toggleFullScreen() {
    if (document.fullscreenElement === null) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Hook up the event listeners

video.addEventListener('click', playPause);
video.addEventListener('play', togglePlayButton);
video.addEventListener('pause', togglePlayButton);
video.addEventListener('timeupdate', updateprogressBar);

playButton.addEventListener('click', playPause);
playerSliders.forEach(playerSlider => playerSlider.addEventListener('change', handlePlayerSliders));
playerSliders.forEach(playerSlider => playerSlider.addEventListener('mousemove', handlePlayerSliders));
skipButtons.forEach(skipButton => skipButton.addEventListener('click', rewind));

let isMouseDown = false;
progress.addEventListener('click', rewindProgress);
progress.addEventListener('mousemove', (e) => isMouseDown && rewindProgress(e) );
progress.addEventListener('mousedown', () => isMouseDown = true);
player.addEventListener('mouseup', () => isMouseDown = false);

fullScreen.addEventListener('click', toggleFullScreen);