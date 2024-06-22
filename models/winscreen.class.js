/**
 * Represents a screen displayed upon winning the game.
 * Extends the DrawableObject class.
 */
class Winscreen extends DrawableObject {
      /**
   * @property {string[]} IMAGES - Array of paths to images for the win screen.
   */
  IMAGES = [
    './img/9_intro_outro_screens/win/win_1.png',
    './img/9_intro_outro_screens/win/win_2.png',
  ];

    /**
   * Constructs a Winscreen object.
   */
  constructor() {
    super().loadImage('./img/9_intro_outro_screens/win/win_2.png');
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }
}
