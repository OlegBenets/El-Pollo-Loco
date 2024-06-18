let canvas;
let world;
let keyboard = new Keyboard();
let background;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function startGame() {
    document.getElementById('startScreen').style.display = 'none';
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
