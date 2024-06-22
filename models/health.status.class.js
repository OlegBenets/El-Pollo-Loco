/**
 * Represents the status bar for the player's health, extending from StatusBar.
 */
class HealthStatusBar extends StatusBar {
      /**
   * Constructs an instance of the HealthStatusBar class.
   * Initializes with specific images for the player's health status.
   */
  constructor() {
    super(
      [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
      ],
      20,
      0,
      150,
      40
    );
  }
}
