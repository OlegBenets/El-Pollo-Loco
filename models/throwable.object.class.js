/**
 * Represents a throwable object that falls under gravity and splashes upon hitting the ground.
 * Extends the MovableObject class.
 */
class ThrowableObject extends MovableObject {
      /**
   * @property {number} offsetRight - Right offset for collision detection.
   * @property {number} offsetLeft - Left offset for collision detection.
   * @property {number} offsetTop - Top offset for collision detection.
   * @property {number} offsetBottom - Bottom offset for collision detection.
   * @property {Audio} splash_audio - Audio object for splash sound.
   * @property {string[]} IMAGES_ROTATE - Array of paths to images for rotation animation.
   * @property {string[]} IMAGES_SPLASH - Array of paths to images for splash animation.
   * @property {boolean} isBroken - Flag indicating if the object has splashed.
   */
  offsetRight = 5;
  offsetLeft = 5;
  offsetTop = 5;
  offsetBottom = 5;
  splash_audio = new Audio('./audio/bottle-splash.mp3');

  IMAGES_ROTATE = [
    './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  IMAGES_SPLASH = [
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

    /**
   * Constructs a ThrowableObject.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   */
  constructor(x, y) {
    super().loadImage(
      './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    );
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.isBroken = false;
    this.throw();
  }

    /**
   * Throws the bottle by applying initial speed and starting animations.
   */
  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.rotateBottle();
    this.reachedGround();
  }

   /**
   * Rotates the bottle during its flight.
   */
  rotateBottle() {
    this.rotationInterval = setInterval(() => {
      this.x += 20;
      this.playAnimation(this.IMAGES_ROTATE);
    }, 30);
  }

   /**
   * Initiates the splash animation upon the bottle reaching the ground.
   */
  splashAnimation() {
    this.isBroken = true;
    clearInterval(this.throwInterval);
    clearInterval(this.applyGravityInterval);
    this.splashInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 50);
  }

   /**
   * Controls the bottle's movement until it reaches the ground.
   */
  reachedGround() {
    this.throwInterval = setInterval(() => {
      if (this.y >= 370) {
        this.y = 370;
        this.speedY = 0;
        clearInterval(this.rotationInterval);
        this.splashAnimation();
        this.splash_audio.play();
        this.removeBottle();
      } else {
        this.y += this.speedY;
      }
    }, 30);
  }

    /**
   * Removes the bottle from the world after a delay once it has splashed.
   */
  removeBottle() {
    setTimeout(() => {
      let index = world.throwableObjects.indexOf(this);
      if (index > -1) {
        world.throwableObjects.splice(index, 1);
      }
    }, 100);
  }
}
