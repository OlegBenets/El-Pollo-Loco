/**
 * Represents a movable object in the game.
 * Extends DrawableObject for drawing functionality.
 */
class MovableObject extends DrawableObject {
    /**
   * @property {number} speed - The horizontal speed of the object.
   * @property {boolean} otherDirection - Flag indicating if the object is moving in the opposite direction.
   * @property {number} speedY - The vertical speed of the object.
   * @property {number} acceleration - The acceleration due to gravity or other forces.
   * @property {number} energy - The current energy level of the object.
   * @property {number} bottles - The number of bottles collected by the object.
   * @property {number} coins - The number of coins collected by the object.
   * @property {number} lastHit - Timestamp of the last hit or damage taken.
   */
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  bottles = 0;
  coins = 0;
  lastHit = 0;

    /**
   * Applies gravity to the object, making it fall when above the ground.
   * Uses setInterval to apply gravity at regular intervals.
   */
  applyGravity() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 160;
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

    /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
    }

  }

    /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
      this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
      this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight &&
      this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom
    );
  }

    /**
   * Checks if this object is above the top of another movable object.
   * @param {MovableObject} mo - The other movable object to check position relative to.
   * @returns {boolean} True if above the top of the other object, false otherwise.
   */
  isAboveEnemyTop(mo) {
    return this.y + this.height - this.offsetTop <= mo.y + mo.offsetTop;
  }

    /**
   * Handles when this object hits the chicken boss, reducing energy.
   */
  hitChickenBoss() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

    /**
   * Handles when this object is hit, reducing energy and updating last hit time.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

    /**
   * Checks if this object is currently in a hurt state based on last hit time.
   * @returns {boolean} True if hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 250;
    return timepassed < 1;
  }

    /**
   * Checks if this object is dead based on energy level.
   * @returns {boolean} True if dead (energy is zero), false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

    /**
   * Plays animation by cycling through provided images.
   * @param {string[]} images - Array of image paths to animate.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

    /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

    /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

    /**
   * Initiates a jump for the object by setting its vertical speed.
   */
  jump() {
    this.speedY = 20;
  }

    /**
   * Increases the count of bottles collected by the object.
   */
  bottleCollected() {
    if (this.bottles < 100) {
      this.bottles += 20;
      if (this.bottles > 100) {
        this.bottles = 100;
      }
    }
  }

    /**
   * Increases the count of coins collected by the object.
   */
  coinsCollected() {
    if (this.coins < 100) {
      this.coins += 20;
    }
    if (this.coins > 100) {
      this.coins = 100;
    }
  }

    /**
   * Throws a bottle, reducing the count of bottles collected.
   */
  throwBottle() {
    this.bottles -= 20;
    if (this.bottles < 0) {
      this.bottles = 0;
    }
  }
}
