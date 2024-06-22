/**
 * Represents a background object that extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - The path to the image of the background object.
   * @param {number} x - The initial x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.width = 720;
    this.height = 480;
    this.x = x;
    this.y = 480 - this.height;
  }
}
