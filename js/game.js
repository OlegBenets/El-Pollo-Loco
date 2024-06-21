let canvas;
let world;
let keyboard = new Keyboard();
let background;

function load() {
    checkDevice();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}


function startGame() {
    document.getElementById('play-screen').classList.remove('d-none');
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    initializeBackgroundAudio();
    init();
}

function initializeBackgroundAudio() {
    if(!background) {
        background = new Audio('./audio/background.mp3');
        background.volume = 0.1;
    }
    background.pause();
    background.currentTime = 0;
    background.play();
}

function howToPlay() {
    let element = document.getElementById('how-to-play');
    element.classList.toggle('d-none');
}

let elem = document.documentElement;

function toggleFullscreen() {
if(!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFUllscreenElement) {
  openFullScreen();
} else {
   closeFullScreen();
}
}

function openFullScreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    
      document.getElementById('full-screen').src = './img/11_play_icons/full-screen.png';
}

function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }

      document.getElementById('full-screen').src = './img/11_play_icons/full-screen (1).png';
}

function isMobileOrTablet() {
    return /Mobil|Android|iPad|iPhone/i.test(navigator.userAgent);
}

function checkDevice() {
    let rotateDevice = document.getElementById('rotate-device');
    let walkButtons = document.getElementById('walk-buttons');
    let jumpThrowButtons = document.getElementById('jump-throw-buttons');
    if(!isMobileOrTablet()) {
        rotateDevice.classList.add('d-none');
        walkButtons.classList.add('d-none');
        jumpThrowButtons.classList.add('d-none');
        return;
    } 
    if(window.innerWidth < window.innerHeight) {
        rotateDevice.classList.remove('d-none');
    } else {
        rotateDevice.classList.add('d-none');
    }

    walkButtons.classList.remove('d-none');
    jumpThrowButtons.classList.remove('d-none');
}

window.addEventListener("resize", checkDevice, false);
window.addEventListener("orientationchange", checkDevice, false);
window.addEventListener("load", checkDevice, false);


 

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) {
        keyboard.LEFT = true;
    } else if (e.keyCode === 39) {
        keyboard.RIGHT = true;
    } else if (e.keyCode === 38) {
        keyboard.UP = true;
    } else if (e.keyCode === 40) {
        keyboard.DOWN = true;
    } else if (e.keyCode === 32) {
        keyboard.SPACE = true;
    } else if (e.keyCode === 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode === 37) {
        keyboard.LEFT = false;
    } else if (e.keyCode === 39) {
        keyboard.RIGHT = false;
    } else if (e.keyCode === 38) {
        keyboard.UP = false;
    } else if (e.keyCode === 40) {
        keyboard.DOWN = false;
    } else if (e.keyCode === 32) {
        keyboard.SPACE = false;
    } else if (e.keyCode === 68) {
        keyboard.D = false;
    }
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
    }
})  
