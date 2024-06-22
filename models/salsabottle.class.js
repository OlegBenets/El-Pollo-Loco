/**
 * Represents a salsa bottle object that extends MovableObject.
 * Has specific dimensions, offsets, and images for when it is on the ground.
 */
class SalsaBottle extends MovableObject {
      /**
   * @property {number} width - The width of the salsa bottle.
   * @property {number} height - The height of the salsa bottle.
   * @property {number} y - The initial y-coordinate of the salsa bottle.
   * @property {number} offsetRight - The right offset for collision detection.
   * @property {number} offsetLeft - The left offset for collision detection.
   * @property {number} offsetTop - The top offset for collision detection.
   * @property {number} offsetBottom - The bottom offset for collision detection.
   * @property {string[]} IMAGES_GROUND - Array of paths to images of the salsa bottle on the ground.
   */
  width = 60;
  height = 60;
  y = 370;
  offsetRight = 10;
  offsetLeft = 15;
  offsetTop = 10;
  offsetBottom = 5;
  IMAGES_GROUND = [
    './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

    /**
   * Constructs a salsa bottle object.
   * Loads the first ground image, loads all ground images, sets random x-coordinate, and starts animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_GROUND[0]);
    this.loadImages(this.IMAGES_GROUND);
    this.x = 200 + Math.random() * 3100;
    this.animate();
  }

    /**
   * Animates the salsa bottle by cycling through its ground images at intervals.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_GROUND);
    }, 500);
  }
}
