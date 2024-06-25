let canvas;
let world;
let keyboard = new Keyboard();
let audio = new AudioManager();
let isMuted = false;

/**
 * Loads necessary resources and checks the device type.
 */
function load() {
  checkDevice();
  loadMuteStatus();
  setPlayAgainReload();
}

/**
 * Initializes the game.
 * Creates the world and connects it to the canvas, keyboard, and audio functions.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, audio);
}

/**
 * Starts the game by hiding the start screen element and displaying the play screen element.
 * Calls the initialization function `init()`.
 */
function startGame() {
  document.getElementById('play-screen').classList.remove('d-none');
  document.getElementById('start-screen').classList.add('d-none');
  document.getElementById('canvas').style.display = 'block';
  document.getElementById('loading-screen').classList.add('d-none');
  init();
}

/**
 * Initiates the "Play Again" action by setting a flag in localStorage
 * and reloading the page to reset the game state.
 */
function PlayAgain() {
  localStorage.setItem('playAgain', 'true');
  window.location.reload();
}

/**
 * Handles the reload after the "Play Again" action by checking the flag in localStorage.
 * If the flag is set, it removes the flag and starts the game.
 */
function setPlayAgainReload() {
  if(localStorage.getItem('playAgain') === 'true') {
    localStorage.removeItem('playAgain');
    startGame();
  }
}

/**
 * Returns to the main menu by reloading the game.
 * Resets the game state and restarts the game.
 */
function backToMenu() {
  world.gameOver = false;
  world.gameWin = false;
  window.location.reload(true);
}

/**
 * Toggles between muting and unmuting the game audio.
 * Updates the mute icon and saves the mute status to localStorage.
 */
function MuteGame() {
  isMuted = !isMuted;
  checkMuteStatus();
  localStorage.setItem('isMuted', isMuted);
}

/**
 * Loads the mute status from localStorage and applies it.
 * Updates the mute icon based on the loaded status.
 */
function loadMuteStatus() {
  let savedMutedState = localStorage.getItem('isMuted');
  if(savedMutedState !== null) {
    isMuted = JSON.parse(savedMutedState);
    checkMuteStatus();
  }
}

/**
 * Checks the current mute status (`isMuted`) and updates the mute icon accordingly.
 * Mutes or unmutes all game audio based on the `isMuted` status.
 */
function checkMuteStatus() {
  let image = document.getElementById('mute');
  if (isMuted) {
    audio.muteAll();
    image.src = './img/11_play_icons/mute.png';
  } else {
    audio.unmuteAll();
    image.src = './img/11_play_icons/volume.png';
  }
}

/**
 * Shows or hides the how-to-play instructions.
 * Toggles the visibility of the How-to-Play element.
 */
function howToPlay() {
  let element = document.getElementById('how-to-play');
  element.classList.toggle('d-none');
}

/**
 * Event handler for toggling fullscreen mode.
 * Checks if fullscreen mode is active and toggles accordingly.
 */
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    openFullScreen();
  } else {
    closeFullScreen();
  }
}

/**
 * Opens fullscreen mode based on browser API.
 */
function openFullScreen() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  document.getElementById('full-screen').src = './img/11_play_icons/full-screen.png';
}

/**
 * Exits fullscreen mode based on browser API.
 */
function closeFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  document.getElementById('full-screen').src = './img/11_play_icons/full-screen (1).png';
}

/**
 * Checks if the device is a mobile device or tablet.
 * Uses `navigator.userAgent` to determine the device type.
 * @returns {boolean} true if the device is a mobile device or tablet, otherwise false.
 */
function isMobileOrTablet() {
  return /Mobil|Android|iPad|iPhone/i.test(navigator.userAgent);
}

/**
 * Checks the device and shows or hides appropriate elements based on device type and screen orientation.
 */
function checkDevice() {
  let rotateDevice = document.getElementById('rotate-device');
  let walkButtons = document.getElementById('walk-buttons');
  let jumpThrowButtons = document.getElementById('jump-throw-buttons');

  if (!isMobileOrTablet()) {
    hideButtons(rotateDevice, walkButtons, jumpThrowButtons);
    return;
  }

  if (window.innerWidth < window.innerHeight) {
    rotateDevice.classList.remove('d-none');
  } else {
    rotateDevice.classList.add('d-none');
  }

  walkButtons.classList.remove('d-none');
  jumpThrowButtons.classList.remove('d-none');
}

/**
 * Hides the specified elements.
 * @param {HTMLElement} rotateDevice - The element containing the rotate device instruction.
 * @param {HTMLElement} walkButtons - The element containing the walk buttons.
 * @param {HTMLElement} jumpThrowButtons - The element containing the jump/throw buttons.
 */
function hideButtons(rotateDevice, walkButtons, jumpThrowButtons) {
  rotateDevice.classList.add('d-none');
  walkButtons.classList.add('d-none');
  jumpThrowButtons.classList.add('d-none');
}

/**
 * Event listener for window resize and orientation change.
 * Calls `checkDevice()` to adjust UI elements based on new dimensions or orientation.
 */
window.addEventListener('resize', checkDevice);
window.addEventListener('orientationchange', checkDevice);
window.addEventListener('load', checkDevice);

/**
 * Adds event listeners for keyboard controls.
 * Responds to arrow keys, spacebar, and 'D' key for game controls.
 */
window.addEventListener('keydown', (e) => {
  if (keyboard) {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault();
    }
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
  }
});

/**
 * Event listener for releasing keyboard keys.
 * Updates keyboard state when keys are released.
 */
window.addEventListener('keyup', (e) => {
  if (keyboard) {
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
  }
});

/**
 * Adds event listener for button presses on touch or click.
 * Sets the corresponding keyboard key to true when the button is pressed.
 * Sets the corresponding keyboard key to false when the button is released.
 * @param {string} buttonId - The id of the button element.
 * @param {string} key - The keyboard key associated with the button.
 */
function addButtonEventListener(buttonId, key) {
  let button = document.getElementById(buttonId);

  let setKeyTrue = (event) => {
    if(event.cancelable) {
      event.preventDefault();
    }
    keyboard[key] = true;
  };

  let setKeyFalse = (event) => {
    if(event.cancelable) {
      event.preventDefault();
    }
    keyboard[key] = false;
  };
  button.addEventListener('mousedown', setKeyTrue);
  button.addEventListener('mouseup', setKeyFalse);
  button.addEventListener('touchstart', setKeyTrue);
  button.addEventListener('touchend', setKeyFalse);
}

addButtonEventListener('button-left', 'LEFT');
addButtonEventListener('button-right', 'RIGHT');
addButtonEventListener('button-jump', 'SPACE');
addButtonEventListener('button-throw', 'D');

