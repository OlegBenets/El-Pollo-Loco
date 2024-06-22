/**
 * Represents a status bar for coins in the game, extending from StatusBar.
 */
class CoinStatusBar extends StatusBar {
      /**
   * @param {string[]} images - Array of image paths for different status bar levels.
   * @param {number} initialX - The initial x-coordinate of the status bar.
   * @param {number} initialY - The initial y-coordinate of the status bar.
   * @param {number} width - The width of the status bar.
   * @param {number} height - The height of the status bar.
   * @param {number} initialValue - The initial value of the status bar.
   */
  constructor() {
    super(
      [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
      ],
      20,
      80,
      150,
      40,
      0
    );
  }
}
