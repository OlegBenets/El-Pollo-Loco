/**
 * Represents the screen displayed when the game is lost.
 * Extends DrawableObject for drawing functionality.
 */
class Losescreen extends DrawableObject {
      /**
   * @property {string[]} IMAGES - Array of image paths for the lose screen.
   */
  IMAGES = ['./img/9_intro_outro_screens/game_over/game over!.png'];

    /**
   * Constructs a Losescreen object.
   * Loads and initializes the lose screen image.
   */
  constructor() {
    super().loadImage('./img/9_intro_outro_screens/game_over/game over!.png');
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }
}
