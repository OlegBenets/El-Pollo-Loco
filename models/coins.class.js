/**
 * Represents a coin object in the game, extending from MovableObject.
 */
class Coins extends MovableObject {
        /**
   * @property {number} width - The width of the coin.
   * @property {number} height - The height of the coin.
   * @property {number} offsetRight - The offset from the right edge of the coin's hitbox.
   * @property {number} offsetLeft - The offset from the left edge of the coin's hitbox.
   * @property {number} offsetTop - The offset from the top edge of the coin's hitbox.
   * @property {number} offsetBottom - The offset from the bottom edge of the coin's hitbox.
   * @property {string[]} IMAGES_GROUND - Array of image paths for the coin when on the ground.
   */
  width = 100;
  height = 100;
  offsetRight = 30;
  offsetLeft = 30;
  offsetTop = 30;
  offsetBottom = 30;
  IMAGES_GROUND = ['./img/8_coin/coin_1.png', './img/8_coin/coin_2.png'];
   
  /**
   * @constructor
   * Initializes a coin object with random position and loads its images.
   */
  constructor() {
    super().loadImage(this.IMAGES_GROUND[0]);
    this.loadImages(this.IMAGES_GROUND);
    this.x = 200 + Math.random() * 3100;
    this.y = 100 + Math.random() * (360 - 100);
  }
}
