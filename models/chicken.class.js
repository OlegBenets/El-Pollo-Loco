/**
 * Represents a chicken enemy in the game, extending from MovableObject.
 */
class Chicken extends MovableObject {
      /**
   * @property {number} width - The width of the chicken.
   * @property {number} height - The height of the chicken.
   * @property {number} y - The initial y-coordinate of the chicken.
   * @property {number} offsetRight - The offset from the right edge of the chicken's hitbox.
   * @property {number} offsetLeft - The offset from the left edge of the chicken's hitbox.
   * @property {number} offsetTop - The offset from the top edge of the chicken's hitbox.
   * @property {number} offsetBottom - The offset from the bottom edge of the chicken's hitbox.
   * @property {string[]} IMAGES_WALKING - Array of image paths for walking animations of the chicken.
   * @property {string[]} IMAGES_DEAD - Array of image paths for death animation of the chicken.
   * @property {boolean} isDead - Flag indicating if the chicken is dead.
   */
  width = 80;
  height = 80;
  y = 350;
  offsetRight = 5;
  offsetLeft = 5;
  offsetTop = 5;
  offsetBottom = 5;
  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  isDead = false;

    /**
   * Constructs an instance of the Chicken class.
   * Loads initial walking image and starts animation.
   */
  constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 3100;
    this.speed = 0.3 + Math.random() * 0.5;
    this.animate();
  }

    /**
   * Starts intervals for animation and movement of the chicken.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

    /**
   * Handles the death of the chicken: plays death animation, removes from the level after delay.
   */
  EnemyDead() {
    if (!this.isDead) {
      this.isDead = true;
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        let index = world.level.enemies.indexOf(this);
        if (index > -1) {
          world.level.enemies.splice(index, 1);
        }
      }, 500);
    }
  }
}
