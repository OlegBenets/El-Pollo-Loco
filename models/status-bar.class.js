/**
 * Represents a status bar that displays different images based on percentage.
 * Extends the DrawableObject class.
 */
class StatusBar extends DrawableObject {
    /**
   * @property {string[]} IMAGES - Array of paths to images representing different percentage levels.
   * @property {number} percentage - Current percentage value of the status bar.
   */
    IMAGES = [];
  percentage = 100;

    /**
   * Constructs a StatusBar object.
   * @param {string[]} images - Array of paths to images for different percentage levels.
   * @param {number} x - The x-coordinate of the status bar.
   * @param {number} y - The y-coordinate of the status bar.
   * @param {number} width - The width of the status bar.
   * @param {number} height - The height of the status bar.
   * @param {number} initialPercentage - Initial percentage value (default is 100).
   */
  constructor(images, x, y, width, height, initialPercentage = 100) {
    super();
    this.IMAGES = images;
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.setPercentage(initialPercentage);
  }

    /**
   * Sets the percentage value of the status bar.
   * Updates the displayed image based on the percentage.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let newIndex = this.resolveImageIndex();
    let path = this.IMAGES[newIndex];
    this.img = this.imageCache[path];
  }

    /**
   * Resolves the index of the image to be displayed based on the current percentage.
   * @returns {number} - Index of the image in IMAGES array based on the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 81) {
      return 5;
    } else if (this.percentage >= 61) {
      return 4;
    } else if (this.percentage >= 41) {
      return 3;
    } else if (this.percentage >= 21) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
