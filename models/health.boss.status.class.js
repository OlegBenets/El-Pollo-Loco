/**
 * Represents the status bar for the end boss character, extending from StatusBar.
 */
class BossStatusBar extends StatusBar {
    /**
   * Constructs an instance of the BossStatusBar class.
   * Initializes with specific images for the boss's health status.
   */
  constructor() {
    super(
      [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',
      ],
      20,
      120,
      150,
      40
    );
  }
}
