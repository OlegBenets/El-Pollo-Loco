/**
 * Represents a cloud object in the game, extending from MovableObject.
 */
class Cloud extends MovableObject {
    /**
   * @property {number} y - The y-coordinate of the cloud.
   * @property {number} width - The width of the cloud.
   * @property {number} height - The height of the cloud.
   * @property {string[]} CLOUD_IMAGES - Array of image paths for different cloud images.
   */
  y = 20;
  width = 500;
  height = 250;

  CLOUD_IMAGES = [
    './img/5_background/layers/4_clouds/1.png',
    './img/5_background/layers/4_clouds/2.png',
  ];

  /**
   * Constructs an instance of the Cloud class.
   * Loads cloud images, sets initial position, and starts animation.
   */
  constructor() {
    super();
    this.loadImages(this.CLOUD_IMAGES);
    this.x = Math.random() * 5000;
    this.setRandomImage();
    this.animate();
  }

    /**
   * Sets up an interval for moving the cloud to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

    /**
   * Randomly selects and sets a new image for the cloud.
   */
  setRandomImage() {
    this.currentImageIndex = Math.floor(Math.random() * this.CLOUD_IMAGES.length);
    this.img = this.imageCache[this.CLOUD_IMAGES[this.currentImageIndex]];
  }
}
